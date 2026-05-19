'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Search, Filter, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

const allProjects = [
  { name: 'Website Redesign', client: 'Acme Corporation', status: 'In Progress', progress: 75, deadline: 'Jun 02, 2025', deadlineBad: true, manager: 'Sarah Johnson', team: ['S', 'J', 'K'], extra: 2 },
  { name: 'Mobile App Development', client: 'TechStart Inc.', status: 'In Progress', progress: 60, deadline: 'Jun 15, 2025', deadlineBad: false, manager: 'Mike Chen', team: ['M', 'A', 'B'], extra: 3 },
  { name: 'CRM Integration', client: 'Business Co.', status: 'On Hold', progress: 90, deadline: 'Jun 06, 2025', deadlineBad: false, manager: 'Lisa Brown', team: ['L', 'N'], extra: 1 },
  { name: 'Marketing Campaign', client: 'Global Solutions', status: 'Completed', progress: 100, deadline: 'May 28, 2025', deadlineBad: false, manager: 'James Wilson', team: ['J', 'W', 'P', 'Q'], extra: 4 },
  { name: 'Client Dashboard', client: 'Innovate LLC', status: 'Planning', progress: 25, deadline: 'Jun 20, 2025', deadlineBad: false, manager: 'Emily Davis', team: ['E', 'D'], extra: 2 },
  { name: 'API Integration', client: 'NextGen Systems', status: 'Delayed', progress: 40, deadline: 'May 30, 2025', deadlineBad: true, manager: 'David Kim', team: ['D', 'K'], extra: 2 },
]

const statusColors: Record<string, string> = {
  'In Progress': 'badge-blue',
  'Completed': 'badge-green',
  'On Hold': 'badge-orange',
  'Planning': 'badge-purple',
  'Delayed': 'badge-red',
}

export default function ProjectsPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')

  const filtered = allProjects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All Status' || p.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage and monitor all your projects in one place</p>
        </div>
        <button className="btn-primary" onClick={() => alert('Create Project modal opened!')}>
          <Plus className="w-4 h-4 shrink-0" />
          Create Project
        </button>
      </div>

      <div className="card">
        {/* Filters */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search projects..."
              style={{ paddingLeft: '2.5rem' }}
              className="input-field"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="input-field w-36"
          >
            <option>All Status</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>On Hold</option>
            <option>Planning</option>
            <option>Delayed</option>
          </select>
          <button className="btn-secondary hidden sm:flex shrink-0" onClick={() => alert('Filters opened!')}>
            <Filter className="w-4 h-4 shrink-0" />
            More Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3">Project</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-3">Progress</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-3">Deadline</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-3">Owner / Manager</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-3">Assigned Team</th>
                <th className="px-3 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(p => (
                <tr key={p.name} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors cursor-pointer">{p.name}</div>
                    <div className="text-xs text-slate-400">{p.client}</div>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className={clsx('badge', statusColors[p.status])}>{p.status}</span>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="progress-bar w-24">
                        <div className={clsx('progress-fill', p.progress === 100 ? '!bg-green-500' : p.status === 'Delayed' ? '!bg-red-400' : '')} style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="text-xs text-slate-600">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className={clsx('text-xs font-medium', p.deadlineBad ? 'text-red-500' : 'text-slate-600')}>{p.deadline}</span>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center text-xs font-semibold text-slate-600">{p.manager[0]}</div>
                      <div>
                        <div className="text-xs font-medium text-slate-700">{p.manager}</div>
                        <div className="text-[10px] text-slate-400">Project Manager</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center">
                      {p.team.map((m, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white -ml-1.5 first:ml-0 flex items-center justify-center text-[9px] font-bold text-slate-600">{m}</div>
                      ))}
                      {p.extra > 0 && <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white -ml-1.5 flex items-center justify-center text-[9px] text-slate-500">+{p.extra}</div>}
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 shrink-0">
                      <MoreVertical className="w-4 h-4 shrink-0" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">Showing 1 to {filtered.length} of 24 projects</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50 text-slate-500 shrink-0">
              <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
            </button>
            {[1, 2, 3].map(n => (
              <button key={n} className={clsx('w-7 h-7 flex items-center justify-center rounded border text-xs font-medium shrink-0', n === 1 ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50')}>
                {n}
              </button>
            ))}
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50 text-slate-500 shrink-0">
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
