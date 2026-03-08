'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Send, MessageCircle, Loader } from 'lucide-react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'

export const dynamic = 'force-dynamic'

export default function ChatPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: '/api/chat',
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="p-6 max-w-4xl h-full flex flex-col">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <MessageCircle className="text-accent" size={24} />
          </div>
          <h1 className="text-3xl font-bold">Wellness Companion</h1>
        </div>
        <p className="text-muted-foreground">Chat with our AI assistant for emotional support and wellness guidance</p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-muted/30 rounded-lg border border-border p-4 mb-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-accent" size={32} />
              </div>
              <h2 className="text-xl font-semibold mb-2">Start a Conversation</h2>
              <p className="text-muted-foreground mb-6">
                Talk about how you're feeling, what's on your mind, or ask for support
              </p>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>• "I'm feeling anxious about work"</p>
                <p>• "How can I manage stress?"</p>
                <p>• "I need someone to talk to"</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              // Extract text from parts array
              const messageText = message.parts
                ?.filter((p) => p.type === 'text')
                .map((p) => (p as any).text)
                .join('') || ''

              return (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-white border border-border rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{messageText}</p>
                  </div>
                </div>
              )
            })}
            {status === 'streaming' && (
              <div className="flex justify-start">
                <div className="bg-white border border-border px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex items-center gap-2">
                    <Loader className="w-4 h-4 animate-spin text-accent" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      {mounted && (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message... (e.g., 'I'm feeling stressed')"
            disabled={status === 'streaming'}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={status === 'streaming' || !input.trim()}
            size="icon"
          >
            <Send size={20} />
          </Button>
        </form>
      )}

      {/* Safety Notice */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
        <p>
          <strong>Important:</strong> This AI assistant provides support and guidance, but is not a substitute for professional mental health care.
          If you're in crisis, please contact emergency services or the National Suicide Prevention Lifeline: 988.
        </p>
      </div>
    </div>
  )
}
