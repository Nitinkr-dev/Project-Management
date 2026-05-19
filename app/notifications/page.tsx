'use client'

import { useState } from 'react'
import { CheckCheck, Trash2, Filter } from 'lucide-react'
import clsx from 'clsx'

const initialNotifications = [
  { id: 1, type: 'task', icon: '📋', title: 'Task "Design New Homepage" has been completed by Rahul Verma.', sub: 'Website Redesign', time: '10 min ago', unread: true, priority: 'High' },
  { id: 2, type: 'mention', icon: '💬', title: 'Anita Sharma mentioned you in a comment.', sub: 'Task: Fix responsive issue on dashboard', time: '1 hour ago', unread: true, priority: 'High' },
  { id: 3, type: 'task', icon: '📋', title: 'New task "API integration for user module" has been assigned to you.', sub: 'CRM System', time: '2 hours ago', unread: true, priority: 'Medium' },
  { id: 4, type: 'project', icon: '📁', title: 'New file "Brand_guidelines.pdf" has been uploaded.', sub: 'Branding Project', time: '3 hours ago', unread: true, priority: 'Low' },
  { id: 5, type: 'project', icon: '👥', title: 'Sneha Patel added you to the project "Mobile App Development".', sub: 'Mobile App Development', time: '5 hours ago', unread: true, priority: 'Medium' },
  { id: 6, type: 'system', icon: '📅', title: 'Project meeting scheduled tomorrow at 11:00 AM.', sub: 'Project: Website Redesign', time: 'Yesterday', unread: true, priority: 'High' },
  { id: 7, type: 'task', icon: '✅', title: 'Task "Code review and bug fixes" is now in Review.', sub: 'Mobile App', time: 'Yesterday', unread: false, priority: 'Low' },
  { id: 8, type: 'system', icon: '🔔', title: 'Leave request from Rahul Verma has been approved.', sub: 'Leave Date: 15 May 2024', time: '2 days ago', unread: false, priority: 'Low' },
  { id: 9, type: 'report', icon: '📊', title: 'Monthly report for April 2024 is ready.', sub: 'Reports', time: '3 days ago', unread: false, priority: 'Medium' },
  { id: 10, type: 'task', icon: '⚠️', title: 'Task "Database optimization" is overdue.', sub: 'CRM System', time: '3 days ago', unread: false, priority: 'High' },
  { id: 11, type: 'message', icon: '💬', title: 'New message from Client - TechNova Inc.', sub: 'Project: Website Redesign', time: '4 days ago', unread: false, priority: 'Medium' },
  { id: 12, type: 'system', icon: '📋', title: 'Your timesheet for this week is pending submission.', sub: 'Week: 6 - 12 May 2024', time: '5 days ago', unread: false, priority: 'Low' },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'mentions'>('all')
  
  // Advanced filters state
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Tasks', 'Projects', 'Messages', 'System', 'Reports', 'Others'])
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(['High', 'Medium', 'Low'])

  const unreadCount = notifications.filter(n => n.unread).length
  const mentionsCount = notifications.filter(n => n.type === 'mention').length

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  const handleToggleRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: !n.unread } : n))
  }

  const handleClearFilters = () => {
    setSelectedTypes(['Tasks', 'Projects', 'Messages', 'System', 'Reports', 'Others'])
    setSelectedPriorities(['High', 'Medium', 'Low'])
  }

  const handleTypeToggle = (type: string) => {
    if (type === 'All Types') {
      if (selectedTypes.length === 6) {
        setSelectedTypes([])
      } else {
        setSelectedTypes(['Tasks', 'Projects', 'Messages', 'System', 'Reports', 'Others'])
      }
      return
    }
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const handlePriorityToggle = (priority: string) => {
    if (priority === 'All Priorities') {
      if (selectedPriorities.length === 3) {
        setSelectedPriorities([])
      } else {
        setSelectedPriorities(['High', 'Medium', 'Low'])
      }
      return
    }
    setSelectedPriorities(prev =>
      prev.includes(priority) ? prev.filter(p => p !== priority) : [...prev, priority]
    )
  }

  // Filter logic
  const displayed = notifications.filter(n => {
    // 1. Tab check
    if (activeTab === 'unread' && !n.unread) return false
    if (activeTab === 'mentions' && n.type !== 'mention') return false

    // 2. Type check
    const typeMapping: Record<string, string> = {
      task: 'Tasks',
      project: 'Projects',
      message: 'Messages',
      system: 'System',
      report: 'Reports',
      mention: 'Messages'
    }
    const matchedType = typeMapping[n.type] || 'Others'
    if (!selectedTypes.includes(matchedType)) return false

    // 3. Priority check
    if (!selectedPriorities.includes(n.priority)) return false

    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
        <p className="text-slate-500 text-sm mt-0.5">Stay updated with what's happening in your workspace.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Notifications Feed */}
        <div className="flex-1 card overflow-hidden">
          {/* Tabs header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3 border-b border-slate-100 gap-3">
            <div className="flex gap-1 overflow-x-auto">
              {[
                { key: 'all', label: `All (${notifications.length})` },
                { key: 'unread', label: `Unread (${unreadCount})` },
                { key: 'mentions', label: `Mentions (${mentionsCount})` },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={clsx(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                    activeTab === tab.key ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:text-slate-700'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline font-medium self-start sm:self-auto transition-all"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all as read
            </button>
          </div>

          {/* List */}
          <div className="divide-y divide-slate-50">
            {displayed.length > 0 ? (
              displayed.map(n => (
                <div
                  key={n.id}
                  onClick={() => handleToggleRead(n.id)}
                  className={clsx(
                    'flex items-start gap-3.5 px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer',
                    n.unread && 'bg-blue-50/20'
                  )}
                >
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-base flex-shrink-0 shadow-xs">
                    {n.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={clsx(
                      "text-sm leading-snug",
                      n.unread ? "text-slate-900 font-medium" : "text-slate-600"
                    )}>{n.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{n.sub}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-slate-400">{n.time}</span>
                    {n.unread && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-sm text-slate-400">
                No notifications match the active filter criteria.
              </div>
            )}
          </div>
          <div className="text-center py-5 text-sm text-slate-400 border-t border-slate-50">
            No more notifications
          </div>
        </div>

        {/* Filters Sidebar */}
        <div className="w-full lg:w-60 flex-shrink-0 space-y-4">
          <div className="card p-4">
            <h3 className="font-semibold text-slate-800 text-sm mb-3 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-slate-500" />
              Filters
            </h3>
            
            {/* Type Filters */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Notification Type</div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTypes.length === 6}
                    onChange={() => handleTypeToggle('All Types')}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-slate-600 flex-1 font-medium">All Types</span>
                </label>
                {['Tasks', 'Projects', 'Messages', 'System', 'Reports', 'Others'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer pl-2">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeToggle(type)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-600 flex-1">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Priority Filters */}
            <div className="mb-4 border-t border-slate-100 pt-3">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Priority</div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPriorities.length === 3}
                    onChange={() => handlePriorityToggle('All Priorities')}
                    className="rounded border-slate-300 text-blue-600"
                  />
                  <span className="text-xs text-slate-600 font-medium">All Priorities</span>
                </label>
                {['High', 'Medium', 'Low'].map(p => (
                  <label key={p} className="flex items-center gap-2 cursor-pointer pl-2">
                    <input
                      type="checkbox"
                      checked={selectedPriorities.includes(p)}
                      onChange={() => handlePriorityToggle(p)}
                      className="rounded border-slate-300 text-blue-600"
                    />
                    <span className="text-xs text-slate-600">{p}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <button
            onClick={handleClearFilters}
            className="w-full py-2.5 text-xs text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  )
}
