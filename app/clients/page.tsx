'use client'

import { useState } from 'react'
import { Plus, Search, Mail, Phone, Building, X } from 'lucide-react'

type Client = {
  name: string
  contact: string
  email: string
  phone: string
  projects: number
  status: 'Active' | 'On Hold' | 'Inactive'
}

const initialClients: Client[] = [
  { name: 'Acme Corporation', contact: 'Sarah Johnson', email: 'sarah@acme.com', phone: '+1 555-0101', projects: 3, status: 'Active' },
  { name: 'TechStart Inc.', contact: 'Mike Chen', email: 'mike@techstart.com', phone: '+1 555-0102', projects: 2, status: 'Active' },
  { name: 'Business Co.', contact: 'Lisa Brown', email: 'lisa@businessco.com', phone: '+1 555-0103', projects: 1, status: 'On Hold' },
  { name: 'Global Solutions', contact: 'James Wilson', email: 'james@global.com', phone: '+1 555-0104', projects: 4, status: 'Active' },
  { name: 'Innovate LLC', contact: 'Emily Davis', email: 'emily@innovate.com', phone: '+1 555-0105', projects: 2, status: 'Active' },
  { name: 'NextGen Systems', contact: 'David Kim', email: 'david@nextgen.com', phone: '+1 555-0106', projects: 1, status: 'Inactive' },
]

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [search, setSearch] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  // Form state for adding a client
  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: '', contact: '', email: '', phone: '', projects: 0, status: 'Active'
  })

  const handleAddClient = () => {
    if (newClient.name && newClient.email) {
      setClients([{ ...(newClient as Client), projects: Number(newClient.projects) }, ...clients])
      setIsAddModalOpen(false)
      setNewClient({ name: '', contact: '', email: '', phone: '', projects: 0, status: 'Active' })
    } else {
      alert('Name and Email are required.')
    }
  }

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.contact.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage your client relationships</p>
        </div>
        <button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 shrink-0" />
          Add Client
        </button>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 shrink-0" />
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search clients..." 
              style={{ paddingLeft: '2.5rem' }}
              className="input-field" 
            />
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          {filteredClients.map(c => (
            <div 
              key={c.name} 
              onClick={() => setSelectedClient(c)}
              className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Building className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{c.name}</div>
                  <div className="text-xs text-slate-400 truncate">{c.contact}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:flex md:items-center gap-3 md:gap-4 text-xs text-slate-500 pl-14 md:pl-0">
                <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" /><span className="truncate">{c.email}</span></div>
                <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" /><span className="truncate">{c.phone}</span></div>
                <div className="flex items-center justify-between md:justify-end gap-4 col-span-2 md:col-span-1 mt-1 md:mt-0 md:min-w-[140px]">
                  <span className="text-xs font-medium text-slate-600">{c.projects} projects</span>
                  <span className={`badge ${c.status === 'Active' ? 'badge-green' : c.status === 'On Hold' ? 'badge-orange' : 'badge-gray'}`}>{c.status}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredClients.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-sm">No clients found matching "{search}"</div>
          )}
        </div>
      </div>

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">Add New Client</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Company Name *</label>
                <input type="text" className="input-field" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} placeholder="e.g. Acme Corp" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Contact Person</label>
                <input type="text" className="input-field" value={newClient.contact} onChange={e => setNewClient({...newClient, contact: e.target.value})} placeholder="e.g. Jane Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Email *</label>
                  <input type="email" className="input-field" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} placeholder="jane@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Phone</label>
                  <input type="text" className="input-field" value={newClient.phone} onChange={e => setNewClient({...newClient, phone: e.target.value})} placeholder="+1 555-0000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Initial Projects</label>
                  <input type="number" min="0" className="input-field" value={newClient.projects} onChange={e => setNewClient({...newClient, projects: parseInt(e.target.value) || 0})} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Status</label>
                  <select className="input-field" value={newClient.status} onChange={e => setNewClient({...newClient, status: e.target.value as any})}>
                    <option value="Active">Active</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
              <button className="btn-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleAddClient}>Save Client</button>
            </div>
          </div>
        </div>
      )}

      {/* Client Details Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedClient(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 text-center border-b border-slate-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">{selectedClient.name}</h2>
              <span className={`badge ${selectedClient.status === 'Active' ? 'badge-green' : selectedClient.status === 'On Hold' ? 'badge-orange' : 'badge-gray'}`}>
                {selectedClient.status}
              </span>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <span className="font-semibold text-slate-600 text-xs">{selectedClient.contact.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-medium text-slate-800">{selectedClient.contact}</div>
                  <div className="text-xs text-slate-500">Primary Contact</div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 space-y-3 text-sm">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href={`mailto:${selectedClient.email}`} className="hover:text-blue-600 transition-colors truncate">{selectedClient.email}</a>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href={`tel:${selectedClient.phone}`} className="hover:text-blue-600 transition-colors">{selectedClient.phone}</a>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-4 h-4 flex items-center justify-center text-slate-400 shrink-0 border border-slate-400 rounded-sm font-bold text-[10px]">P</div>
                  <span>{selectedClient.projects} Active Projects</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100">
              <button className="w-full btn-secondary justify-center" onClick={() => setSelectedClient(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
