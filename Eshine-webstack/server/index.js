import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import OpenAI from 'openai'
import { allProducts } from '../src/data/products.js'

const app = express()
const port = process.env.PORT || 8787
const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
const openAiApiKey = process.env.OPENAI_API_KEY
const activeProvider = geminiApiKey ? 'gemini' : openAiApiKey ? 'openai' : null

app.use(cors())
app.use(express.json())

const geminiClient = geminiApiKey
  ? new OpenAI({
      apiKey: geminiApiKey,
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    })
  : null
const openAiClient = openAiApiKey ? new OpenAI({ apiKey: openAiApiKey }) : null
const providerCooldownUntil = {
  gemini: 0,
  openai: 0,
}
const PROVIDER_RETRY_AFTER_MS = 5 * 60 * 1000

const normalize = (value = '') => value.toLowerCase()
const escapeRegExp = (value = '') => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const includesWholeWord = (text = '', keyword = '') =>
  new RegExp(`\\b${escapeRegExp(keyword)}\\b`, 'i').test(text)

const TAG_SYNONYMS = {
  festive: ['festive', 'wedding', 'sangeet', 'haldi', 'ethnic', 'traditional', 'shaadi', 'marriage'],
  formal: ['formal', 'formal wear', 'office', 'office wear', 'formal office wear', 'meeting', 'corporate', 'interview', 'suit', 'blazer', 'premium'],
  casual: ['casual', 'casual wear', 'casual office wear', 'daily', 'everyday', 'relaxed', 'college', 'travel', 'brunch', 'comfortable', 'summer clothes', 'summer wear'],
  streetwear: ['streetwear', 'streetstyle', 'street-style', 'street style', 'street', 'oversized', 'graphic', 'urban'],
  winterwear: ['winterwear', 'winter wear', 'woolen', 'woollen', 'woolen type', 'woollen type', 'knitwear', 'cold weather'],
  ethnic: ['ethnic', 'kurta', 'lehenga', 'sharara', 'anarkali', 'traditional'],
  'top-wear': ['shirt', 'tshirt', 't-shirt', 'tee', 'top'],
  'bottom-wear': ['pant', 'pants', 'trouser', 'trousers', 'jeans', 'joggers', 'bottom', 'bottoms'],
  outerwear: ['hoodie', 'jacket', 'coat', 'sweater', 'sweatshirt'],
  footwear: ['shoe', 'shoes', 'sneaker', 'sneakers', 'footwear', 'kicks'],
  dress: ['dress', 'gown'],
  men: ['men', 'male', 'man', 'boy', 'guy', 'him', 'he'],
  women: ['women', 'woman', 'female', 'fmale', 'femlae', 'lady', 'girl', 'her', 'she'],
}

const normalizeStyle = (value = '') => {
  const style = normalize(value)
  return style === 'streetwear' || style === 'street wear' || style === 'streetstyle' || style === 'street-style'
    ? 'streetwear'
    : style
}

const tokenize = (value = '') =>
  normalize(value)
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length >= 3)

const ITEM_REQUESTS = [
  { id: 'kurta', label: 'kurta', query: ['kurta'], match: ['kurta'] },
  { id: 'lehenga', label: 'lehenga', query: ['lehenga'], match: ['lehenga'] },
  { id: 'sharara', label: 'sharara', query: ['sharara', 'shrara'], match: ['sharara', 'shrara'] },
  { id: 'anarkali', label: 'anarkali', query: ['anarkali'], match: ['anarkali'] },
  { id: 'dress', label: 'dress', query: ['dress', 'gown'], match: ['dress', 'gown'] },
  { id: 'hoodie', label: 'hoodie', query: ['hoodie'], match: ['hoodie'] },
  { id: 'jacket', label: 'jacket', query: ['jacket'], match: ['jacket'] },
  { id: 'shirt', label: 'shirt', query: ['shirt'], match: ['shirt'] },
  { id: 'sweater', label: 'sweater', query: ['sweater'], match: ['sweater'] },
  {
    id: 'lower',
    label: 'lower',
    query: ['lower', 'lowers', 'pant', 'pants', 'trouser', 'trousers', 'jeans', 'joggers', 'bottom', 'bottoms'],
    match: ['bottom-wear', 'pant', 'pants', 'trouser', 'trousers', 'jeans', 'joggers', 'bottom', 'bottoms'],
  },
  {
    id: 'shoes',
    label: 'shoes',
    query: ['shoe', 'shoes', 'sneaker', 'sneakers', 'footwear', 'kicks'],
    match: ['footwear', 'shoe', 'shoes', 'sneaker', 'sneakers'],
  },
]

const extractIntentTags = (message = '', profile = {}) => {
  const text = normalize(message)
  const tags = new Set()

  Object.entries(TAG_SYNONYMS).forEach(([tag, words]) => {
    if (words.some((word) => includesWholeWord(text, word))) {
      tags.add(tag)
    }
  })

  ;(profile?.categories || []).map(normalize).forEach((value) => {
    if (!value) return
    tags.add(value)
    if (TAG_SYNONYMS[value]) tags.add(value)
  })

  return tags
}

const buildProductTags = (product = {}) => {
  const tags = new Set()
  if (product.audience) tags.add(normalize(product.audience))
  if (product.style) tags.add(normalizeStyle(product.style))
  if (product.category) tags.add(normalize(product.category))
  ;(product.sections || []).map(normalize).forEach((tag) => tags.add(tag))
  ;(product.tags || []).map(normalize).forEach((tag) => tags.add(tag))
  tokenize(product.name || '').forEach((token) => tags.add(token))
  const normalizedCategory = normalize(product.category)
  const normalizedName = normalize(product.name)
  if (
    normalizedCategory === 'outerwear' ||
    normalizedName.includes('hoodie') ||
    normalizedName.includes('jacket') ||
    normalizedName.includes('sweater') ||
    normalizedName.includes('sweatshirt')
  ) {
    tags.add('winterwear')
  }
  return tags
}

const detectRequestedAudience = (text = '') => {
  if (TAG_SYNONYMS.women.some((word) => includesWholeWord(text, word))) return 'women'
  if (TAG_SYNONYMS.men.some((word) => includesWholeWord(text, word))) return 'men'
  return null
}

const detectRequestedItems = (text = '') =>
  ITEM_REQUESTS.filter((item) => item.query.some((word) => includesWholeWord(text, word)))

const productMatchesRequestedItem = (product = {}, requestedItem = {}) => {
  const productTags = buildProductTags(product)
  return requestedItem.match.some((tag) => productTags.has(tag))
}

const getStrictNoInventoryReply = (message = '') => {
  const text = normalize(message)
  const audience = detectRequestedAudience(text)
  const requestedItems = detectRequestedItems(text)

  if (!requestedItems.length) return ''

  const missingItems = requestedItems.filter((requestedItem) => {
    return !allProducts.some((product) => {
      if (audience && normalize(product.audience) !== audience) return false
      return productMatchesRequestedItem(product, requestedItem)
    })
  })

  if (!missingItems.length) return ''

  const audienceLabel = audience ? `${audience === 'men' ? 'male' : 'female'} ` : ''
  if (missingItems.length === 1) {
    return `Sorry, ${audienceLabel}${missingItems[0].label} is not currently in stock.`
  }

  const labels = missingItems.map((item) => item.label).join(', ')
  return `Sorry, these items are not currently in stock: ${audienceLabel}${labels}.`
}
const STYLIST_SYSTEM_PROMPT =
  "You are ESHINE Stylist, a fashion sales assistant. Recommend ONLY from the provided inventory JSON and never invent products. Your first line MUST be exactly one of these formats: 'PICKS: id1, id2, id3' or 'PICKS: NONE'. Treat synonyms (shoes=sneakers, pants=joggers=jeans) as valid exact matches. If inventory has no suitable option, return 'PICKS: NONE'. After the first line, write 2-4 short sentences in clear, natural English explaining your decision and one styling tip. Do not use Hinglish, Hindi, or slang."

const NO_MATCH_REPLY =
  'I could not find a close match in current ESHINE stock. Share your occasion, preferred fit, and category, and I will refine the picks.'

const containsBrokenLanguage = (text = '') => {
  const normalized = normalize(text)
  if (!normalized.trim()) return true

  const badPhrases = [
    "don't you request",
    "i am sorry we don't you",
    'humare',
    'liye',
    'nahi',
    'hain',
  ]

  return (
    /[\u0900-\u097f]/.test(text) ||
    /\baur\b/i.test(text) ||
    badPhrases.some((phrase) => normalized.includes(phrase)) ||
    /^i am sorry\b/i.test(text)
  )
}

const buildEnglishFallbackReply = (userMessage = '', suggestions = []) => {
  if (!suggestions.length) return NO_MATCH_REPLY

  const text = normalize(userMessage)
  const occasion = text.includes('wedding')
    ? 'wedding'
    : text.includes('office') || text.includes('formal')
      ? 'formal setting'
      : text.includes('party')
        ? 'party'
        : 'occasion'

  const names = suggestions.map((item) => item.name).filter(Boolean)
  const namesText =
    names.length === 1
      ? names[0]
      : names.length === 2
        ? `${names[0]} and ${names[1]}`
        : `${names[0]}, ${names[1]}, and ${names[2]}`

  return `I picked ${namesText} from current ESHINE stock because they fit your ${occasion} request. Styling tip: keep one statement piece and the rest minimal for a polished look.`
}

const shuffle = (items = []) => {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const pickDiverseSuggestions = (products = [], count = 3) => {
  if (products.length <= count) return products

  const candidatePool = shuffle(products.slice(0, Math.min(products.length, 12)))
  const selected = []
  const usedCategories = new Set()
  const usedStyles = new Set()

  candidatePool.forEach((product) => {
    if (selected.length >= count) return
    const category = normalize(product.category)
    const style = normalizeStyle(product.style)
    const hasNewCategory = category && !usedCategories.has(category)
    const hasNewStyle = style && !usedStyles.has(style)
    if (selected.length === 0 || hasNewCategory || hasNewStyle) {
      selected.push(product)
      if (category) usedCategories.add(category)
      if (style) usedStyles.add(style)
    }
  })

  if (selected.length < count) {
    candidatePool.forEach((product) => {
      if (selected.length >= count) return
      if (selected.some((picked) => picked.id === product.id)) return
      selected.push(product)
    })
  }

  return selected.slice(0, count)
}

const formatProviderError = (providerName = 'provider', error) => {
  const status = error?.status || error?.response?.status
  const message = error?.message || 'Unknown error'
  return `${providerName} request failed${status ? ` (${status})` : ''}: ${message}`
}

const isProviderCoolingDown = (providerName) => Date.now() < providerCooldownUntil[providerName]

const noteProviderFailure = (providerName, error) => {
  const status = error?.status || error?.response?.status
  if ([400, 401, 403, 429].includes(status)) {
    providerCooldownUntil[providerName] = Date.now() + PROVIDER_RETRY_AFTER_MS
  }
}

const getInventoryShortlist = (message, profile = {}, excludeProductIds = []) => {
  const text = normalize(message)
  const intentTags = extractIntentTags(message, profile?.styleProfile || profile)
  const requestedItems = detectRequestedItems(text)
  const excludedIds = new Set((excludeProductIds || []).filter(Boolean))
  const desiredAudience = intentTags.has('women') ? 'women' : intentTags.has('men') ? 'men' : null
  const desiredStyle = ['festive', 'formal', 'casual', 'streetwear', 'winterwear'].find((tag) => intentTags.has(tag)) || null
  const desiredCategory = ['ethnic', 'formal', 'dress', 'outerwear', 'footwear', 'bottom-wear', 'top-wear']
    .find((tag) => intentTags.has(tag)) || null

  const scored = allProducts.map((product) => {
    let score = 0
    const productTags = buildProductTags(product)

    intentTags.forEach((tag) => {
      if (productTags.has(tag)) score += 3
    })
    if (desiredAudience && normalize(product.audience) === desiredAudience) score += 5
    if (desiredStyle && (normalizeStyle(product.style) === desiredStyle || productTags.has(desiredStyle))) score += 4
    if (desiredCategory && normalize(product.category) === desiredCategory) score += 4
    requestedItems.forEach((requestedItem) => {
      if (productMatchesRequestedItem(product, requestedItem)) score += 6
    })
    if (text.includes(product.name.toLowerCase())) score += 3
    if (text.includes('party') && (product.style === 'formal' || product.style === 'festive')) score += 2
    if (text.includes('confused') || text.includes('dont have time') || text.includes("don't have time")) score += 1

    return { product, score }
  })

  const positive = scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)

  const audienceMatched = desiredAudience
    ? positive.filter(({ product }) => normalize(product.audience) === desiredAudience)
    : []

  const source = audienceMatched.length ? audienceMatched : positive
  if (!source.length) return []
  const filteredSource = excludedIds.size
    ? source.filter(({ product }) => !excludedIds.has(product.id))
    : source
  const workingSource = filteredSource.length ? filteredSource : source

  if (requestedItems.length <= 1) {
    return workingSource
      .map(({ product }) => product)
      .slice(0, 6)
  }

  const selected = []
  const seen = new Set()
  requestedItems.forEach((requestedItem) => {
    const match = workingSource.find(({ product }) =>
      !seen.has(product.id) && productMatchesRequestedItem(product, requestedItem))
    if (!match) return
    selected.push(match.product)
    seen.add(match.product.id)
  })

  const remaining = workingSource
    .map(({ product }) => product)
    .filter((product) => !seen.has(product.id))

  return [...selected, ...remaining].slice(0, 6)
}

app.post('/api/stylist-chat', async (req, res) => {
  try {
    const { message, accountProfile, excludeProductIds } = req.body || {}
    const excludedIds = new Set((excludeProductIds || []).filter(Boolean))

    if (!message?.trim()) {
      return res.status(400).json({ error: 'Message is required.' })
    }

    const strictNoInventoryReply = getStrictNoInventoryReply(message)
    if (strictNoInventoryReply) {
      return res.json({
        reply: strictNoInventoryReply,
        suggestions: [],
        source: activeProvider,
      })
    }

    const shortlist = getInventoryShortlist(message, accountProfile?.styleProfile, excludeProductIds)
    if (!shortlist.length) {
      return res.json({
        reply: NO_MATCH_REPLY,
        suggestions: [],
        source: activeProvider,
      })
    }

    const inventoryForPrompt = shortlist.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      audience: product.audience,
      category: product.category,
      style: product.style,
      description: product.description,
      colors: product.colors?.map((color) => color.label).join(', '),
      sizes: product.sizes?.join(', '),
      tags: product.tags ? product.tags.join(', ') : undefined,
    }))

    let outputText = ''
    let usedProvider = activeProvider

    if (geminiClient && !isProviderCoolingDown('gemini')) {
      try {
        outputText =
          (
            await geminiClient.chat.completions.create({
              model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
              messages: [
                {
                  role: 'system',
                  content: STYLIST_SYSTEM_PROMPT,
                },
                {
                  role: 'user',
                  content: JSON.stringify({
                    customer_request: message,
                    profile: accountProfile,
                    inventory: inventoryForPrompt,
                  }),
                },
              ],
            })
          ).choices?.[0]?.message?.content?.trim() || ''
        usedProvider = 'gemini'
      } catch (providerError) {
        console.error('Stylist provider fallback:', formatProviderError('Gemini', providerError))
        noteProviderFailure('gemini', providerError)
      }
    }

    if (!outputText && openAiClient && !isProviderCoolingDown('openai')) {
      try {
        outputText =
          (
            await openAiClient.responses.create({
              model: process.env.OPENAI_MODEL || 'gpt-5',
              reasoning: { effort: 'low' },
              input: [
                {
                  role: 'system',
                  content: [
                    {
                      type: 'input_text',
                      text: STYLIST_SYSTEM_PROMPT,
                    },
                  ],
                },
                {
                  role: 'user',
                  content: [
                    {
                      type: 'input_text',
                      text: JSON.stringify({
                        customer_request: message,
                        profile: accountProfile,
                        inventory: inventoryForPrompt,
                      }),
                    },
                  ],
                },
              ],
            })
          ).output_text?.trim() || ''
        usedProvider = 'openai'
      } catch (providerError) {
        console.error('Stylist provider fallback:', formatProviderError('OpenAI', providerError))
        noteProviderFailure('openai', providerError)
      }
    }
    const picksMatch = outputText.match(/^PICKS:\s*(.+)$/m)
    const rawPicks = picksMatch?.[1]?.trim() || ''
    const shortlistIds = new Set(shortlist.map((item) => item.id))
    const pickedIds = rawPicks
      ?.split(',')
      .map((id) => id.trim().replace(/^['"`]+|['"`.]+$/g, ''))
      .filter(Boolean)
      .filter((id) => !/^none$/i.test(id))
      .filter((id) => shortlistIds.has(id))
      .filter((id) => !excludedIds.has(id))
      .slice(0, 3)

    const nonExcludedShortlist = shortlist.filter((item) => !excludedIds.has(item.id))
    const fallbackPool = nonExcludedShortlist.length ? nonExcludedShortlist : shortlist
    const fallbackSuggestions = pickDiverseSuggestions(fallbackPool, 3)
    const suggestionIds = pickedIds?.length ? pickedIds : fallbackSuggestions.map((item) => item.id)
    const suggestions = suggestionIds
      .map((id) => shortlist.find((item) => item.id === id))
      .filter(Boolean)

    const cleanedReply = outputText.replace(/^PICKS:\s*.+$/m, '').trim()
    const finalReply =
      !suggestions.length
        ? NO_MATCH_REPLY
        : containsBrokenLanguage(cleanedReply)
          ? buildEnglishFallbackReply(message, suggestions)
          : cleanedReply

    return res.json({
      reply: finalReply || buildEnglishFallbackReply(message, suggestions),
      suggestions,
      source: outputText ? usedProvider : 'local',
    })
  } catch (error) {
    console.error('Stylist chat error:', error)
    return res.status(500).json({
      error: 'Stylist assistant is unavailable right now.',
    })
  }
})

app.get('/api/health', (_, res) => {
  res.json({
    ok: true,
    provider: activeProvider,
    gemini: Boolean(geminiApiKey),
    openai: Boolean(openAiApiKey),
    providerCooldown: {
      gemini: isProviderCoolingDown('gemini'),
      openai: isProviderCoolingDown('openai'),
    },
  })
})

app.listen(port, () => {
  console.log(`ESHINE stylist server listening on http://localhost:${port}`)
})
