"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Send, User } from "lucide-react"

// Sample AI responses
const sampleResponses = [
  "Based on your current parameters, I recommend increasing your inventory by 15% for Q3 to account for the seasonal demand spike.",
  "I've analyzed your data and noticed that weather has a stronger correlation with sales than initially modeled. Consider giving it more weight in your forecast.",
  "Your competitor activity parameter might be too conservative. Market intelligence suggests they're planning a major promotion in August that could impact your sales by up to 8%.",
  "The economic indicators for your target market are showing stronger growth than the national average. Consider adjusting your economic growth parameter to 3.2% for a more accurate forecast.",
]

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI forecasting assistant. I can help you interpret data, suggest parameter adjustments, or create custom scenarios. What would you like to know?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: input }])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)]
      setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
        <CardDescription>Ask questions or get insights about your forecast</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
              <div
                className={`flex items-start gap-2 max-w-[80%] ${message.role === "assistant" ? "" : "flex-row-reverse"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${message.role === "assistant" ? "bg-primary/10" : "bg-secondary/10"}`}
                >
                  {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div
                  className={`rounded-lg px-3 py-2 ${message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"}`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-lg px-3 py-2 bg-muted">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center space-x-2">
          <Textarea
            placeholder="Ask about your forecast or suggest adjustments..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <Button size="icon" onClick={handleSend} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
