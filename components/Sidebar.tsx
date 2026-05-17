'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, Calendar,
  BarChart2, MessageSquare, Bell, Settings, LogOut, Headphones
} from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/projects', label: 'Projects', icon: FolderOpen },
  { href: '/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/calendar', label: 'Calendar', icon: Calendar },
  { href: '/reports', label: 'Reports', icon: BarChart2 },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className="w-56 flex-shrink-0 bg-white border-r border-slate-100 h-screen flex flex-col sticky top-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-slate-100">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">P</span>
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm leading-none">ProManage</div>
            <div className="text-[10px] text-slate-400 leading-none mt-0.5">Project Management</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx('sidebar-link', pathname === href && 'active')}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{label}</span>
            {label === 'Notifications' && (
              <span className="ml-auto bg-blue-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">5</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Help box */}
      <div className="m-3 bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <Headphones className="w-4 h-4 text-blue-600" />
        </div>
        <p className="text-xs font-semibold text-slate-700 mb-0.5">Need Help?</p>
        <p className="text-[10px] text-slate-500 mb-2">Our support team is here to help you.</p>
        <button className="w-full bg-blue-600 text-white text-xs py-1.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Contact Support
        </button>
      </div>

      {/* User */}
      <div className="border-t border-slate-100 px-3 py-3 flex items-center gap-2.5">
        <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">A</div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-slate-800 truncate">Admin</div>
          <div className="text-[10px] text-slate-400 truncate">Super Admin</div>
        </div>
        <button
          onClick={() => router.push('/login')}
          className="text-slate-400 hover:text-red-500 transition-colors"
          title="Logout"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  )
}
