'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Download, RefreshCw } from 'lucide-react'

const monthlyData = {
  'This Month': [
    { month: 'Jan', tasks: 45, completed: 38 },
    { month: 'Feb', tasks: 52, completed: 47 },
    { month: 'Mar', tasks: 48, completed: 42 },
    { month: 'Apr', tasks: 61, completed: 55 },
    { month: 'May', tasks: 68, completed: 60 },
  ],
  'Last Month': [
    { month: 'Jan', tasks: 40, completed: 35 },
    { month: 'Feb', tasks: 45, completed: 40 },
    { month: 'Mar', tasks: 50, completed: 45 },
    { month: 'Apr', tasks: 55, completed: 50 },
    { month: 'May', tasks: 60, completed: 52 },
  ],
  'Last Year': [
    { month: 'Jan', tasks: 200, completed: 180 },
    { month: 'Feb', tasks: 220, completed: 195 },
    { month: 'Mar', tasks: 210, completed: 190 },
    { month: 'Apr', tasks: 240, completed: 215 },
    { month: 'May', tasks: 268, completed: 240 },
  ]
}

const statsData = {
  'This Month': [
    { label: 'Total Tasks', value: '68', change: '+12%', color: 'green' },
    { label: 'Completed', value: '55', change: '+8%', color: 'blue' },
    { label: 'In Progress', value: '9', change: '-3%', color: 'orange' },
    { label: 'Overdue', value: '4', change: '-5%', color: 'red' },
  ],
  'Last Month': [
    { label: 'Total Tasks', value: '60', change: '+5%', color: 'green' },
    { label: 'Completed', value: '52', change: '+4%', color: 'blue' },
    { label: 'In Progress', value: '6', change: '-2%', color: 'orange' },
    { label: 'Overdue', value: '2', change: '-1%', color: 'red' },
  ],
  'Last Year': [
    { label: 'Total Tasks', value: '268', change: '+45%', color: 'green' },
    { label: 'Completed', value: '240', change: '+40%', color: 'blue' },
    { label: 'In Progress', value: '20', change: '-10%', color: 'orange' },
    { label: 'Overdue', value: '8', change: '-15%', color: 'red' },
  ]
}

type Period = 'This Month' | 'Last Month' | 'Last Year'

export default function ReportsPage() {
  const [period, setPeriod] = useState<Period>('This Month')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 600)
  }

  const handleDownload = () => {
    alert(`Downloading PDF report for timeframe: ${period}...`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
          <p className="text-slate-500 text-sm mt-0.5">Analytics and insights for your workspace</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as Period)}
            className="input-field w-36 bg-white py-1.5"
          >
            <option value="This Month">This Month</option>
            <option value="Last Month">Last Month</option>
            <option value="Last Year">Last Year</option>
          </select>
          <button
            onClick={handleRefresh}
            className="p-2 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 text-slate-600 transition-colors"
            title="Refresh analytics"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleDownload}
            className="btn-primary py-1.5 px-3 flex items-center gap-1.5 text-xs font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800 text-sm">Monthly Task Overview</h3>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">{period}</span>
          </div>
          <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData[period]} margin={{ left: -20, right: 10 }}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="tasks" fill="#dbeafe" radius={4} name="Total Tasks" />
                <Bar dataKey="completed" fill="#3b82f6" radius={4} name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800 text-sm">Completion Trend</h3>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">{period}</span>
          </div>
          <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyData[period]} margin={{ left: -20, right: 10 }}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="completed" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6' }} name="Completed Tasks" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData[period].map((stat) => (
          <div key={stat.label} className="card p-5 hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            <div className={`text-xs mt-2 font-medium ${
              stat.color === 'green' || stat.color === 'blue' ? 'text-green-600' : 'text-red-500'
            }`}>
              {stat.change} from last month
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
