'use client'

import { useState } from 'react'
import { CheckCheck } from 'lucide-react'
import clsx from 'clsx'

const notifications = [
  { id: 1, type: 'task', icon: '📋', title: 'Task "Design New Homepage" has been completed by Rahul Verma.', sub: 'Website Redesign', time: '10 min ago', unread: true },
  { id: 2, type: 'mention', icon: '💬', title: 'Anita Sharma mentioned you in a comment.', sub: 'Task: Fix responsive issue on dashboard', time: '1 hour ago', unread: true },
  { id: 3, type: 'task', icon: '📋', title: 'New task "API integration for user module" has been assigned to you.', sub: 'CRM System', time: '2 hours ago', unread: true },
  { id: 4, type: 'project', icon: '📁', title: 'New file "Brand_guidelines.pdf" has been uploaded.', sub: 'Branding Project', time: '3 hours ago', unread: true },
  { id: 5, type: 'project', icon: '👥', title: 'Sneha Patel added you to the project "Mobile App Development".', sub: 'Mobile App Development', time: '5 hours ago', unread: true },
  { id: 6, type: 'system', icon: '📅', title: 'Project meeting scheduled tomorrow at 11:00 AM.', sub: 'Project: Website Redesign', time: 'Yesterday', unread: true },
  { id: 7, type: 'task', icon: '✅', title: 'Task "Code review and bug fixes" is now in Review.', sub: 'Mobile App', time: 'Yesterday', unread: false },
  { id: 8, type: 'system', icon: '🔔', title: 'Leave request from Rahul Verma has been approved.', sub: 'Leave Date: 15 May 2024', time: '2 days ago', unread: false },
  { id: 9, type: 'report', icon: '📊', title: 'Monthly report for April 2024 is ready.', sub: 'Reports', time: '3 days ago', unread: false },
  { id: 10, type: 'task', icon: '⚠️', title: 'Task "Database optimization" is overdue.', sub: 'CRM System', time: '3 days ago', unread: false },
  { id: 11, type: 'message', icon: '💬', title: 'New message from Client - TechNova Inc.', sub: 'Project: Website Redesign', time: '4 days ago', unread: false },
  { id: 12, type: 'system', icon: '📋', title: 'Your timesheet for this week is pending submission.', sub: 'Week: 6 - 12 May 2024', time: '5 days ago', unread: false },
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'mentions'>('all')
  const [typeFilters, setTypeFilters] = useState(['Tasks', 'Projects', 'Messages', 'System', 'Reports', 'Others'])

  const unreadCount = notifications.filter(n => n.unread).length
  const mentionsCount = notifications.filter(n => n.type === 'mention').length

  const displayed = notifications.filter(n => {
    if (activeTab === 'unread') return n.unread
    if (activeTab === 'mentions') return n.type === 'mention'
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
        <p className="text-slate-500 text-sm mt-0.5">Stay updated with what's happening in your workspace.</p>
      </div>

      <div className="flex gap-6">
        {/* Main */}
        <div className="flex-1 card">
          {/* Tabs */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
            <div className="flex gap-1">
              {[
                { key: 'all', label: `All ${notifications.length}` },
                { key: 'unread', label: `Unread ${unreadCount}` },
                { key: 'mentions', label: `Mentions ${mentionsCount}` },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={clsx('px-3 py-1.5 rounded-lg text-sm font-medium transition-colors', activeTab === tab.key ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:text-slate-700')}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline font-medium">
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all as read
            </button>
          </div>

          {/* List */}
          <div className="divide-y divide-slate-50">
            {displayed.map(n => (
              <div key={n.id} className={clsx('flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer', n.unread && 'bg-blue-50/30')}>
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-base flex-shrink-0 shadow-sm">
                  {n.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 leading-snug">{n.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{n.sub}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-slate-400">{n.time}</span>
                  {n.unread && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center py-5 text-sm text-slate-400 border-t border-slate-50">No more notifications</div>
        </div>

        {/* Filters sidebar */}
        <div className="w-56 flex-shrink-0 space-y-4">
          <div className="card p-4">
            <h3 className="font-semibold text-slate-800 text-sm mb-3">Filters</h3>
            <div className="mb-4">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Notification Type</div>
              <div className="space-y-2">
                {['All Types', 'Tasks', 'Projects', 'Messages', 'System', 'Reports', 'Others'].map((type, i) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-xs text-slate-600 flex-1">{type}</span>
                    <span className="text-xs text-slate-400">{i === 0 ? 12 : [4, 2, 1, 3, 1, 1][i - 1]}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Priority</div>
              <div className="space-y-2">
                {['All Priorities', 'High', 'Medium', 'Low'].map(p => (
                  <label key={p} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked={p === 'All Priorities'} className="rounded border-slate-300 text-blue-600" />
                    <span className="text-xs text-slate-600">{p}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Date</div>
              <select className="input-field text-xs">
                <option>All Time</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
          </div>
          <button className="w-full py-2 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium flex items-center justify-center gap-2">
            🗑 Clear Filters
          </button>
        </div>
      </div>
    </div>
  )
}
