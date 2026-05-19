'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Trash2,
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  AlertCircle,
  Tag,
  Check,
  X,
  Layers,
  MapPin,
  Filter,
  CheckSquare,
  Square,
  Info
} from 'lucide-react'

// Types
interface CalendarEvent {
  id: string
  title: string
  description?: string
  date: string // YYYY-MM-DD
  startTime: string // "HH:MM"
  endTime: string // "HH:MM"
  category: 'Design' | 'Development' | 'Client Meeting' | 'Marketing' | 'Personal' | 'Internal'
  priority: 'Low' | 'Medium' | 'High'
}

// Visual category mappings
const CATEGORIES = [
  { name: 'Design', color: 'bg-indigo-500 hover:bg-indigo-600', text: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-100', dot: 'bg-indigo-500' },
  { name: 'Development', color: 'bg-emerald-500 hover:bg-emerald-600', text: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-100', dot: 'bg-emerald-500' },
  { name: 'Client Meeting', color: 'bg-purple-500 hover:bg-purple-600', text: 'text-purple-700', bg: 'bg-purple-50 border-purple-100', dot: 'bg-purple-500' },
  { name: 'Marketing', color: 'bg-amber-500 hover:bg-amber-600', text: 'text-amber-700', bg: 'bg-amber-50 border-amber-100', dot: 'bg-amber-500' },
  { name: 'Personal', color: 'bg-rose-500 hover:bg-rose-600', text: 'text-rose-700', bg: 'bg-rose-50 border-rose-100', dot: 'bg-rose-500' },
  { name: 'Internal', color: 'bg-blue-500 hover:bg-blue-600', text: 'text-blue-700', bg: 'bg-blue-50 border-blue-100', dot: 'bg-blue-500' },
] as const

type CategoryName = typeof CATEGORIES[number]['name']

const PRIORITIES = [
  { name: 'Low', color: 'bg-slate-50 text-slate-700 border-slate-200 text-[10px] px-2 py-0.5 rounded font-medium' },
  { name: 'Medium', color: 'bg-orange-50 text-orange-700 border-orange-200 text-[10px] px-2 py-0.5 rounded font-medium' },
  { name: 'High', color: 'bg-rose-50 text-rose-700 border-rose-200 text-[10px] px-2 py-0.5 rounded font-medium' }
] as const

type PriorityName = typeof PRIORITIES[number]['name']

// Initial mock events set around May 2026
const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'CRM System - Client Meeting',
    description: 'Quarterly review with the CRM stakeholders. Present core UI wireframes, user registration workflows, and collect structural feedback.',
    date: '2026-05-13',
    startTime: '10:00',
    endTime: '11:30',
    category: 'Client Meeting',
    priority: 'High'
  },
  {
    id: '2',
    title: 'Website Redesign - Sprint Review',
    description: 'Weekly design demo. Evaluate high-fidelity prototypes and review typography and color options for the primary marketing landing page.',
    date: '2026-05-13',
    startTime: '14:00',
    endTime: '15:30',
    category: 'Design',
    priority: 'Medium'
  },
  {
    id: '3',
    title: 'Dashboard Refactoring & Integration',
    description: 'Refactor state management in the main workspace, optimize Tailwind rendering, and implement LocalStorage data persistence features.',
    date: '2026-05-18', // Today's date in local system info
    startTime: '14:00',
    endTime: '16:00',
    category: 'Development',
    priority: 'High'
  },
  {
    id: '4',
    title: 'Design Alignment Sync',
    description: 'Review consistent component styling across all dashboard routes, verify icon packages, and check layout responsiveness.',
    date: '2026-05-18', // Today
    startTime: '11:00',
    endTime: '12:00',
    category: 'Design',
    priority: 'Medium'
  },
  {
    id: '5',
    title: 'Branding - Final Delivery',
    description: 'Deliver the completed brand guidelines book, updated logo system, and marketing deck templates to the client.',
    date: '2026-05-20',
    startTime: '13:00',
    endTime: '14:30',
    category: 'Marketing',
    priority: 'High'
  },
  {
    id: '6',
    title: 'Weekly Team Retrospective',
    description: 'Discuss wins, project velocity, blocks, and define action points for the upcoming development sprints.',
    date: '2026-05-22',
    startTime: '16:00',
    endTime: '17:00',
    category: 'Internal',
    priority: 'Low'
  },
  {
    id: '7',
    title: 'Personal Upskilling Session',
    description: 'Explore advanced React Server Components (RSC) patterns and investigate CSS animations techniques for interactive dashboard tools.',
    date: '2026-05-25',
    startTime: '18:00',
    endTime: '19:30',
    category: 'Personal',
    priority: 'Low'
  }
]

// Date Utility Helpers
const isSameDay = (d1: Date, d2: Date) => {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate()
}

const formatDateString = (date: Date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const getMonthName = (monthIndex: number) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return monthNames[monthIndex]
}

const getDayNameShort = (dayIndex: number) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return days[dayIndex]
}

export default function CalendarPage() {
  // Mounting state to prevent server-side hydration mismatches on date fields
  const [mounted, setMounted] = useState(false)

  // Primary Calendar States
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date('2026-05-18'))
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('month')
  
  // Filtering States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<CategoryName[]>([
    'Design', 'Development', 'Client Meeting', 'Marketing', 'Personal', 'Internal'
  ])
  const [selectedPriorities, setSelectedPriorities] = useState<PriorityName[]>(['Low', 'Medium', 'High'])

  // Event Storage States
  const [events, setEvents] = useState<CalendarEvent[]>([])

  // Modal / Form States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add')
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  
  const [formTitle, setFormTitle] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formDate, setFormDate] = useState('')
  const [formStartTime, setFormStartTime] = useState('10:00')
  const [formEndTime, setFormEndTime] = useState('11:00')
  const [formCategory, setFormCategory] = useState<CategoryName>('Design')
  const [formPriority, setFormPriority] = useState<PriorityName>('Medium')
  const [formError, setFormError] = useState('')

  // Load events on mount
  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('promanage_calendar_events')
      if (saved) {
        try {
          setEvents(JSON.parse(saved))
          return
        } catch (e) {
          console.error('Error parsing stored events:', e)
        }
      }
      setEvents(INITIAL_EVENTS)
    }
  }, [])

  // Persist events on state change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('promanage_calendar_events', JSON.stringify(events))
    }
  }, [events, mounted])

  // Category Styling Helpers
  const getCategoryStyle = (category: string) => {
    const found = CATEGORIES.find(c => c.name === category)
    return found || CATEGORIES[0]
  }

  // Active Date Parameters
  const currentYear = selectedDate.getFullYear()
  const currentMonth = selectedDate.getMonth()

  // Dynamic Navigation Controllers
  const handlePrev = () => {
    if (currentView === 'month') {
      setSelectedDate(new Date(currentYear, currentMonth - 1, 1))
    } else if (currentView === 'week') {
      const prevWeek = new Date(selectedDate)
      prevWeek.setDate(selectedDate.getDate() - 7)
      setSelectedDate(prevWeek)
    } else {
      const prevDay = new Date(selectedDate)
      prevDay.setDate(selectedDate.getDate() - 1)
      setSelectedDate(prevDay)
    }
  }

  const handleNext = () => {
    if (currentView === 'month') {
      setSelectedDate(new Date(currentYear, currentMonth + 1, 1))
    } else if (currentView === 'week') {
      const nextWeek = new Date(selectedDate)
      nextWeek.setDate(selectedDate.getDate() + 7)
      setSelectedDate(nextWeek)
    } else {
      const nextDay = new Date(selectedDate)
      nextDay.setDate(selectedDate.getDate() + 1)
      setSelectedDate(nextDay)
    }
  }

  const handleGoToToday = () => {
    // Lock to system mock date
    setSelectedDate(new Date('2026-05-18'))
  }

  // Modal Openers
  const handleOpenAddModal = (date: Date = selectedDate, time: string = '10:00') => {
    setModalMode('add')
    setEditingEvent(null)
    setFormTitle('')
    setFormDesc('')
    setFormDate(formatDateString(date))
    setFormStartTime(time)
    
    // Auto-calculate end time (1 hour later)
    const [hourStr, minStr] = time.split(':')
    const nextHour = (parseInt(hourStr, 10) + 1) % 24
    const nextHourStr = String(nextHour).padStart(2, '0')
    setFormEndTime(`${nextHourStr}:${minStr}`)
    
    setFormCategory('Design')
    setFormPriority('Medium')
    setFormError('')
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (event: CalendarEvent) => {
    setModalMode('edit')
    setEditingEvent(event)
    setFormTitle(event.title)
    setFormDesc(event.description || '')
    setFormDate(event.date)
    setFormStartTime(event.startTime)
    setFormEndTime(event.endTime)
    setFormCategory(event.category)
    setFormPriority(event.priority)
    setFormError('')
    setIsModalOpen(true)
  }

  // Form Submit Action
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formTitle.trim()) {
      setFormError('Event title is required.')
      return
    }

    if (formStartTime >= formEndTime) {
      setFormError('End time must be after Start time.')
      return
    }

    const updatedEventData = {
      title: formTitle.trim(),
      description: formDesc.trim(),
      date: formDate,
      startTime: formStartTime,
      endTime: formEndTime,
      category: formCategory,
      priority: formPriority
    }

    if (modalMode === 'add') {
      const newEvent: CalendarEvent = {
        id: Math.random().toString(36).substring(2, 9),
        ...updatedEventData
      }
      setEvents(prev => [...prev, newEvent])
    } else if (modalMode === 'edit' && editingEvent) {
      setEvents(prev =>
        prev.map(item => (item.id === editingEvent.id ? { ...item, ...updatedEventData } : item))
      )
    }

    setIsModalOpen(false)
  }

  // Event Delete Action
  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(item => item.id !== eventId))
      setIsModalOpen(false)
    }
  }

  // Filters Toggling
  const handleToggleCategory = (categoryName: CategoryName) => {
    setSelectedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    )
  }

  const handleTogglePriority = (priorityName: PriorityName) => {
    setSelectedPriorities(prev =>
      prev.includes(priorityName)
        ? prev.filter(p => p !== priorityName)
        : [...prev, priorityName]
    )
  }

  const handleSelectAllCategories = () => {
    if (selectedCategories.length === CATEGORIES.length) {
      setSelectedCategories([])
    } else {
      setSelectedCategories(CATEGORIES.map(c => c.name))
    }
  }

  const handleSelectAllPriorities = () => {
    if (selectedPriorities.length === PRIORITIES.length) {
      setSelectedPriorities([])
    } else {
      setSelectedPriorities(PRIORITIES.map(p => p.name))
    }
  }

  // Computations
  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      // 1. Search Query
      const matchesSearch =
        searchQuery.trim() === '' ||
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.description && e.description.toLowerCase().includes(searchQuery.toLowerCase()))

      // 2. Category Check
      const matchesCategory = selectedCategories.includes(e.category)

      // 3. Priority Check
      const matchesPriority = selectedPriorities.includes(e.priority)

      return matchesSearch && matchesCategory && matchesPriority
    })
  }, [events, searchQuery, selectedCategories, selectedPriorities])

  // Mini Performance Statistics
  const statistics = useMemo(() => {
    const todayStr = '2026-05-18'
    return {
      totalCount: filteredEvents.length,
      highPriorityCount: filteredEvents.filter(e => e.priority === 'High').length,
      todayCount: filteredEvents.filter(e => e.date === todayStr).length
    }
  }, [filteredEvents])

  // 5 Upcoming Chronological Events
  const upcomingEvents = useMemo(() => {
    const todayStr = '2026-05-18'
    return [...filteredEvents]
      .filter(e => e.date >= todayStr)
      .sort((a, b) => {
        if (a.date !== b.date) {
          return a.date.localeCompare(b.date)
        }
        return a.startTime.localeCompare(b.startTime)
      })
      .slice(0, 5)
  }, [filteredEvents])

  // Calendar Month Grid Generation
  const monthCells = useMemo(() => {
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()
    
    const cells = []
    
    // Muted days from Previous Month
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i
      const date = new Date(currentYear, currentMonth - 1, dayNum)
      cells.push({
        date,
        isCurrentMonth: false,
        dayNumber: dayNum
      })
    }
    
    // Active days of Selected Month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i)
      cells.push({
        date,
        isCurrentMonth: true,
        dayNumber: i
      })
    }
    
    // Muted padding days from Next Month
    const totalCells = 42
    const remaining = totalCells - cells.length
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(currentYear, currentMonth + 1, i)
      cells.push({
        date,
        isCurrentMonth: false,
        dayNumber: i
      })
    }
    
    return cells
  }, [currentYear, currentMonth])

  // Week Grid Computation
  const weekDays = useMemo(() => {
    const currentDayOfWeek = selectedDate.getDay()
    const startOfWeek = new Date(selectedDate)
    startOfWeek.setDate(selectedDate.getDate() - currentDayOfWeek)
    
    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    return days
  }, [selectedDate])

  // Day timeline view format
  const formatTimelineHour = (hour: number) => {
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 === 0 ? 12 : hour % 12
    return `${displayHour.toString().padStart(2, '0')}:00 ${ampm}`
  }

  // Header Title Builder
  const getHeaderTitle = () => {
    if (currentView === 'month') {
      return `${getMonthName(currentMonth)} ${currentYear}`
    } else if (currentView === 'week') {
      const start = weekDays[0]
      const end = weekDays[6]
      if (start.getMonth() === end.getMonth()) {
        return `${getMonthName(start.getMonth())} ${start.getDate()} – ${end.getDate()}, ${start.getFullYear()}`
      } else if (start.getFullYear() === end.getFullYear()) {
        return `${getMonthName(start.getMonth())} ${start.getDate()} – ${getMonthName(end.getMonth())} ${end.getDate()}, ${start.getFullYear()}`
      } else {
        return `${getMonthName(start.getMonth())} ${start.getDate()}, ${start.getFullYear()} – ${getMonthName(end.getMonth())} ${end.getDate()}, ${end.getFullYear()}`
      }
    } else {
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return selectedDate.toLocaleDateString('en-US', options)
    }
  }

  // Hydration safety spinner
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="text-sm font-semibold text-slate-500">Loading Calendar Environment...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Welcome Control Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarIcon className="w-8 h-8 text-blue-600" />
            Calendar Workspace
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage sprints, sync events, and organize your client schedules.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenAddModal(selectedDate)}
            className="btn-primary shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-sm font-semibold"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Add Schedule Event
          </button>
        </div>
      </div>

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side: Filter, Mini Stats & Upcoming Panel */}
        <div className="col-span-1 space-y-6">
          
          {/* Mini Performance Cards */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-white border border-slate-100 shadow-sm rounded-xl p-3 text-center flex flex-col justify-center">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Total</span>
              <span className="text-2xl font-black text-slate-800 block mt-0.5">{statistics.totalCount}</span>
            </div>
            <div className="bg-white border border-slate-100 shadow-sm rounded-xl p-3 text-center flex flex-col justify-center border-l-rose-500 border-l-2">
              <span className="text-rose-500 text-[10px] font-bold uppercase tracking-wider block">High</span>
              <span className="text-2xl font-black text-slate-800 block mt-0.5">{statistics.highPriorityCount}</span>
            </div>
            <div className="bg-white border border-slate-100 shadow-sm rounded-xl p-3 text-center flex flex-col justify-center border-l-blue-500 border-l-2">
              <span className="text-blue-500 text-[10px] font-bold uppercase tracking-wider block">Today</span>
              <span className="text-2xl font-black text-slate-800 block mt-0.5">{statistics.todayCount}</span>
            </div>
          </div>

          {/* Quick Search and Filters */}
          <div className="card p-5 space-y-5 bg-white">
            
            {/* Search */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Search Schedule</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Find title, description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                  className="input-field bg-slate-50/50"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-2 p-0.5 rounded-full hover:bg-slate-200 text-slate-400"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  Categories
                </label>
                <button
                  onClick={handleSelectAllCategories}
                  className="text-[10px] font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  {selectedCategories.length === CATEGORIES.length ? 'Clear All' : 'Select All'}
                </button>
              </div>
              <div className="space-y-1">
                {CATEGORIES.map(cat => {
                  const isChecked = selectedCategories.includes(cat.name)
                  return (
                    <button
                      key={cat.name}
                      onClick={() => handleToggleCategory(cat.name)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-medium transition-colors ${
                        isChecked 
                          ? 'bg-slate-50 text-slate-800' 
                          : 'hover:bg-slate-50/40 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${cat.dot}`} />
                        <span>{cat.name}</span>
                      </div>
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-blue-600 stroke-[2.5]" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Priority Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                  Priority Levels
                </label>
                <button
                  onClick={handleSelectAllPriorities}
                  className="text-[10px] font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  {selectedPriorities.length === PRIORITIES.length ? 'Clear All' : 'Select All'}
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {PRIORITIES.map(pr => {
                  const isChecked = selectedPriorities.includes(pr.name)
                  return (
                    <button
                      key={pr.name}
                      onClick={() => handleTogglePriority(pr.name)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                        isChecked
                          ? pr.name === 'High' ? 'bg-rose-500 border-rose-600 text-white shadow-sm shadow-rose-200' :
                            pr.name === 'Medium' ? 'bg-orange-500 border-orange-600 text-white shadow-sm shadow-orange-200' :
                            'bg-slate-600 border-slate-700 text-white shadow-sm shadow-slate-200'
                          : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {pr.name}
                    </button>
                  )
                })}
              </div>
            </div>

          </div>

          {/* Upcoming Schedule Card */}
          <div className="card p-5 bg-white">
            <h3 className="text-sm font-extrabold text-slate-800 mb-3.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              Upcoming Schedule
            </h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {upcomingEvents.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">
                  <CalendarIcon className="w-8 h-8 text-slate-200 mx-auto mb-1.5" />
                  No upcoming events match filters.
                </div>
              ) : (
                upcomingEvents.map(ev => {
                  const style = getCategoryStyle(ev.category)
                  const isTodayStr = ev.date === '2026-05-18'
                  
                  return (
                    <div
                      key={ev.id}
                      onClick={() => handleOpenEditModal(ev)}
                      className="p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/50 cursor-pointer transition-all space-y-1.5 relative group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${style.text}`}>
                          {ev.category}
                        </span>
                        {isTodayStr && (
                          <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded animate-pulse">
                            Today
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-1 leading-snug group-hover:text-blue-600 transition-colors">
                        {ev.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {ev.date.split('-').slice(1).join('/')} • {ev.startTime}
                        </span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

        </div>

        {/* Right Side: Major Calendar Workstation */}
        <div className="col-span-1 lg:col-span-3 space-y-6">
          
          {/* Main Control Navigation Bar */}
          <div className="card p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
            
            {/* Left side: Date Navigator */}
            <div className="flex items-center gap-3">
              <div className="flex border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={handlePrev}
                  className="p-2 bg-white hover:bg-slate-50 text-slate-600 transition-colors border-r border-slate-200"
                  title="Previous"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                </button>
                <button
                  onClick={handleGoToToday}
                  className="px-3 py-2 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors border-r border-slate-200"
                  title="Jump to Today"
                >
                  Today
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
                  title="Next"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              <h2 className="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight pl-1 select-none">
                {getHeaderTitle()}
              </h2>
            </div>

            {/* Right side: Month/Week/Day Switchers */}
            <div className="flex bg-slate-100 p-1 rounded-xl self-start md:self-auto border border-slate-200/40">
              {(['month', 'week', 'day'] as const).map(view => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all tracking-wider ${
                    currentView === view
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>

          </div>

          {/* Core Calendar Rendering Switch */}
          <div className="card p-4 md:p-6 bg-white overflow-hidden shadow-sm min-h-[500px]">
            
            {/* MONTH VIEW */}
            {currentView === 'month' && (
              <div className="space-y-2">
                
                {/* Days Headers */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 7 }, (_, i) => i).map(day => (
                    <div key={day} className="text-center py-2.5 text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 rounded-lg">
                      {getDayNameShort(day)}
                    </div>
                  ))}
                </div>

                {/* Date Cells */}
                <div className="grid grid-cols-7 gap-1.5">
                  {monthCells.map((cell, idx) => {
                    const dateStr = formatDateString(cell.date)
                    const isTodayMock = dateStr === '2026-05-18'
                    const isCellSelected = isSameDay(cell.date, selectedDate)
                    
                    // Filter events for this cell date
                    const cellEvents = filteredEvents.filter(e => e.date === dateStr)
                    const extraCount = cellEvents.length > 2 ? cellEvents.length - 2 : 0

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedDate(cell.date)
                        }}
                        className={`min-h-[110px] p-2 rounded-xl transition-all border flex flex-col group relative ${
                          cell.isCurrentMonth
                            ? 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-sm cursor-pointer'
                            : 'bg-slate-50/50 border-slate-100/50 text-slate-300 cursor-pointer hover:bg-slate-50'
                        } ${isCellSelected ? 'ring-2 ring-blue-500/80 ring-offset-1 z-10 border-transparent' : ''}`}
                      >
                        {/* Day indicator */}
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                              isTodayMock
                                ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                                : cell.isCurrentMonth ? 'text-slate-800' : 'text-slate-300'
                            }`}
                          >
                            {cell.dayNumber}
                          </span>
                          
                          {/* Dotted indicator for multiple events on mobile */}
                          {cellEvents.length > 0 && (
                            <div className="flex gap-0.5 md:hidden">
                              {cellEvents.slice(0, 3).map((e, index) => {
                                const style = getCategoryStyle(e.category)
                                return <span key={index} className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                              })}
                            </div>
                          )}

                          {/* Inline Add Quick Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenAddModal(cell.date)
                            }}
                            className="w-5 h-5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-400 hover:text-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Add event here"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Events List Container (Tablet/Desktop) */}
                        <div className="hidden md:flex flex-col gap-1 flex-1 overflow-y-auto pr-0.5">
                          {cellEvents.slice(0, 2).map(ev => {
                            const style = getCategoryStyle(ev.category)
                            return (
                              <div
                                key={ev.id}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleOpenEditModal(ev)
                                }}
                                className={`${style.color} text-white text-[10px] font-bold rounded-lg px-2 py-1 leading-tight truncate shadow-sm cursor-pointer transition-transform hover:scale-[1.02] flex items-center gap-1`}
                                title={`${ev.title} (${ev.startTime} - ${ev.endTime})`}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                                <span className="truncate">{ev.title}</span>
                              </div>
                            )
                          })}
                          
                          {extraCount > 0 && (
                            <div 
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedDate(cell.date)
                                setCurrentView('day')
                              }}
                              className="text-[9px] font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 text-center rounded-md py-0.5 cursor-pointer mt-0.5 transition-colors"
                            >
                              + {extraCount} more events
                            </div>
                          )}
                        </div>

                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* WEEK VIEW */}
            {currentView === 'week' && (
              <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                {weekDays.map((day, index) => {
                  const dateStr = formatDateString(day)
                  const isTodayMock = dateStr === '2026-05-18'
                  const isDaySelected = isSameDay(day, selectedDate)
                  
                  // Filter events for this day
                  const dayEvents = [...filteredEvents]
                    .filter(e => e.date === dateStr)
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(day)}
                      className={`bg-slate-50/40 border rounded-2xl p-3 flex flex-col min-h-[380px] transition-all cursor-pointer ${
                        isDaySelected 
                          ? 'border-blue-300 ring-2 ring-blue-500/10 shadow-sm bg-white' 
                          : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/70'
                      }`}
                    >
                      {/* Day Header */}
                      <div className="flex items-center justify-between border-b border-slate-200/50 pb-2 mb-3">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">
                            {getDayNameShort(day.getDay())}
                          </span>
                          <span className={`text-base font-extrabold mt-0.5 ${
                            isTodayMock ? 'text-blue-600' : 'text-slate-800'
                          }`}>
                            {day.getDate()}
                          </span>
                        </div>
                        {isTodayMock && (
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-100 animate-pulse" />
                        )}
                      </div>

                      {/* Stack of Events */}
                      <div className="flex-1 space-y-2 overflow-y-auto max-h-[300px] pr-0.5">
                        {dayEvents.length === 0 ? (
                          <div 
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenAddModal(day)
                            }}
                            className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 rounded-xl p-3 text-center transition-colors group py-12"
                          >
                            <Plus className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                            <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600 mt-1 select-none">
                              Add Event
                            </span>
                          </div>
                        ) : (
                          dayEvents.map(ev => {
                            const style = getCategoryStyle(ev.category)
                            return (
                              <div
                                key={ev.id}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleOpenEditModal(ev)
                                }}
                                className={`p-2.5 rounded-xl border ${style.bg} hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer space-y-1.5`}
                              >
                                <div className="flex items-center justify-between gap-1">
                                  <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/75 ${style.text}`}>
                                    {ev.category}
                                  </span>
                                  <span className={`text-[8px] font-black px-1 py-0.5 rounded bg-white/75 ${
                                    ev.priority === 'High' ? 'text-rose-600' :
                                    ev.priority === 'Medium' ? 'text-orange-600' :
                                    'text-slate-500'
                                  }`}>
                                    {ev.priority}
                                  </span>
                                </div>
                                <h4 className="text-[11px] font-extrabold text-slate-800 line-clamp-2 leading-tight">
                                  {ev.title}
                                </h4>
                                <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold">
                                  <Clock className="w-3 h-3" />
                                  <span>{ev.startTime} - {ev.endTime}</span>
                                </div>
                              </div>
                            )
                          })
                        )}
                      </div>

                    </div>
                  )
                })}
              </div>
            )}

            {/* DAY VIEW */}
            {currentView === 'day' && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                
                {/* Left side: Hourly Timeline Planner (3/5 width) */}
                <div className="lg:col-span-3 border-r border-slate-100 pr-0 lg:pr-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5 pb-2 border-b border-slate-100">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Hourly Agenda (08:00 AM – 08:00 PM)
                  </h3>
                  
                  <div className="space-y-0.5 max-h-[500px] overflow-y-auto pr-1">
                    {Array.from({ length: 13 }, (_, i) => i + 8).map(hour => {
                      const timeString = `${hour.toString().padStart(2, '0')}:00`
                      const dayEvents = filteredEvents.filter(
                        e => e.date === formatDateString(selectedDate) && e.startTime.startsWith(hour.toString().padStart(2, '0'))
                      )

                      return (
                        <div
                          key={hour}
                          className="flex border-b border-slate-100 min-h-[60px] relative group hover:bg-slate-50/50 transition-colors"
                        >
                          <div className="w-20 pr-4 text-right py-3.5 text-xs font-black text-slate-400 select-none">
                            {formatTimelineHour(hour)}
                          </div>
                          
                          <div className="flex-1 border-l border-slate-100 p-2 flex flex-wrap gap-2 items-center">
                            {dayEvents.length > 0 ? (
                              dayEvents.map(ev => {
                                const style = getCategoryStyle(ev.category)
                                return (
                                  <div
                                    key={ev.id}
                                    onClick={() => handleOpenEditModal(ev)}
                                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-all hover:shadow-sm ${style.bg} ${style.text} flex items-center gap-2`}
                                  >
                                    <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                                    <span>{ev.title} ({ev.startTime} - {ev.endTime})</span>
                                  </div>
                                )
                              })
                            ) : (
                              <button
                                onClick={() => handleOpenAddModal(selectedDate, timeString)}
                                className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 text-xs text-blue-600 font-bold transition-all px-2.5 py-1 hover:bg-blue-50 rounded-lg"
                              >
                                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span>Schedule {formatTimelineHour(hour)}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Right side: Chronological Detailed Event Cards (2/5 width) */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-slate-100">
                    <Layers className="w-4 h-4 text-purple-600" />
                    Focus Day Schedule
                  </h3>

                  {(() => {
                    const dayEvents = [...filteredEvents]
                      .filter(e => e.date === formatDateString(selectedDate))
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))

                    if (dayEvents.length === 0) {
                      return (
                        <div className="text-center py-16 px-4 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
                          <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                          <h4 className="text-sm font-bold text-slate-700">Empty Schedule</h4>
                          <p className="text-xs text-slate-400 mt-1 max-w-[200px] mx-auto">
                            No active events scheduled for this calendar date.
                          </p>
                          <button
                            onClick={() => handleOpenAddModal(selectedDate)}
                            className="btn-primary mt-4 mx-auto text-xs font-bold px-4 py-2"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            Schedule New Event
                          </button>
                        </div>
                      )
                    }

                    return (
                      <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                        {dayEvents.map(ev => {
                          const style = getCategoryStyle(ev.category)
                          return (
                            <div
                              key={ev.id}
                              onClick={() => handleOpenEditModal(ev)}
                              className={`p-4 rounded-2xl border ${style.bg} hover:shadow-md cursor-pointer transition-all space-y-3 relative group`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white ${style.text} border border-black/5`}>
                                  {ev.category}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <span className={PRIORITIES.find(p => p.name === ev.priority)?.color || ''}>
                                    {ev.priority} Priority
                                  </span>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <h4 className="text-sm font-black text-slate-800 group-hover:text-blue-700 transition-colors leading-tight">
                                  {ev.title}
                                </h4>
                                {ev.description && (
                                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                                    {ev.description}
                                  </p>
                                )}
                              </div>

                              <div className="flex items-center gap-4 text-xs font-bold text-slate-500 pt-1 border-t border-black/5">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{ev.startTime} – {ev.endTime}</span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })()}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* GORGEOUS MODAL DIALOG OVERLAY (ADD/EDIT/VIEW) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-100 overflow-hidden transform scale-100 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
                {modalMode === 'add' ? 'Schedule New Event' : 'Modify Calendar Event'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEvent} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Event Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Event Title</label>
                <input
                  type="text"
                  placeholder="e.g. Design Review, Team Retrospective"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              {/* Category selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Event Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORIES.map(cat => {
                    const isSelected = formCategory === cat.name
                    return (
                      <button
                        key={cat.name}
                        type="button"
                        onClick={() => setFormCategory(cat.name)}
                        className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 justify-center cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-700 shadow-sm shadow-blue-100'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : cat.dot}`} />
                        <span>{cat.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Date & Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Event Date</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Priority Level</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as PriorityName)}
                    className="input-field py-[9px]"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {/* Start & End Times */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Start Time</label>
                  <input
                    type="time"
                    value={formStartTime}
                    onChange={(e) => setFormStartTime(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">End Time</label>
                  <input
                    type="time"
                    value={formEndTime}
                    onChange={(e) => setFormEndTime(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              {/* Event Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Description</label>
                <textarea
                  placeholder="Provide schedule details, goals, or meeting video link..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="input-field min-h-[80px]"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
                <div>
                  {modalMode === 'edit' && editingEvent && (
                    <button
                      type="button"
                      onClick={() => handleDeleteEvent(editingEvent.id)}
                      className="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg text-xs font-bold hover:bg-rose-100 hover:text-rose-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary px-5 py-2 text-xs font-bold shadow-sm"
                  >
                    {modalMode === 'add' ? 'Create Event' : 'Save Changes'}
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}
