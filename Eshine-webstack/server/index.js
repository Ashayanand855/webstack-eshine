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

const client =
  activeProvider === 'gemini'
    ? new OpenAI({
        apiKey: geminiApiKey,
        baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
      })
    : activeProvider === 'openai'
      ? new OpenAI({ apiKey: openAiApiKey })
      : null

const normalize = (value = '') => value.toLowerCase()

const getInventoryShortlist = (message, profile = {}) => {
  const text = normalize(message)
  const selectedCategories = profile?.categories?.map(normalize) || []

  const audienceKeywords = {
    men: ['men', 'male', 'boy', 'guy', 'him', 'he'],
    women: ['women', 'woman', 'female', 'girl', 'her', 'she', 'dress', 'lehenga', 'sharara'],
  }

  const styleKeywords = {
    formal: ['formal', 'office', 'meeting', 'blazer', 'party', 'cocktail', 'corporate', 'suit'],
    festive: ['wedding', 'festive', 'ethnic', 'sangeet', 'haldi', 'kurta', 'lehenga', 'traditional'],
    casual: ['casual', 'college', 'everyday', 'relaxed', 'travel', 'brunch', 'comfortable'],
  }

  const categoryKeywords = {
    formal: ['formal', 'suit', 'coat', 'blazer', 'shirt', 'pant'],
    ethnic: ['kurta', 'lehenga', 'sharara', 'anarkali', 'ethnic', 'traditional'],
    outerwear: ['hoodie', 'jacket', 'coat', 'sweater', 'sweatshirt'],
    dress: ['dress', 'gown'],
  }

  const inferMatch = (keywords) =>
    Object.entries(keywords).find(([, values]) => values.some((keyword) => text.includes(keyword)))?.[0]

  const desiredAudience = inferMatch(audienceKeywords)
  const desiredStyle = inferMatch(styleKeywords)
  const desiredCategory = inferMatch(categoryKeywords)

  const scored = allProducts.map((product) => {
    let score = 0

    if (desiredAudience && product.audience === desiredAudience) score += 4
    if (desiredStyle && product.style === desiredStyle) score += 4
    if (desiredCategory && product.category === desiredCategory) score += 3
    if (selectedCategories.some((choice) => product.style.includes(choice) || product.category.includes(choice))) {
      score += 2
    }
    if (text.includes(product.name.toLowerCase())) score += 3
    if (text.includes('party') && (product.style === 'formal' || product.style === 'festive')) score += 2
    if (text.includes('confused') || text.includes('dont have time') || text.includes("don't have time")) score += 1

    return { product, score }
  })

  return scored
    .sort((a, b) => b.score - a.score)
    .map(({ product }) => product)
    .slice(0, 6)
}

app.post('/api/stylist-chat', async (req, res) => {
  try {
    const { message, accountProfile } = req.body || {}

    if (!message?.trim()) {
      return res.status(400).json({ error: 'Message is required.' })
    }

    const shortlist = getInventoryShortlist(message, accountProfile?.styleProfile)
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
    }))

    if (!client) {
      return res.status(503).json({
        error: 'AI provider is not configured. Add GEMINI_API_KEY or OPENAI_API_KEY in .env.',
      })
    }

    const outputText =
      activeProvider === 'gemini'
        ? (
            await client.chat.completions.create({
              model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
              messages: [
                {
                  role: 'system',
                  content:
                    'You are ESHINE Stylist, a fashion sales assistant. Recommend only from the provided inventory. Never invent products or prices. First line must be exactly in this format: PICKS: product-id-1, product-id-2, product-id-3. Then write a short Hinglish response explaining why these picks suit the event, plus one styling tip. If the request is too vague, still recommend best-fit inventory and ask one short follow-up question.',
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
        : (
            await client.responses.create({
              model: process.env.OPENAI_MODEL || 'gpt-5',
              reasoning: { effort: 'low' },
              input: [
                {
                  role: 'system',
                  content: [
                    {
                      type: 'input_text',
                      text:
                        'You are ESHINE Stylist, a fashion sales assistant. Recommend only from the provided inventory. Never invent products or prices. First line must be exactly in this format: PICKS: product-id-1, product-id-2, product-id-3. Then write a short English response explaining why these picks suit the event, plus one styling tip. If the request is too vague, still recommend best-fit inventory and ask one short follow-up question.',
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
    const picksMatch = outputText.match(/^PICKS:\s*(.+)$/m)
    const pickedIds = picksMatch?.[1]
      ?.split(',')
      .map((id) => id.trim())
      .filter(Boolean)
      .slice(0, 3)

      const suggestionIds = pickedIds?.length ? pickedIds : shortlist.slice(0, 3).map((item) => item.id)
      const suggestions = suggestionIds
        .map((id) => shortlist.find((item) => item.id === id))
        .filter(Boolean)

    const cleanedReply = outputText.replace(/^PICKS:\s*.+$/m, '').trim()

    return res.json({
      reply: cleanedReply || 'I found a few strong options from our stock for your event.',
      suggestions,
      source: activeProvider,
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
  })
})

app.listen(port, () => {
  console.log(`ESHINE stylist server listening on http://localhost:${port}`)
})
