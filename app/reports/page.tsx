'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
const monthly = [
  { month: 'Jan', tasks: 45, completed: 38 },
  { month: 'Feb', tasks: 52, completed: 47 },
  { month: 'Mar', tasks: 48, completed: 42 },
  { month: 'Apr', tasks: 61, completed: 55 },
  { month: 'May', tasks: 68, completed: 60 },
]
export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900">Reports</h1><p className="text-slate-500 text-sm">Analytics and insights for your workspace</p></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Monthly Task Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthly}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="tasks" fill="#dbeafe" radius={4} name="Total Tasks" />
              <Bar dataKey="completed" fill="#3b82f6" radius={4} name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Completion Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthly}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="completed" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[['Total Tasks', '68', '+12%', 'green'],['Completed', '55', '+8%', 'blue'],['In Progress', '9', '-3%', 'orange'],['Overdue', '4', '-5%', 'red']].map(([l,v,c,col]) => (
          <div key={l} className="card p-5">
            <div className="text-2xl font-bold text-slate-900">{v}</div>
            <div className="text-sm text-slate-500 mt-1">{l}</div>
            <div className={`text-xs mt-2 ${col === 'green' || col === 'blue' ? 'text-green-600' : 'text-red-500'}`}>{c} from last month</div>
          </div>
        ))}
      </div>
    </div>
  )
}
