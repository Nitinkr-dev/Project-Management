'use client'

import { Search, Bell, Mail, ChevronDown } from 'lucide-react'

interface TopbarProps {
  title?: string
}

export default function Topbar({ title }: TopbarProps) {
  return (
    <header className="h-14 bg-white border-b border-slate-100 flex items-center px-6 gap-4 sticky top-0 z-30">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search projects, tasks, teams..."
          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
          <Bell className="w-4.5 h-4.5 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
          <Mail className="w-4.5 h-4.5 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 px-2 py-1.5 rounded-lg transition-colors">
          <div className="w-7 h-7 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
          <div>
            <div className="text-xs font-semibold text-slate-800 leading-none">Admin</div>
            <div className="text-[10px] text-slate-400 leading-none mt-0.5">Super Admin</div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </header>
  )
}
