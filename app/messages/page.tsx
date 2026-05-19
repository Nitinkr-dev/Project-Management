'use client'

import { useState } from 'react'
import { Send, Search, ChevronLeft } from 'lucide-react'
import clsx from 'clsx'

const initialChats = [
  { id: 1, name: 'Rahul Verma', role: 'Frontend Developer', last: 'Please check the hero section design.', time: '2h ago', unread: 2, avatar: 'R', messages: [
    { sender: 'Rahul Verma', text: 'Please check the hero section design.', time: '2h ago' }
  ] },
  { id: 2, name: 'Anita Sharma', role: 'UI/UX Designer', last: 'Looks good! Just a small change in the CTA button.', time: '1h ago', unread: 0, avatar: 'A', messages: [
    { sender: 'Anita Sharma', text: 'Looks good! Just a small change in the CTA button.', time: '1h ago' }
  ] },
  { id: 3, name: 'TechNova Inc.', role: 'Client', last: 'When will the project be ready?', time: '4d ago', unread: 1, avatar: 'T', messages: [
    { sender: 'TechNova Inc.', text: 'When will the project be ready?', time: '4d ago' }
  ] },
  { id: 4, name: 'Sneha Patel', role: 'Project Manager', last: 'I added you to the Mobile App project.', time: '5h ago', unread: 0, avatar: 'S', messages: [
    { sender: 'Sneha Patel', text: 'I added you to the Mobile App project.', time: '5h ago' }
  ] },
]

export default function MessagesPage() {
  const [chats, setChats] = useState(initialChats)
  const [activeId, setActiveId] = useState(1)
  const [msgInput, setMsgInput] = useState('')
  const [showActiveChatMobile, setShowActiveChatMobile] = useState(false)

  const activeChat = chats.find(c => c.id === activeId) || chats[0]

  const handleSelectChat = (chatId: number) => {
    setActiveId(chatId)
    // Clear unreads
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, unread: 0 } : c))
    setShowActiveChatMobile(true)
  }

  const handleSendMessage = () => {
    if (!msgInput.trim()) return
    
    // Add message
    setChats(prev => prev.map(c => {
      if (c.id === activeId) {
        return {
          ...c,
          last: msgInput,
          time: 'Just now',
          messages: [...c.messages, { sender: 'You', text: msgInput, time: 'Just now' }]
        }
      }
      return c
    }))
    setMsgInput('')
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
        <p className="text-slate-500 text-sm">Stay connected with your team</p>
      </div>

      <div className="card flex h-[calc(100vh-200px)] overflow-hidden relative">
        {/* Chats Sidebar */}
        <div className={clsx(
          "w-full lg:w-80 border-r border-slate-100 flex flex-col bg-white flex-shrink-0 transition-all duration-300",
          showActiveChatMobile ? "hidden lg:flex" : "flex"
        )}>
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                placeholder="Search messages..." 
                style={{ paddingLeft: '2.5rem' }}
                className="input-field" 
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {chats.map(c => (
              <div
                key={c.id}
                onClick={() => handleSelectChat(c.id)}
                className={clsx(
                  "flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors",
                  activeId === c.id ? "bg-blue-50/70" : ""
                )}
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-800 truncate">{c.name}</span>
                    <span className="text-[10px] text-slate-400 flex-shrink-0">{c.time}</span>
                  </div>
                  <div className="text-xs text-slate-400 truncate">{c.last}</div>
                </div>
                {c.unread > 0 && (
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold flex-shrink-0">
                    {c.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Message Panel */}
        <div className={clsx(
          "flex-1 flex flex-col bg-slate-50/30 transition-all duration-300",
          showActiveChatMobile ? "flex" : "hidden lg:flex"
        )}>
          {/* Active Chat Header */}
          <div className="flex items-center gap-3 px-4 md:px-5 py-3 md:py-4 border-b border-slate-100 bg-white">
            {/* Back button for mobile view */}
            <button
              onClick={() => setShowActiveChatMobile(false)}
              className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg lg:hidden"
              aria-label="Back to chats list"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              {activeChat.avatar}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800">{activeChat.name}</div>
              <div className="text-[10px] md:text-xs text-slate-400">{activeChat.role}</div>
            </div>
          </div>

          {/* Messages Display */}
          <div className="flex-1 p-4 md:p-5 overflow-y-auto space-y-4">
            {activeChat.messages.map((message, i) => {
              const isSenderMe = message.sender === 'You'
              return (
                <div key={i} className={clsx("flex", isSenderMe ? "justify-end" : "justify-start")}>
                  <div className={clsx(
                    "text-sm rounded-2xl px-4 py-2.5 max-w-[80%] sm:max-w-xs leading-relaxed",
                    isSenderMe
                      ? "bg-blue-600 text-white rounded-tr-xs"
                      : "bg-white border border-slate-100 text-slate-700 rounded-tl-xs shadow-xs"
                  )}>
                    <div>{message.text}</div>
                    <div className={clsx(
                      "text-[9px] mt-1 text-right",
                      isSenderMe ? "text-blue-100" : "text-slate-400"
                    )}>
                      {message.time}
                    </div>
                  </div>
                </div>
              )
            })}
            
            {/* Hardcoded system responses placeholder to keep context interesting */}
            {activeChat.messages.length === 1 && !activeChat.messages.some(m => m.sender === 'You') && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 text-slate-700 text-sm rounded-2xl rounded-tl-xs px-4 py-2.5 max-w-xs shadow-xs">
                  Thanks, I will take a look at that right away!
                </div>
              </div>
            )}
          </div>

          {/* Typing Action Bar */}
          <div className="flex items-center gap-2.5 px-4 py-3 md:px-5 md:py-4 border-t border-slate-100 bg-white">
            <input
              value={msgInput}
              onChange={e => setMsgInput(e.target.value)}
              placeholder="Type your message..."
              className="input-field flex-1"
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors flex-shrink-0 cursor-pointer"
              title="Send message"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
