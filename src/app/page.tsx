'use client'
import { useState } from 'react'

type Message = {
  role: 'user' | 'agent'
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    try {
      const res = await fetch('http://localhost:5050/api/aia​gent/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      const data = await res.json()

      const agentMsg: Message = {
        role: 'agent',
        content: JSON.stringify(data, null, 2)
      }

      setMessages(prev => [...prev, agentMsg])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'agent',
        content: 'Bir hata oluştu.'
      }])
    }
  }

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4 font-bold">AI Agent Chat</h1>
      <div className="border p-4 h-96 overflow-y-scroll bg-white mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-blue-700' : 'text-green-700'}`}>
            <strong>{msg.role === 'user' ? 'Sen:' : 'Agent:'}</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2">
          Gönder
        </button>
      </div>
    </main>
  )
}
