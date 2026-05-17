'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const events = [
  { date: 25, title: 'Website Redesign - Design Review', color: 'bg-blue-500' },
  { date: 28, title: 'Mobile App - Sprint Planning', color: 'bg-green-500' },
  { date: 2, title: 'CRM System - Client Meeting', color: 'bg-purple-500' },
  { date: 10, title: 'Branding - Final Delivery', color: 'bg-orange-500' },
]

export default function CalendarPage() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const cells = Array.from({ length: 35 }, (_, i) => i - 2)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Calendar</h1><p className="text-slate-500 text-sm">View and manage your schedule</p></div>
      </div>
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">May 2026</h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map(d => <div key={d} className="text-xs font-semibold text-slate-400 text-center py-2">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((n, i) => {
            const day = n + 1
            const isValid = day >= 1 && day <= 31
            const isToday = day === 13
            const ev = events.find(e => e.date === day)
            return (
              <div key={i} className={`min-h-[80px] p-2 rounded-lg ${isValid ? 'hover:bg-slate-50 cursor-pointer' : ''}`}>
                {isValid && (
                  <>
                    <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold mb-1 ${isToday ? 'bg-blue-600 text-white' : 'text-slate-700'}`}>{day}</div>
                    {ev && <div className={`${ev.color} text-white text-[10px] rounded px-1.5 py-0.5 leading-tight`}>{ev.title.split(' - ')[0]}</div>}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
