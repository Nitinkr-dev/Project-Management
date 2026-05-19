'use client'

import { useState } from 'react'
import { Eye, EyeOff, Upload, Shield, Trash2, LogOut, Plus, Check, Info, HelpCircle, HardDrive, CreditCard, ShieldCheck } from 'lucide-react'
import clsx from 'clsx'

const tabs = ['Profile', 'Workspace', 'Team', 'Roles & Permissions', 'Integrations', 'Billing', 'Security', 'Preferences']

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile')
  const [showPass, setShowPass] = useState(false)
  const [emailNotifs, setEmailNotifs] = useState({
    taskAssignments: true,
    taskUpdates: true,
    projectUpdates: true,
    comments: true,
    mentions: true,
    weeklySummary: false,
  })

  const [profileName, setProfileName] = useState('Admin')
  const [profileTitle, setProfileTitle] = useState('Super Admin')
  const [profilePhone, setProfilePhone] = useState('+91 98765 43210')

  // Team state
  const [team, setTeam] = useState([
    { name: 'Admin', email: 'admin@promanage.com', role: 'Owner', status: 'Active', avatar: 'A' },
    { name: 'Rahul Verma', email: 'rahul@promanage.com', role: 'Admin', status: 'Active', avatar: 'R' },
    { name: 'Anita Sharma', email: 'anita@promanage.com', role: 'Member', status: 'Active', avatar: 'A' },
    { name: 'Sneha Patel', email: 'sneha@promanage.com', role: 'Member', status: 'Inactive', avatar: 'S' },
  ])
  const [newMemberName, setNewMemberName] = useState('')
  const [newMemberEmail, setNewMemberEmail] = useState('')
  const [newMemberRole, setNewMemberRole] = useState('Member')

  const handleAddTeamMember = () => {
    if (newMemberName && newMemberEmail) {
      setTeam([...team, { name: newMemberName, email: newMemberEmail, role: newMemberRole, status: 'Active', avatar: newMemberName.charAt(0).toUpperCase() }])
      setNewMemberName('')
      setNewMemberEmail('')
    } else {
      alert('Name and Email are required.')
    }
  }

  const handleRemoveMember = (email: string) => {
    if (confirm('Are you sure you want to remove this member?')) {
      setTeam(team.filter(m => m.email !== email))
    }
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Profile settings saved successfully!')
  }

  const handleSaveWorkspace = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Workspace configurations updated!')
  }

  const handleSaveNotifications = () => {
    alert('Notification preferences updated!')
  }

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Password has been changed successfully!')
  }

  const handleDeleteWorkspace = () => {
    const confirmation = confirm('WARNING: Are you absolutely sure you want to delete this workspace? This will permanently delete all projects, tasks, and configurations. This action CANNOT be undone.')
    if (confirmation) {
      alert('Workspace deletion requested. Access terminated.')
    }
  }

  const renderProfile = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Form Area */}
      <div className="card p-4 md:p-6 lg:col-span-2">
        <h3 className="font-semibold text-slate-800 mb-5">Profile Information</h3>
        <form onSubmit={handleSaveProfile} className="space-y-5">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">A</div>
              <button type="button" onClick={() => alert('Change photo trigger')} className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium">
                <Upload className="w-3 h-3" />
                Change Photo
              </button>
              <span className="text-[10px] text-slate-400">JPG, PNG up to 2MB</span>
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
                <input
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
                <input defaultValue="admin@promanage.com" className="input-field bg-slate-50 text-slate-500" readOnly />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Job Title</label>
                <input
                  value={profileTitle}
                  onChange={e => setProfileTitle(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Phone Number</label>
                <input
                  value={profilePhone}
                  onChange={e => setProfilePhone(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Language</label>
                <select className="input-field bg-white">
                  <option>English (US)</option>
                  <option>Hindi</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Time Zone</label>
                <select className="input-field bg-white">
                  <option>(GMT+05:30) India Standard Time</option>
                  <option>(GMT+00:00) UTC</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>

      {/* Info Sidebar */}
      <div className="space-y-6">
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600" />
            Profile Status
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                <span>Completeness</span>
                <span>85%</span>
              </div>
              <div className="progress-bar w-full">
                <div className="progress-fill bg-blue-600" style={{ width: '85%' }} />
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Add a professional profile photo and verify your phone number to complete your profile setup. A complete profile helps team members identify you instantly.
            </p>
          </div>
        </div>

        <div className="card p-5 bg-slate-50/50 border border-slate-100">
          <h3 className="font-semibold text-slate-700 text-sm mb-3">Security Tips</h3>
          <ul className="text-xs text-slate-500 space-y-2 list-disc list-inside">
            <li>Never share your credentials.</li>
            <li>Use a unique, strong password.</li>
            <li>Enable 2FA under the Security tab.</li>
          </ul>
        </div>
      </div>
    </div>
  )

  const renderWorkspace = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Main Settings & Danger */}
      <div className="lg:col-span-2 space-y-6">
        <div className="card p-4 md:p-6">
          <h3 className="font-semibold text-slate-800 mb-5">Workspace Settings</h3>
          <form onSubmit={handleSaveWorkspace} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">Workspace Name</label>
                <input defaultValue="TechNova Workspace" className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Workspace Logo</label>
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">TW</div>
                  <button type="button" onClick={() => alert('Logo upload click')} className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium">
                    <Upload className="w-3 h-3" />
                    Upload Logo
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Default View</label>
                <select className="input-field bg-white"><option>Board</option><option>List</option><option>Calendar</option></select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Date Format</label>
                <select className="input-field bg-white"><option>DD MMM YYYY</option><option>MM/DD/YYYY</option></select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Week Starts On</label>
                <select className="input-field bg-white"><option>Monday</option><option>Sunday</option></select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Currency</label>
                <select className="input-field bg-white"><option>INR (₹)</option><option>USD ($)</option><option>EUR (€)</option></select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button type="submit" className="btn-primary">Save Changes</button>
            </div>
          </form>
        </div>

        <div className="card p-5 border border-red-100">
          <h3 className="font-semibold text-red-600 mb-1">Danger Zone</h3>
          <p className="text-xs text-slate-400 mb-3">Permanently delete your workspace and all of its data.</p>
          <button
            onClick={handleDeleteWorkspace}
            className="py-2 px-4 text-xs text-red-500 border border-red-300 rounded-lg hover:bg-red-50 transition-colors font-medium flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Workspace
          </button>
        </div>
      </div>

      {/* Workspace Sidebar Info */}
      <div className="space-y-6">
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
            <HardDrive className="w-4 h-4 text-blue-600" />
            Storage Overview
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                <span>Usage</span>
                <span>4.2 GB of 100 GB</span>
              </div>
              <div className="progress-bar w-full">
                <div className="progress-fill bg-green-500" style={{ width: '4.2%' }} />
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your workspace is currently utilizing <strong>4.2%</strong> of the allocated enterprise storage. Clean up unused project attachments to free up space.
            </p>
          </div>
        </div>

        <div className="card p-5 bg-blue-50/30 border border-blue-100/50">
          <h4 className="text-xs font-bold text-slate-700 mb-2">Workspace ID</h4>
          <code className="text-xs bg-white border border-slate-100 p-2 rounded block select-all font-mono text-slate-600">
            twn_ws_93fa82cd8b021
          </code>
          <p className="text-[10px] text-slate-400 mt-2">Provide this ID when contacting support or configuring third-party integrations.</p>
        </div>
      </div>
    </div>
  )

  const renderTeam = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Team Form & Members List */}
      <div className="lg:col-span-2 card p-4 md:p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-slate-800">Team Members</h3>
          <p className="text-xs text-slate-400">Manage who has access to this workspace.</p>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Name</label>
            <input type="text" value={newMemberName} onChange={e => setNewMemberName(e.target.value)} placeholder="Full Name" className="input-field bg-white" />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
            <input type="email" value={newMemberEmail} onChange={e => setNewMemberEmail(e.target.value)} placeholder="email@example.com" className="input-field bg-white" />
          </div>
          <div className="w-full sm:w-36">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Role</label>
            <select value={newMemberRole} onChange={e => setNewMemberRole(e.target.value)} className="input-field bg-white">
              <option>Admin</option>
              <option>Member</option>
              <option>Viewer</option>
            </select>
          </div>
          <button onClick={handleAddTeamMember} className="btn-primary w-full sm:w-auto h-9 shrink-0">Invite</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3">Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {team.map(m => (
                <tr key={m.email} className="hover:bg-slate-50/50">
                  <td className="py-3 flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">{m.avatar}</div>
                    <span className="font-medium text-slate-800">{m.name}</span>
                  </td>
                  <td className="py-3">{m.email}</td>
                  <td className="py-3"><span className="text-xs font-semibold text-slate-600">{m.role}</span></td>
                  <td className="py-3"><span className={`badge ${m.status === 'Active' ? 'badge-green' : 'badge-gray'}`}>{m.status}</span></td>
                  <td className="py-3 text-right">
                    {m.role !== 'Owner' && (
                      <button onClick={() => handleRemoveMember(m.email)} className="text-red-500 hover:text-red-700 text-xs font-medium cursor-pointer">Remove</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Summary Sidebar */}
      <div className="space-y-6">
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            Workspace Seats
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Seats In Use:</span>
              <span className="font-semibold text-slate-800">{team.length} / 15 seats</span>
            </div>
            <div className="progress-bar w-full">
              <div className="progress-fill bg-blue-500" style={{ width: `${(team.length / 15) * 100}%` }} />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed pt-1">
              Your current Enterprise plan covers up to 15 active seats. Contact sales if you wish to expand seat capacities.
            </p>
          </div>
        </div>

        <div className="card p-5 bg-green-50/30 border border-green-100/50">
          <h4 className="text-xs font-bold text-green-800 mb-2">Invite Pending</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Invited members will receive an activation email containing a secure magic sign-in link valid for 48 hours.
          </p>
        </div>
      </div>
    </div>
  )

  const renderRoles = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Table Area */}
      <div className="lg:col-span-2 card p-4 md:p-6 space-y-5">
        <div>
          <h3 className="font-semibold text-slate-800">Roles & Permissions</h3>
          <p className="text-xs text-slate-400">Configure global permission matrices for each user group.</p>
        </div>
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left text-sm text-slate-600">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="p-4">Permission</th>
                <th className="p-4 text-center">Owner</th>
                <th className="p-4 text-center">Admin</th>
                <th className="p-4 text-center">Member</th>
                <th className="p-4 text-center">Viewer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { permission: 'Manage Workspace & Billing', owner: true, admin: false, member: false, viewer: false },
                { permission: 'Invite/Remove Team Members', owner: true, admin: true, member: false, viewer: false },
                { permission: 'Create & Edit Projects', owner: true, admin: true, member: true, viewer: false },
                { permission: 'Delete Projects & Tasks', owner: true, admin: true, member: false, viewer: false },
                { permission: 'View Analytics & Reports', owner: true, admin: true, member: true, viewer: true },
              ].map(p => (
                <tr key={p.permission} className="hover:bg-slate-50/20">
                  <td className="p-4 font-medium text-slate-800 text-xs leading-normal">{p.permission}</td>
                  <td className="p-4 text-center text-xs text-slate-500 font-semibold">{p.owner ? '✓' : '—'}</td>
                  <td className="p-4 text-center text-xs text-slate-500 font-semibold">{p.admin ? '✓' : '—'}</td>
                  <td className="p-4 text-center text-xs text-slate-500 font-semibold">{p.member ? '✓' : '—'}</td>
                  <td className="p-4 text-center text-xs text-slate-500 font-semibold">{p.viewer ? '✓' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Description Area */}
      <div className="space-y-6">
        <div className="card p-5 space-y-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600" />
            Roles Overview
          </h3>
          <div className="space-y-3 text-xs text-slate-500 leading-relaxed">
            <div>
              <strong className="text-slate-700 block">Owner</strong>
              Has absolute control, including billing settings and deletion.
            </div>
            <div>
              <strong className="text-slate-700 block">Admin</strong>
              Full access except for sensitive subscription settings.
            </div>
            <div>
              <strong className="text-slate-700 block">Member</strong>
              Standard developer / collaborator role. Creates and manages tasks.
            </div>
            <div>
              <strong className="text-slate-700 block">Viewer</strong>
              Read-only stakeholder. Cannot add/modify content.
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderIntegrations = () => (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="font-semibold text-slate-800 text-lg">App Integrations</h3>
        <p className="text-xs text-slate-400">Connect ProManage to your existing tools and automate workflows.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[
          { name: 'Slack', desc: 'Send task assignments, updates, and comments to Slack channels.', connected: true, logo: '💬' },
          { name: 'GitHub', desc: 'Attach commits and pull requests directly to tasks.', connected: true, logo: '🐙' },
          { name: 'Google Drive', desc: 'Sync files and folders to project documentation.', connected: false, logo: '📁' },
          { name: 'Figma', desc: 'Link design frames directly inside tasks.', connected: false, logo: '🎨' },
        ].map(app => (
          <div key={app.name} className="card p-5 flex flex-col justify-between" style={{ minHeight: '180px' }}>
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl flex-shrink-0">{app.logo}</div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${app.connected ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'}`}>
                  {app.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-800 mb-1">{app.name}</h4>
              <p className="text-xs text-slate-400 leading-normal mb-4 line-clamp-2">{app.desc}</p>
            </div>
            <button 
              onClick={() => alert(`${app.name} action triggered!`)}
              className={`text-xs font-semibold py-1.5 px-3 rounded-lg border transition-all cursor-pointer text-center w-full ${
                app.connected ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600' : 'bg-blue-600 hover:bg-blue-700 border-transparent text-white'
              }`}
            >
              {app.connected ? 'Configure' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderBilling = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Sub and Invoices */}
      <div className="lg:col-span-2 space-y-6">
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Subscription Plan</h3>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Active Plan</span>
              <h4 className="text-lg font-bold text-slate-800 mt-1.5">Enterprise Pro Plan</h4>
              <p className="text-xs text-slate-500 mt-0.5">Billed monthly. Next payment of ₹4,999 on Jun 15, 2026.</p>
            </div>
            <button onClick={() => alert('Upgrade modal')} className="btn-primary">Upgrade Plan</button>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-3">Invoice History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead>
                <tr className="border-b border-slate-100 font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3">Invoice ID</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { id: 'INV-2026-004', date: '15 May 2026', amount: '₹4,999', status: 'Paid' },
                  { id: 'INV-2026-003', date: '15 Apr 2026', amount: '₹4,999', status: 'Paid' },
                  { id: 'INV-2026-002', date: '15 Mar 2026', amount: '₹4,999', status: 'Paid' },
                ].map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 font-medium text-slate-800">{inv.id}</td>
                    <td className="py-2.5">{inv.date}</td>
                    <td className="py-2.5">{inv.amount}</td>
                    <td className="py-2.5"><span className="badge badge-green">Paid</span></td>
                    <td className="py-2.5 text-right"><button onClick={() => alert('Downloading invoice...')} className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer">Download</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment details */}
      <div className="space-y-6">
        <div className="card p-5 space-y-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-blue-600" />
            Payment Method
          </h3>
          <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl space-y-3 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-700">
              <span>Visa card</span>
              <span>•••• 4242</span>
            </div>
            <div className="text-[10px] text-slate-400">Expires 12 / 2028 · Admin User</div>
            <button onClick={() => alert('Edit payment details')} className="w-full text-center py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-lg font-semibold transition-colors mt-2 cursor-pointer">
              Edit Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSecurity = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Pass Form */}
      <div className="card p-5 lg:col-span-2">
        <h3 className="font-semibold text-slate-800 mb-4">Change Password</h3>
        <form onSubmit={handleUpdatePassword} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Current Password</label>
            <div className="relative">
              <input type="password" placeholder="Enter current password" className="input-field pr-9" required />
              <Eye className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">New Password</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} placeholder="Enter new password" className="input-field pr-9" required />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Confirm New Password</label>
            <input type="password" placeholder="Confirm new password" className="input-field" required />
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" className="btn-primary">Update Password</button>
          </div>
        </form>
      </div>

      {/* 2FA Sessions */}
      <div className="space-y-6">
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-3">Two-Factor Authentication</h3>
          <div className="flex items-start gap-2.5 mb-3">
            <ShieldCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-slate-700">2FA is enabled.</div>
              <div className="text-xs text-slate-400">Protected using Authenticator App.</div>
            </div>
          </div>
          <button onClick={() => alert('2FA Configurations opened!')} className="btn-secondary w-full justify-center text-xs">Manage 2FA</button>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Active Sessions</h3>
          <p className="text-xs text-slate-400 mb-3">Currently logged in devices.</p>
          <div className="space-y-3">
            {[
              { device: 'Windows • Chrome', location: 'New Delhi, India', time: 'Active Now', current: true },
              { device: 'MacOS • Safari', location: 'Bengaluru, India', time: '2 days ago', current: false },
            ].map(session => (
              <div key={session.device} className="flex items-center gap-2.5 text-xs">
                <div className="w-7 h-7 bg-slate-100 rounded flex items-center justify-center text-sm flex-shrink-0">💻</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-700 truncate">{session.device}</span>
                    {session.current && <span className="bg-blue-100 text-blue-700 text-[8px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">Current</span>}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{session.location} · {session.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderPreferences = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Form Area */}
      <div className="card p-4 md:p-6 lg:col-span-2 space-y-6">
        <div>
          <h3 className="font-semibold text-slate-800">Workspace Preferences</h3>
          <p className="text-xs text-slate-400">Customize how your account feels and operates.</p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Email Notifications</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(emailNotifs).map(([key, val]) => {
              const labels: Record<string, [string, string]> = {
                taskAssignments: ['Task assignments', 'Notify when tasks are assigned to you'],
                taskUpdates: ['Task updates', 'Notify when tasks are updated'],
                projectUpdates: ['Project updates', 'Notify about project changes'],
                comments: ['Comments', 'Notify on new comments'],
                mentions: ['Mentions', 'Notify when you are mentioned'],
                weeklySummary: ['Weekly summary', 'Receive weekly summary emails'],
              }
              return (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-700">{labels[key][0]}</div>
                    <div className="text-xs text-slate-400">{labels[key][1]}</div>
                  </div>
                  <button
                    onClick={() => setEmailNotifs(prev => ({ ...prev, [key]: !val }))}
                    className={clsx('relative w-10 h-5 rounded-full transition-colors cursor-pointer', val ? 'bg-blue-600' : 'bg-slate-200')}
                  >
                    <span className={clsx('absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform', val ? 'translate-x-5' : 'translate-x-0')} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-1">Theme Mode</h4>
          <div className="grid grid-cols-3 gap-3">
            {['Light', 'Dark', 'System'].map(mode => (
              <button
                key={mode}
                onClick={() => alert(`Theme changed to ${mode}`)}
                className="py-2.5 text-xs font-semibold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Sidebar */}
      <div className="space-y-6">
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600" />
            Preferences Guide
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Changing the theme updates the interface immediately across all browser windows. 
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-2">
            Notification changes are updated in real-time, preventing unnecessary inbox clutter while ensuring you stay informed about your active tasks.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your workspace, preferences and account settings.</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-none">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                'px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer',
                activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Render Active Tab Page */}
      <div className="min-h-[400px]">
        {activeTab === 'Profile' && renderProfile()}
        {activeTab === 'Workspace' && renderWorkspace()}
        {activeTab === 'Team' && renderTeam()}
        {activeTab === 'Roles & Permissions' && renderRoles()}
        {activeTab === 'Integrations' && renderIntegrations()}
        {activeTab === 'Billing' && renderBilling()}
        {activeTab === 'Security' && renderSecurity()}
        {activeTab === 'Preferences' && renderPreferences()}
      </div>
    </div>
  )
}
