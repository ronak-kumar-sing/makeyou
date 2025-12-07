'use client'

import { useState, useEffect } from 'react'
import { FileText, MessageSquare, Calendar, Globe, CheckCircle2, Circle, ChevronDown, ChevronUp, Lock, Mail, Phone, User } from 'lucide-react'

interface Task {
  id: string
  text: string
  completed: boolean
  notes: string
}

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: string
}

interface Submission {
  _id?: string
  id?: string
  projectId?: string
  tasks: Task[]
  messages: Message[]
  language: 'en' | 'hi'
  submittedAt: string
  status?: string
}

interface Contact {
  _id: string
  name: string
  email: string
  phone?: string
  projectType?: string
  budget?: string
  description?: string
  timeline?: string
  createdAt: string
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'projects' | 'contacts'>('projects')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'blackout') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions()
      fetchContacts()
    }
  }, [isAuthenticated])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/submit-project')
      const data = await response.json()
      setSubmissions(data.submissions || [])
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contact')
      const data = await response.json()
      setContacts(data.data || [])
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Lock className="text-white" size={32} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white text-center mb-2">Admin Access</h2>
          <p className="text-purple-200 text-center mb-6">Enter password to continue</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all text-white font-semibold shadow-lg"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading submissions...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-purple-200 text-lg">
            Manage submissions and contacts
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'projects'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
          >
            Project Submissions ({submissions.length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'contacts'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
          >
            Contact Forms ({contacts.length})
          </button>
        </div>

        {/* Project Submissions Tab */}
        {activeTab === 'projects' && (
          <>
            {submissions.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/20">
                <FileText className="mx-auto text-white/30 mb-4" size={64} />
                <p className="text-white/70 text-xl">No submissions yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {submissions.map((submission) => {
                  const submissionId = submission.projectId || submission.id || submission._id?.toString() || 'unknown';
                  return (
                    <div
                      key={submissionId}
                      className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 transition-all hover:bg-white/15"
                    >
                      {/* Submission Header */}
                      <div
                        className="p-6 cursor-pointer"
                        onClick={() => toggleExpand(submissionId)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <FileText className="text-white" size={24} />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{submissionId}</h3>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="flex items-center gap-1 text-purple-200 text-sm">
                                  <Calendar size={14} />
                                  {formatDate(submission.submittedAt)}
                                </span>
                                <span className="flex items-center gap-1 text-purple-200 text-sm">
                                  <Globe size={14} />
                                  {submission.language === 'en' ? 'English' : 'हिंदी'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="text-white font-semibold">{submission.tasks.length} Tasks</div>
                              <div className="text-purple-200 text-sm">
                                {submission.tasks.filter(t => t.completed).length} Completed
                              </div>
                            </div>
                            {expandedId === submissionId ? (
                              <ChevronUp className="text-white" size={24} />
                            ) : (
                              <ChevronDown className="text-white" size={24} />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {expandedId === submissionId && (
                        <div className="border-t border-white/20 p-6 space-y-6">
                          {/* Messages */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                              <MessageSquare size={20} />
                              Chat History
                            </h4>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                              {submission.messages.map((message) => (
                                <div
                                  key={message.id}
                                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                  <div
                                    className={`max-w-[80%] px-4 py-3 rounded-xl ${message.type === 'user'
                                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                      : 'bg-white/20 text-white'
                                      }`}
                                  >
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    <p className="text-xs opacity-70 mt-1">
                                      {formatDate(message.timestamp)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tasks */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                              <FileText size={20} />
                              Tasks
                            </h4>
                            <div className="space-y-3">
                              {submission.tasks.map((task) => (
                                <div
                                  key={task.id}
                                  className="bg-white/20 rounded-xl p-4"
                                >
                                  <div className="flex items-start gap-3 mb-2">
                                    {task.completed ? (
                                      <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={20} />
                                    ) : (
                                      <Circle className="text-gray-400 flex-shrink-0 mt-1" size={20} />
                                    )}
                                    <p
                                      className={`flex-1 text-white ${task.completed ? 'line-through opacity-60' : ''
                                        }`}
                                    >
                                      {task.text}
                                    </p>
                                  </div>
                                  {task.notes && (
                                    <div className="ml-8 mt-2 p-3 bg-white/10 rounded-lg">
                                      <p className="text-sm text-purple-200">
                                        <span className="font-semibold">Notes:</span> {task.notes}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* Contact Forms Tab */}
        {activeTab === 'contacts' && (
          <>
            {contacts.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/20">
                <Mail className="mx-auto text-white/30 mb-4" size={64} />
                <p className="text-white/70 text-xl">No contact submissions yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {contacts.map((contact) => {
                  const contactId = contact._id.toString();
                  return (
                    <div
                      key={contactId}
                      className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 transition-all hover:bg-white/15"
                    >
                      {/* Contact Header */}
                      <div
                        className="p-6 cursor-pointer"
                        onClick={() => toggleExpand(contactId)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                              <User className="text-white" size={24} />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{contact.name}</h3>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="flex items-center gap-1 text-purple-200 text-sm">
                                  <Mail size={14} />
                                  {contact.email}
                                </span>
                                {contact.phone && (
                                  <span className="flex items-center gap-1 text-purple-200 text-sm">
                                    <Phone size={14} />
                                    {contact.phone}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="text-purple-200 text-sm">
                                {formatDate(contact.createdAt)}
                              </div>
                            </div>
                            {expandedId === contactId ? (
                              <ChevronUp className="text-white" size={24} />
                            ) : (
                              <ChevronDown className="text-white" size={24} />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {expandedId === contactId && (
                        <div className="border-t border-white/20 p-6 space-y-4">
                          {contact.description && (
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-2">Message</h4>
                              <p className="text-purple-200 bg-white/10 rounded-lg p-4">
                                {contact.description}
                              </p>
                            </div>
                          )}
                          {(contact.projectType || contact.budget || contact.timeline) && (
                            <div className="grid grid-cols-3 gap-4">
                              {contact.projectType && (
                                <div className="bg-white/10 rounded-lg p-4">
                                  <div className="text-white/60 text-sm mb-1">Project Type</div>
                                  <div className="text-white font-semibold">{contact.projectType}</div>
                                </div>
                              )}
                              {contact.budget && (
                                <div className="bg-white/10 rounded-lg p-4">
                                  <div className="text-white/60 text-sm mb-1">Budget</div>
                                  <div className="text-white font-semibold">{contact.budget}</div>
                                </div>
                              )}
                              {contact.timeline && (
                                <div className="bg-white/10 rounded-lg p-4">
                                  <div className="text-white/60 text-sm mb-1">Timeline</div>
                                  <div className="text-white font-semibold">{contact.timeline}</div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
