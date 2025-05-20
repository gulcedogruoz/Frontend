 'use client'
import { useState, useRef, useEffect } from 'react'

type Message = {
  role: 'user' | 'agent'
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    try {
      const res = await fetch('http://localhost:5206/api/aiagent/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()

      
      const agentMsg: Message = {
        role: 'agent',
        content: data && "UÇUŞ BULUNAMADI"
      }
        
      setMessages(prev => [...prev, agentMsg])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'agent',
        content: '❌ An error occurred. Failed to connect to LLM service.'
      }])
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-indigo-100 to-purple-300 px-4">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col h-[90vh] border border-purple-100">
        <header className="mb-4 text-center border-b border-purple-200 pb-2">
          <h1 className="text-3xl font-extrabold text-purple-800 drop-shadow-sm">🛫 AI Flight Assistant</h1>
          <p className="text-sm text-gray-600 italic">Ask anything. Book, check-in, search flights.</p>
        </header>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-xl px-4 py-2 max-w-[70%] whitespace-pre-wrap text-sm shadow transition-all
                ${msg.role === 'user'
                  ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white'
                  : 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-900 border border-purple-200'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2 mt-4">
          <input
            className="flex-1 border border-purple-300 p-3 rounded-lg shadow-inner bg-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow-lg transition-all hover:shadow-purple-500/50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
