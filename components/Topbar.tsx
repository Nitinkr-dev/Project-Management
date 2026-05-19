'use client'

import { Search, Bell, Mail, ChevronDown, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface TopbarProps {
  title?: string
  onMenuClick?: () => void
}

export default function Topbar({ title, onMenuClick }: TopbarProps) {
  const router = useRouter()

  return (
    <header className="h-14 bg-white border-b border-slate-100 flex items-center px-4 md:px-6 gap-3 md:gap-4 sticky top-0 z-30 w-full flex-shrink-0">
      {/* Mobile Sidebar Toggle Button */}
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg lg:hidden"
          aria-label="Open Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Search Input */}
      <div className="flex-1 max-w-xs md:max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="flex-1 hidden md:block" />

      {/* Header Actions */}
      <div className="flex items-center gap-2 md:gap-3 ml-auto flex-shrink-0">
        <button
          onClick={() => router.push('/notifications')}
          className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors shrink-0"
          title="Notifications"
        >
          <Bell className="w-5 h-5 text-slate-600 shrink-0" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button
          onClick={() => router.push('/messages')}
          className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors shrink-0"
          title="Messages"
        >
          <Mail className="w-5 h-5 text-slate-600 shrink-0" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
        </button>
        <div
          onClick={() => router.push('/settings')}
          className="flex items-center gap-2 md:gap-2.5 cursor-pointer hover:bg-slate-50 px-2 py-1.5 rounded-lg transition-colors shrink-0 ml-1"
        >
          <div className="w-8 h-8 md:w-9 md:h-9 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold shrink-0">A</div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-semibold text-slate-800 leading-none">Admin</div>
            <div className="text-[11px] text-slate-400 leading-none mt-1">Super Admin</div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block shrink-0" />
        </div>
      </div>
    </header>
  )
}
