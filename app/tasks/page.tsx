'use client'

import { useState } from 'react'
import { Plus, Filter, MoreHorizontal, ChevronDown } from 'lucide-react'
import clsx from 'clsx'

type Task = {
  id: string;
  title: string;
  tag: string;
  priority: string;
  assignee: string;
  date: string;
  done?: boolean;
};

const todoTasks: Task[] = [
  { id: 't1', title: 'Create wireframes for homepage', tag: 'UI/UX', priority: 'High', assignee: 'E', date: 'Jun 03, 2025' },
  { id: 't2', title: 'Setup development environment', tag: 'DevOps', priority: 'Medium', assignee: 'D', date: 'Jun 05, 2025' },
  { id: 't3', title: 'Research competitors and trends', tag: 'Research', priority: 'Low', assignee: 'L', date: 'Jun 07, 2025' },
  { id: 't4', title: 'Write content for landing page', tag: 'Content', priority: 'Medium', assignee: 'M', date: 'Jun 08, 2025' },
];

const inprogressTasks: Task[] = [
  { id: 'p1', title: 'Design homepage mockup', tag: 'UI/UX', priority: 'High', assignee: 'S', date: 'May 30, 2025' },
  { id: 'p2', title: 'Implement responsive navigation', tag: 'Frontend', priority: 'High', assignee: 'J', date: 'Jun 02, 2025' },
  { id: 'p3', title: 'Setup API authentication', tag: 'Backend', priority: 'Medium', assignee: 'D', date: 'Jun 04, 2025' },
  { id: 'p4', title: 'Create database schema', tag: 'Backend', priority: 'Medium', assignee: 'M', date: 'Jun 06, 2025' },
];

const testingTasks: Task[] = [
  { id: 'q1', title: 'Test user registration flow', tag: 'QA', priority: 'High', assignee: 'L', date: 'May 31, 2025' },
  { id: 'q2', title: 'Cross-browser compatibility test', tag: 'QA', priority: 'Medium', assignee: 'J', date: 'Jun 03, 2025' },
  { id: 'q3', title: 'Check responsive design issues', tag: 'QA', priority: 'Low', assignee: 'E', date: 'Jun 05, 2025' },
  { id: 'q4', title: 'Performance testing', tag: 'QA', priority: 'Medium', assignee: 'D', date: 'Jun 07, 2025' },
];

const completedTasks: Task[] = [
  { id: 'c1', title: 'Project kickoff meeting', tag: 'Planning', priority: 'Low', assignee: 'S', date: 'May 20, 2025', done: true },
  { id: 'c2', title: 'Define project requirements', tag: 'Planning', priority: 'Medium', assignee: 'M', date: 'May 21, 2025', done: true },
  { id: 'c3', title: 'Create project timeline', tag: 'Planning', priority: 'Low', assignee: 'L', date: 'May 22, 2025', done: true },
  { id: 'c4', title: 'Setup project repository', tag: 'DevOps', priority: 'Low', assignee: 'J', date: 'May 23, 2025', done: true },
];

const initialColumns = {
  todo: {
    title: 'To Do',
    color: 'bg-slate-100',
    count: 6,
    tasks: todoTasks
  },
  inprogress: {
    title: 'In Progress',
    color: 'bg-blue-50',
    count: 5,
    tasks: inprogressTasks
  },
  testing: {
    title: 'Testing',
    color: 'bg-orange-50',
    count: 4,
    tasks: testingTasks
  },
  completed: {
    title: 'Completed',
    color: 'bg-green-50',
    count: 7,
    tasks: completedTasks
  }
}

const priorityColors: Record<string, string> = {
  High: 'text-red-500 bg-red-50',
  Medium: 'text-orange-500 bg-orange-50',
  Low: 'text-green-600 bg-green-50',
}

const tagColors: Record<string, string> = {
  'UI/UX': 'bg-purple-100 text-purple-700',
  'DevOps': 'bg-blue-100 text-blue-700',
  'Research': 'bg-yellow-100 text-yellow-700',
  'Content': 'bg-pink-100 text-pink-700',
  'Frontend': 'bg-cyan-100 text-cyan-700',
  'Backend': 'bg-green-100 text-green-700',
  'QA': 'bg-orange-100 text-orange-700',
  'Planning': 'bg-indigo-100 text-indigo-700',
}

type Columns = typeof initialColumns

export default function TasksPage() {
  const [columns, setColumns] = useState<Columns>(initialColumns)
  const [activeView, setActiveView] = useState<'board' | 'list'>('board')

  const handleAddTask = (colKey: keyof Columns) => {
    const title = prompt('New task title:')
    if (!title) return
    const newTask: Task = {
      id: Math.random().toString(36).slice(2),
      title,
      tag: 'UI/UX',
      priority: 'Medium',
      assignee: 'A',
      date: 'Jun 30, 2025'
    }
    setColumns(prev => ({
      ...prev,
      [colKey]: { ...prev[colKey], tasks: [...prev[colKey].tasks, newTask] }
    }))
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Task Board</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage and track your project tasks visually</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm cursor-pointer hover:bg-slate-50">
          <div className="w-4 h-4 bg-blue-100 rounded text-blue-600 flex items-center justify-center text-[10px]">W</div>
          <span className="font-medium text-slate-700">Website Redesign</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="flex-1" />
        <button className="btn-secondary">
          <Filter className="w-4 h-4" />
          Filters
        </button>
        <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden text-sm">
          <select className="px-3 py-2 text-slate-700 focus:outline-none bg-transparent">
            <option>Sort by Due Date</option>
            <option>Sort by Priority</option>
            <option>Sort by Assignee</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-4 gap-4">
        {(Object.entries(columns) as [keyof Columns, typeof columns[keyof Columns]][]).map(([key, col]) => (
          <div key={key} className="flex flex-col">
            {/* Column header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-800 text-sm">{col.title}</h3>
                <span className="text-xs bg-slate-100 text-slate-500 rounded-full px-2 py-0.5 font-medium">{col.tasks.length}</span>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Cards */}
            <div className={clsx('rounded-xl p-3 space-y-3 flex-1 min-h-[200px]', col.color)}>
              {col.tasks.map(task => (
                <div key={task.id} className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition-shadow group">
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <span className={clsx('badge text-[10px]', tagColors[task.tag] || 'badge-gray')}>{task.tag}</span>
                    <span className={clsx('badge text-[10px]', priorityColors[task.priority])}>
                      {task.priority === 'High' ? '+ High' : task.priority === 'Medium' ? '+ Medium' : '+ Low'}
                    </span>
                  </div>
                  <p
                    className={clsx(
                      'text-sm font-medium text-slate-800 mb-3 leading-snug',
                      task.done === true && 'line-through text-slate-400'
                    )}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">{task.assignee}</div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/></svg>
                      {task.date}
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => handleAddTask(key)}
                className="w-full py-2.5 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1.5 hover:bg-white/60 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
