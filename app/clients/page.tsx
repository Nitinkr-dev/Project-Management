'use client'

import { Users, Plus, Search, Mail, Phone, Building } from 'lucide-react'

const clients = [
  { name: 'Acme Corporation', contact: 'Sarah Johnson', email: 'sarah@acme.com', phone: '+1 555-0101', projects: 3, status: 'Active' },
  { name: 'TechStart Inc.', contact: 'Mike Chen', email: 'mike@techstart.com', phone: '+1 555-0102', projects: 2, status: 'Active' },
  { name: 'Business Co.', contact: 'Lisa Brown', email: 'lisa@businessco.com', phone: '+1 555-0103', projects: 1, status: 'On Hold' },
  { name: 'Global Solutions', contact: 'James Wilson', email: 'james@global.com', phone: '+1 555-0104', projects: 4, status: 'Active' },
  { name: 'Innovate LLC', contact: 'Emily Davis', email: 'emily@innovate.com', phone: '+1 555-0105', projects: 2, status: 'Active' },
  { name: 'NextGen Systems', contact: 'David Kim', email: 'david@nextgen.com', phone: '+1 555-0106', projects: 1, status: 'Inactive' },
]

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage your client relationships</p>
        </div>
        <button className="btn-primary"><Plus className="w-4 h-4" />Add Client</button>
      </div>
      <div className="card">
        <div className="flex items-center gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search clients..." className="input-field pl-9" />
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          {clients.map(c => (
            <div key={c.name} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Building className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-800">{c.name}</div>
                <div className="text-xs text-slate-400">{c.contact}</div>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500"><Mail className="w-3.5 h-3.5" />{c.email}</div>
              <div className="flex items-center gap-1 text-xs text-slate-500"><Phone className="w-3.5 h-3.5" />{c.phone}</div>
              <div className="text-xs text-slate-500">{c.projects} projects</div>
              <span className={`badge ${c.status === 'Active' ? 'badge-green' : c.status === 'On Hold' ? 'badge-orange' : 'badge-gray'}`}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
