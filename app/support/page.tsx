'use client'

import { useState } from 'react'
import {
  Headphones, Send, HelpCircle, CheckCircle, Clock,
  ChevronDown, ChevronUp, Mail, Phone, Clock3, MessageSquare, Plus
} from 'lucide-react'
import clsx from 'clsx'

const initialFaqs = [
  { id: 1, q: 'How do I invite team members?', a: 'Go to Settings > Team tab, click the "Invite Member" button, and enter their email address. They will receive an email invitation to join your workspace.' },
  { id: 2, q: 'Can I export reports to Excel or PDF?', a: 'Yes! On the Reports page, select your reporting period and click the "Export PDF" button at the top right to download a generated summary.' },
  { id: 3, q: 'How does the Kanban Board work?', a: 'Our Kanban board is split into statuses (Todo, In Progress, Review, Completed). You can drag and drop cards to change status, click edit options, or add new tasks in columns directly.' },
  { id: 4, q: 'Is there a limit to the number of projects?', a: 'On the Pro tier, you can create unlimited projects. Free accounts are limited to 3 active projects at any one time.' },
  { id: 5, q: 'How secure is my company data?', a: 'We secure all data using AES-256 encryption at rest and SSL/TLS transmission protocols. Two-factor authentication (2FA) is also enabled on your security tab.' }
]

const initialTickets = [
  { id: 'TKT-8493', subject: 'Billing question regarding next invoice', category: 'Billing', priority: 'Medium', status: 'Resolved', date: '10 May 2026' },
  { id: 'TKT-9102', subject: 'Kanban cards lag during peak hours', category: 'Technical Support', priority: 'High', status: 'In Progress', date: '12 May 2026' },
]

export default function SupportPage() {
  const [tickets, setTickets] = useState(initialTickets)
  const [faqs, setFaqs] = useState(initialFaqs)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  // Form State
  const [subject, setSubject] = useState('')
  const [category, setCategory] = useState('Technical Support')
  const [priority, setPriority] = useState('Medium')
  const [description, setDescription] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleToggleFaq = (id: number) => {
    setActiveFaq(prev => (prev === id ? null : id))
  }

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim() || !description.trim()) {
      alert('Please fill out both the subject and the description.')
      return
    }

    const tktId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`
    const today = new Date()
    const dateStr = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

    const newTicket = {
      id: tktId,
      subject,
      category,
      priority,
      status: 'Pending',
      date: dateStr
    }

    setTickets(prev => [newTicket, ...prev])
    setSubject('')
    setDescription('')
    setSuccessMsg(`Ticket ${tktId} has been successfully submitted! Our support agents will reach out soon.`)

    setTimeout(() => {
      setSuccessMsg('')
    }, 6000)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Headphones className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Support Center</h1>
          <p className="text-slate-500 text-sm mt-0.5">Need help? Submit a support request or browse common questions.</p>
        </div>
      </div>

      {/* Online indicator */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 flex items-center gap-3">
        <span className="relative flex h-3.5 w-3.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>
        <div>
          <div className="text-xs font-semibold text-emerald-800">Support is currently online</div>
          <div className="text-[10px] text-emerald-600">Average response time is currently 14 minutes. We are here to help!</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Left Columns */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          {/* Submit ticket form */}
          <div className="card p-4 md:p-6">
            <h3 className="font-semibold text-slate-800 text-sm mb-4">Submit a New Support Ticket</h3>
            
            {successMsg && (
              <div className="bg-blue-50 border border-blue-100 text-blue-800 text-xs rounded-lg p-3.5 mb-4 font-medium transition-all">
                ✅ {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Topic Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="input-field bg-white"
                  >
                    <option>Technical Support</option>
                    <option>Billing & Invoices</option>
                    <option>Feature Requests</option>
                    <option>Bug Report</option>
                    <option>Account Access</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Urgency Priority</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                    className="input-field bg-white"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Subject / Issue Title</label>
                <input
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="e.g. Can't sync calendar items with Google Calendar"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Detailed Description</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Please describe your issue in detail. Include any steps to reproduce or error messages."
                  rows={4}
                  className="input-field resize-none py-2"
                  required
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="btn-primary px-4 py-2 text-xs flex items-center gap-1.5 font-semibold cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>

          {/* Ticket History */}
          <div className="card">
            <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 text-sm">Your Ticket History</h3>
              <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full font-medium">
                {tickets.length} Active Tickets
              </span>
            </div>
            <div className="divide-y divide-slate-50">
              {tickets.map(tkt => (
                <div key={tkt.id} className="p-4 md:p-5 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 flex-shrink-0">
                    #
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 mb-1">
                      <span className="text-sm font-semibold text-slate-800 truncate">{tkt.subject}</span>
                      <span className={clsx(
                        'badge self-start sm:self-auto text-[9px]',
                        tkt.status === 'Resolved' && 'badge-green',
                        tkt.status === 'In Progress' && 'badge-orange',
                        tkt.status === 'Pending' && 'badge-gray'
                      )}>
                        {tkt.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span>ID: <strong className="text-slate-600">{tkt.id}</strong></span>
                      <span>Category: <strong className="text-slate-600">{tkt.category}</strong></span>
                      <span>Priority: <span className={clsx(
                        'font-semibold',
                        tkt.priority === 'High' || tkt.priority === 'Urgent' ? 'text-red-500' : 'text-slate-500'
                      )}>{tkt.priority}</span></span>
                      <span>Submitted: {tkt.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support Sidebar (FAQs, contact info) */}
        <div className="space-y-6">
          {/* FAQ expander */}
          <div className="card p-4 md:p-5">
            <h3 className="font-semibold text-slate-800 text-sm mb-4 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-2.5">
              {faqs.map(faq => {
                const isExpanded = activeFaq === faq.id
                return (
                  <div key={faq.id} className="border border-slate-100 rounded-lg overflow-hidden transition-colors bg-slate-50/20">
                    <button
                      onClick={() => handleToggleFaq(faq.id)}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <span className="pr-2">{faq.q}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-3.5 pb-3 text-xs text-slate-500 leading-relaxed border-t border-slate-50 pt-2 bg-white">
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Direct Support Info */}
          <div className="card p-4 md:p-5">
            <h3 className="font-semibold text-slate-800 text-sm mb-4">Direct Contact Support</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-700">Email Address</div>
                  <a href="mailto:support@promanage.com" className="text-xs text-blue-600 hover:underline">
                    support@promanage.com
                  </a>
                  <div className="text-[10px] text-slate-400 mt-0.5">Response within 1-2 hours</div>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-700">Phone Support</div>
                  <div className="text-xs text-slate-600 font-medium">+1 (800) 555-0199</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Toll-free, 24/7 priority line</div>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0 mt-0.5">
                  <Clock3 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-700">Office Working Hours</div>
                  <div className="text-xs text-slate-600">Monday - Friday</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">09:00 AM - 06:00 PM IST</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
