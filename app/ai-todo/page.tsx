'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Sparkles, Globe, CheckCircle2, Circle, Trash2, FileText } from 'lucide-react'
import LaserFlow from '@/components/LaserFlow'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

interface Task {
  id: string
  text: string
  completed: boolean
  notes: string
}

const translations = {
  en: {
    title: 'AI Project Assistant',
    subtitle: 'Get smart suggestions for your project',
    placeholder: 'Describe your project idea...',
    send: 'Send',
    welcome: 'Start chatting to get AI-powered project suggestions',
    thinking: 'Thinking...',
    todoTitle: 'Your Tasks',
    addNote: 'Add notes...',
    noTasks: 'No tasks yet. Start chatting to get suggestions!',
  },
  hi: {
    title: 'एआई प्रोजेक्ट सहायक',
    subtitle: 'अपने प्रोजेक्ट के लिए स्मार्ट सुझाव प्राप्त करें',
    placeholder: 'अपने प्रोजेक्ट के बारे में बताएं...',
    send: 'भेजें',
    welcome: 'एआई-संचालित प्रोजेक्ट सुझाव पाने के लिए चैट शुरू करें',
    thinking: 'सोच रहे हैं...',
    todoTitle: 'आपके कार्य',
    addNote: 'नोट जोड़ें...',
    noTasks: 'अभी तक कोई कार्य नहीं। सुझाव पाने के लिए चैट शुरू करें!',
  }
}

export default function AITodo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [language, setLanguage] = useState<'en' | 'hi'>('en')
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [showChat, setShowChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const t = translations[language]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setShowChat(true)

    try {
      const response = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectDescription: input,
          language: language
        })
      })

      const data = await response.json()

      // Handle different response formats
      const suggestions = data.suggestions || []

      // Create AI message from suggestions
      let aiContent = ''
      if (suggestions.length > 0) {
        aiContent = suggestions.map((s: any, idx: number) =>
          `${idx + 1}. **${s.title || 'Suggestion'}**\n${s.description || s.suggestion || ''}`
        ).join('\n\n')
      } else {
        aiContent = language === 'en'
          ? 'I\'ve analyzed your project. Here are some suggestions to help you get started.'
          : 'मैंने आपके प्रोजेक्ट का विश्लेषण किया है। शुरू करने में मदद के लिए कुछ सुझाव हैं।'
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiContent,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])

      // Add suggestions as tasks
      const newTasks = suggestions.map((s: any) => ({
        id: Date.now().toString() + Math.random(),
        text: s.title || s.suggestion || 'New Task',
        completed: false,
        notes: s.description || ''
      }))

      setTasks(prev => [...prev, ...newTasks])

    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: language === 'en'
          ? 'Sorry, something went wrong. Please try again.'
          : 'क्षमा करें, कुछ गलत हो गया। कृपया पुनः प्रयास करें।',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const toggleTaskStatus = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const updateTaskNotes = (id: string, notes: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, notes } : task
      )
    )
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }



  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-black to-pink-900">
      {/* LaserFlow Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <LaserFlow
          className="w-full h-full"
          style={{}}
          color="#8B5CF6"
          wispDensity={1.2}
          flowSpeed={0.4}
          fogIntensity={0.5}
          dpr={1}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-4 ml-auto">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all text-white"
            >
              <Globe size={20} />
              <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl h-[calc(100vh-250px)] flex flex-col border border-white/20">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {!showChat && messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-6 animate-pulse-slow">
                      <Sparkles className="text-white" size={48} />
                    </div>
                    <p className="text-white/70 text-lg">{t.welcome}</p>
                  </div>
                ) : (
                  <>
                    {messages.map((message, idx) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-message-slide-in`}
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <div
                          className={`max-w-[80%] px-6 py-4 rounded-2xl shadow-lg ${message.type === 'user'
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-white/90 text-gray-800'
                            }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start animate-message-slide-in">
                        <div className="bg-white/90 px-6 py-4 rounded-2xl shadow-lg">
                          <div className="flex items-center gap-2 text-gray-600">
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                              <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                              <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                            <span>{t.thinking}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Input */}
              <div className="p-6 border-t border-white/20">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t.placeholder}
                    className="flex-1 px-6 py-4 bg-white/90 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400"
                    disabled={loading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold shadow-lg flex items-center gap-2"
                  >
                    <Send size={20} />
                    {t.send}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/20 h-[calc(100vh-250px)] flex flex-col">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FileText size={24} />
                {t.todoTitle}
              </h2>

              <div className="flex-1 overflow-y-auto space-y-3">
                {tasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <FileText className="text-white/30 mb-4" size={48} />
                    <p className="text-white/50 text-sm">{t.noTasks}</p>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white/90 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all animate-fade-in"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <button
                          onClick={() => toggleTaskStatus(task.id)}
                          className="mt-1 flex-shrink-0"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="text-green-500" size={20} />
                          ) : (
                            <Circle className="text-gray-400" size={20} />
                          )}
                        </button>
                        <p
                          className={`flex-1 text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                            }`}
                        >
                          {task.text}
                        </p>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <textarea
                        value={task.notes}
                        onChange={(e) => updateTaskNotes(task.id, e.target.value)}
                        placeholder={t.addNote}
                        className="w-full px-3 py-2 bg-gray-50 rounded-lg text-xs text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
                        rows={2}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes message-slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .animate-message-slide-in {
          animation: message-slide-in 0.4s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
