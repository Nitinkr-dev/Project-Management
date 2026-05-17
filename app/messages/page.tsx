'use client'
import { useState } from 'react'
import { Send, Search } from 'lucide-react'
const chats = [
  { id: 1, name: 'Rahul Verma', role: 'Frontend Developer', last: 'Please check the hero section design.', time: '2h ago', unread: 2, avatar: 'R' },
  { id: 2, name: 'Anita Sharma', role: 'UI/UX Designer', last: 'Looks good! Just a small change in the CTA button.', time: '1h ago', unread: 0, avatar: 'A' },
  { id: 3, name: 'TechNova Inc.', role: 'Client', last: 'When will the project be ready?', time: '4d ago', unread: 1, avatar: 'T' },
  { id: 4, name: 'Sneha Patel', role: 'Project Manager', last: 'I added you to the Mobile App project.', time: '5h ago', unread: 0, avatar: 'S' },
]
export default function MessagesPage() {
  const [active, setActive] = useState(chats[0])
  const [msg, setMsg] = useState('')
  return (
    <div className="space-y-4">
      <div><h1 className="text-2xl font-bold text-slate-900">Messages</h1><p className="text-slate-500 text-sm">Stay connected with your team</p></div>
      <div className="card flex h-[calc(100vh-220px)] overflow-hidden">
        <div className="w-72 border-r border-slate-100 flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input placeholder="Search messages..." className="input-field pl-9" /></div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {chats.map(c => (
              <div key={c.id} onClick={() => setActive(c)} className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors ${active.id === c.id ? 'bg-blue-50' : ''}`}>
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{c.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-800">{c.name}</span><span className="text-[10px] text-slate-400">{c.time}</span></div>
                  <div className="text-xs text-slate-400 truncate">{c.last}</div>
                </div>
                {c.unread > 0 && <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold">{c.unread}</div>}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">{active.avatar}</div>
            <div><div className="text-sm font-semibold text-slate-800">{active.name}</div><div className="text-xs text-slate-400">{active.role}</div></div>
          </div>
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            <div className="flex justify-end"><div className="bg-blue-600 text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-xs">{active.last}</div></div>
            <div className="flex justify-start"><div className="bg-slate-100 text-slate-700 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-xs">Thanks, I'll take a look at that right away!</div></div>
          </div>
          <div className="flex items-center gap-3 px-5 py-4 border-t border-slate-100">
            <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Add a comment..." className="input-field flex-1" onKeyDown={e => e.key === 'Enter' && setMsg('')} />
            <button onClick={() => setMsg('')} className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors"><Send className="w-4 h-4 text-white" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
