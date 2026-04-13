import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const starterPrompts = [
  'I have a formal party this weekend and want something sharp.',
  'Suggest something festive for a family wedding.',
  'I need a quick office look that still feels premium.',
]

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787'

const StylistChatbot = ({ accountData }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Tell me about your event, vibe, and how much time you have. I will suggest looks only from current ESHINE stock.',
      suggestions: [],
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatError, setChatError] = useState('')

  const runPrompt = async (promptText) => {
    if (!promptText.trim()) {
      return
    }

    const nextUserMessage = {
      role: 'user',
      text: promptText,
      suggestions: [],
    }

    setMessages((current) => [...current, nextUserMessage])
    setInput('')
    setIsLoading(true)
    setChatError('')

    try {
      const response = await fetch(`${apiBaseUrl}/api/stylist-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: promptText,
          accountProfile: accountData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Unable to get stylist suggestions.')
      }

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text: data.reply,
          suggestions: data.suggestions || [],
        },
      ])
    } catch (error) {
      setChatError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await runPrompt(input)
  }

  return (
    <section className="account-panel account-panel-wide">
      <div className="account-panel-header">
        <h2>AI Style Chatbot</h2>
        <p>
          Share your event, dress code, or mood. The bot will recommend only from available ESHINE stock.
        </p>
      </div>

      <div className="account-chat-starters">
        {starterPrompts.map((prompt) => (
          <button key={prompt} type="button" className="account-choice-chip" onClick={() => runPrompt(prompt)}>
            {prompt}
          </button>
        ))}
      </div>

      <div className="account-chat-thread">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`account-chat-bubble ${message.role}`}>
            <p>{message.text}</p>

            {message.suggestions?.length ? (
              <div className="account-chat-suggestions">
                {message.suggestions.map((product) => (
                  <Link
                    key={product.id}
                    to="/product"
                    state={{ product }}
                    className="account-chat-product"
                  >
                    <img src={product.img} alt={product.name} />
                    <div>
                      <strong>{product.name}</strong>
                      <span>{product.price}</span>
                      <small>{product.style} • {product.category}</small>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ))}

        {isLoading ? (
          <div className="account-chat-bubble assistant">
            <p className="account-chat-loading">
              <span className="account-spinner account-spinner-dark" aria-hidden="true" />
              Thinking through your event and matching stock...
            </p>
          </div>
        ) : null}
      </div>

      {chatError ? <p className="account-error">{chatError}</p> : null}

      <form className="account-chat-form" onSubmit={handleSubmit}>
        <textarea
          rows="4"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Example: I have a formal evening party tomorrow, I want something classy but not too loud, and I don’t have time to decide."
        />
        <button type="submit" className="btn-black" disabled={isLoading}>
          Ask Stylist
        </button>
      </form>
    </section>
  )
}

export default StylistChatbot
