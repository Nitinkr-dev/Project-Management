'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  FolderOpen, CheckCircle2, Clock, Users, TrendingUp, Plus,
  ArrowUpRight, Calendar, Activity
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'

const taskActivity = [
  { date: 'May 1', completed: 20, created: 18 },
  { date: 'May 7', completed: 35, created: 40 },
  { date: 'May 14', completed: 45, created: 42 },
  { date: 'May 21', completed: 55, created: 60 },
  { date: 'May 28', completed: 70, created: 65 },
  { date: 'Jun 4', completed: 80, created: 75 },
]

const pieData = [
  { name: 'Completed', value: 9, color: '#3B82F6' },
  { name: 'In Progress', value: 7, color: '#22C55E' },
  { name: 'On Hold', value: 3, color: '#F59E0B' },
  { name: 'Not Started', value: 5, color: '#EF4444' },
]

const projects = [
  { name: 'Website Redesign', type: 'UI/UX Design', progress: 75, start: '25 Apr 2024', deadline: '25 May 2024', deadlineBad: true, team: ['A', 'B', 'C'], extra: 2 },
  { name: 'Mobile App Development', type: 'Development', progress: 60, start: '10 Apr 2024', deadline: '10 Jun 2024', deadlineBad: false, team: ['D', 'E'], extra: 3 },
  { name: 'CRM System', type: 'Development', progress: 45, start: '15 Apr 2024', deadline: '15 Jun 2024', deadlineBad: false, team: ['F', 'G'], extra: 2 },
  { name: 'Branding Project', type: 'Design', progress: 30, start: '30 Apr 2024', deadline: '30 Jun 2024', deadlineBad: false, team: ['H'], extra: 1 },
  { name: 'E-commerce Platform', type: 'Development', progress: 20, start: '20 Apr 2024', deadline: '20 Jun 2024', deadlineBad: false, team: ['I', 'J'], extra: 4 },
]

const recentActivity = [
  { icon: '🎨', text: 'Design System updated', sub: 'Website Redesign', time: '10m ago' },
  { icon: '✅', text: 'New task created - Landing Page', sub: 'Website Redesign', time: '1h ago' },
  { icon: '👤', text: 'Rahul Verma completed a task', sub: 'API Integration', time: '3h ago' },
  { icon: '📄', text: 'New file uploaded - Brand Guidelines.pdf', sub: 'Branding Project', time: '5h ago' },
  { icon: '👋', text: 'Sneha Patel joined the team', sub: 'Mobile App Development', time: '1d ago' },
]

const upcomingDeadlines = [
  { date: 'MAY 25', title: 'Website Redesign', sub: 'Design Review', urgency: 'Tomorrow', bad: true },
  { date: 'MAY 28', title: 'Mobile App Development', sub: 'Sprint Planning', urgency: 'In 3 days', bad: false },
  { date: 'JUN 2', title: 'CRM System', sub: 'Client Meeting', urgency: 'In 1 week', bad: false },
  { date: 'JUN 10', title: 'Branding Project', sub: 'Final Delivery', urgency: 'In 2 weeks', bad: false },
]

const COLORS = ['#3B82F6', '#22C55E', '#F59E0B', '#EF4444']

export default function DashboardPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, Admin! 👋</h1>
          <p className="text-slate-500 text-sm mt-0.5">Here's what's happening with your projects today.</p>
        </div>
        <div className="text-sm text-slate-500 flex items-center gap-1.5 shrink-0">
          <Calendar className="w-4 h-4 shrink-0" />
          May 13, 2026
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: '24', change: '+18% from last month', icon: FolderOpen, color: 'bg-blue-50 text-blue-600', trend: 'up' },
          { label: 'Active Tasks', value: '68', change: '+12% from last month', icon: CheckCircle2, color: 'bg-green-50 text-green-600', trend: 'up' },
          { label: 'Delayed Projects', value: '5', change: '-8% from last month', icon: Clock, color: 'bg-orange-50 text-orange-600', trend: 'down' },
          { label: 'Team Members', value: '16', change: '+5% from last month', icon: Users, color: 'bg-purple-50 text-purple-600', trend: 'up' },
        ].map(stat => (
          <div key={stat.label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center shrink-0`}>
                <stat.icon className="w-5 h-5 shrink-0" />
              </div>
              <TrendingUp className={`w-4 h-4 shrink-0 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-400'}`} />
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            <div className={`text-[11px] mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Pie */}
        <div className="card p-5 col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Project Overview</h3>
            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">This Month</span>
          </div>
          <div className="flex items-center gap-4">
            {mounted ? (
              <PieChart width={130} height={130}>
                <Pie data={pieData} cx={60} cy={60} innerRadius={40} outerRadius={62} dataKey="value" strokeWidth={0}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
              </PieChart>
            ) : (
              <div className="w-[130px] h-[130px] flex items-center justify-center bg-slate-50 rounded-full shrink-0 border border-slate-100" />
            )}
            <div className="space-y-2 flex-1 text-xs">
              <div className="text-center mb-1">
                <span className="text-2xl font-bold text-slate-800">24</span>
                <span className="text-xs text-slate-400 block">Projects</span>
              </div>
              {pieData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS[i] }} />
                  <span className="text-slate-600 flex-1">{item.name}</span>
                  <span className="font-semibold text-slate-800">{Math.round(item.value / 24 * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line chart */}
        <div className="card p-5 col-span-1 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Tasks Activity</h3>
            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">Last 7 Days</span>
          </div>
          <div className="h-[140px] w-full flex items-center justify-center">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={taskActivity}>
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                  <Line type="monotone" dataKey="completed" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3, fill: '#3B82F6' }} name="Completed" />
                  <Line type="monotone" dataKey="created" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Created" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-slate-50/50 animate-pulse rounded-lg" />
            )}
          </div>
          <div className="flex gap-4 mt-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-500"><div className="w-3 h-0.5 bg-blue-500 rounded" />Completed</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500"><div className="w-3 h-0.5 bg-slate-300 rounded border-dashed" />Created</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-5">
        <h3 className="font-semibold text-slate-800 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: Plus, label: 'New Project', sub: 'Start a new project', color: 'text-blue-600 bg-blue-50', href: '/projects' },
            { icon: CheckCircle2, label: 'Add Task', sub: 'Add a new task', color: 'text-green-600 bg-green-50', href: '/tasks' },
            { icon: Users, label: 'Invite Team', sub: 'Add team members', color: 'text-purple-600 bg-purple-50', href: '/settings' },
            { icon: Activity, label: 'Generate Report', sub: 'Download reports', color: 'text-orange-600 bg-orange-50', href: '/reports' },
          ].map(action => (
            <button
              key={action.label}
              onClick={() => router.push(action.href)}
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group text-left"
            >
              <div className={`w-9 h-9 rounded-xl ${action.color} flex items-center justify-center flex-shrink-0`}>
                <action.icon className="w-4 h-4 shrink-0" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-800 group-hover:text-blue-700">{action.label}</div>
                <div className="text-[11px] text-slate-400">{action.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Projects table */}
        <div className="card col-span-1 lg:col-span-2 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50 flex-shrink-0">
            <h3 className="font-semibold text-slate-800">Projects In Progress</h3>
            <button onClick={() => router.push('/projects')} className="text-blue-600 text-xs font-medium hover:underline flex items-center gap-1 shrink-0">
              View All Projects <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
          <div className="divide-y divide-slate-50 overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-5 px-5 py-2 text-[11px] font-medium text-slate-400 uppercase tracking-wide">
              <span className="col-span-2">Project</span>
              <span>Progress</span>
              <span>Deadline</span>
              <span>Team</span>
            </div>
            {projects.map(p => (
              <div key={p.name} className="grid grid-cols-5 items-center px-5 py-3 hover:bg-slate-50 transition-colors group">
                <div className="col-span-2">
                  <div className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors">{p.name}</div>
                  <div className="text-[11px] text-slate-400">{p.type}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1">{p.progress}%</div>
                  <div className="progress-bar w-20">
                    <div className="progress-fill" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
                <div className={`text-xs font-medium ${p.deadlineBad ? 'text-red-500' : 'text-slate-600'}`}>{p.deadline}</div>
                <div className="flex items-center">
                  {p.team.map((m, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white -ml-1.5 first:ml-0 flex items-center justify-center text-[9px] font-bold text-slate-600">{m}</div>
                  ))}
                  {p.extra > 0 && <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white -ml-1.5 flex items-center justify-center text-[9px] text-slate-500">+{p.extra}</div>}
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Recent Activity */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-800 text-sm">Recent Activity</h3>
              <button onClick={() => router.push('/notifications')} className="text-blue-600 text-xs hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex gap-2.5">
                  <div className="text-base flex-shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <div className="text-xs font-medium text-slate-700">{item.text}</div>
                    <div className="text-[11px] text-slate-400">{item.sub} · {item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-800 text-sm">Upcoming Deadlines</h3>
              <button onClick={() => router.push('/calendar')} className="text-blue-600 text-xs hover:underline">View Calendar</button>
            </div>
            <div className="space-y-3">
              {upcomingDeadlines.map((d, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="bg-slate-100 rounded-lg px-2 py-1.5 text-center min-w-[44px]">
                    <div className="text-[9px] font-semibold text-slate-400 leading-none">{d.date.split(' ')[0]}</div>
                    <div className="text-sm font-bold text-slate-800 leading-none mt-0.5">{d.date.split(' ')[1]}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-slate-800">{d.title}</div>
                    <div className="text-[11px] text-slate-400">{d.sub}</div>
                  </div>
                  <span className={`text-[11px] font-medium ${d.bad ? 'text-red-500' : 'text-slate-400'}`}>{d.urgency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
