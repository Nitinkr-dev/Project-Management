'use client'

import { useState } from 'react'
import { Eye, EyeOff, Upload, Shield, Trash2, LogOut } from 'lucide-react'
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your workspace, preferences and account settings.</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                'px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
                activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left - Main form */}
        <div className="col-span-2 space-y-6">
          {/* Profile Information */}
          <div className="card p-6">
            <h3 className="font-semibold text-slate-800 mb-5">Profile Information</h3>
            <div className="flex gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">A</div>
                <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                  <Upload className="w-3 h-3" />
                  Change Photo
                </button>
                <span className="text-[10px] text-slate-400">JPG, PNG up to 2MB</span>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
                  <input defaultValue="Admin" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
                  <input defaultValue="admin@promanage.com" className="input-field bg-slate-50" readOnly />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Job Title</label>
                  <input defaultValue="Super Admin" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Phone Number</label>
                  <input defaultValue="+91 98765 43210" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Language</label>
                  <select className="input-field">
                    <option>English (US)</option>
                    <option>Hindi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Time Zone</label>
                  <select className="input-field">
                    <option>(GMT+05:30) India Standard Time</option>
                    <option>(GMT+00:00) UTC</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>

          {/* Workspace Settings */}
          <div className="card p-6">
            <h3 className="font-semibold text-slate-800 mb-5">Workspace Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 grid grid-cols-3 gap-4 items-start">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Workspace Name</label>
                  <input defaultValue="TechNova Workspace" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Workspace Logo</label>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">TW</div>
                    <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      Upload Logo
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Default View</label>
                <select className="input-field"><option>Board</option><option>List</option><option>Calendar</option></select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Date Format</label>
                <select className="input-field"><option>DD MMM YYYY</option><option>MM/DD/YYYY</option></select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Week Starts On</label>
                <select className="input-field"><option>Monday</option><option>Sunday</option></select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Currency</label>
                <select className="input-field"><option>INR (₹)</option><option>USD ($)</option><option>EUR (€)</option></select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="card p-6">
            <h3 className="font-semibold text-slate-800 mb-1">Email Notifications</h3>
            <p className="text-xs text-slate-400 mb-5">Choose what you want to receive via email.</p>
            <div className="grid grid-cols-2 gap-y-4">
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
                      <div className="text-sm font-medium text-slate-700">{labels[key][0]}</div>
                      <div className="text-xs text-slate-400">{labels[key][1]}</div>
                    </div>
                    <button
                      onClick={() => setEmailNotifs(prev => ({ ...prev, [key]: !val }))}
                      className={clsx('relative w-10 h-5 rounded-full transition-colors', val ? 'bg-blue-600' : 'bg-slate-200')}
                    >
                      <span className={clsx('absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform', val ? 'translate-x-5' : 'translate-x-0.5')} />
                    </button>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-end mt-4">
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Change Password */}
          <div className="card p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Change Password</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Current Password</label>
                <div className="relative">
                  <input type="password" placeholder="Enter current password" className="input-field pr-9" />
                  <Eye className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">New Password</label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} placeholder="Enter new password" className="input-field pr-9" />
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" className="input-field" />
              </div>
              <button className="btn-primary w-full justify-center">Update Password</button>
            </div>
          </div>

          {/* 2FA */}
          <div className="card p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Two-Factor Authentication</h3>
            <div className="flex items-start gap-2.5 mb-3">
              <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-slate-700">Two-factor authentication is enabled.</div>
                <div className="text-xs text-slate-400">Your account is protected.</div>
              </div>
            </div>
            <button className="btn-secondary w-full justify-center text-xs">Manage 2FA</button>
          </div>

          {/* Sessions */}
          <div className="card p-5">
            <h3 className="font-semibold text-slate-800 mb-1">Session Management</h3>
            <p className="text-xs text-slate-400 mb-3">You are currently signed in on the devices listed below.</p>
            <div className="space-y-3">
              {[
                { device: 'Windows • Chrome', location: 'New Delhi, India', time: '10 May 2024, 10:30 AM', current: true },
                { device: 'Android • Chrome', location: 'New Delhi, India', time: '09 May 2024, 08:15 PM', current: false },
                { device: 'MacOS • Safari', location: 'Bengaluru, India', time: '08 May 2024, 11:20 AM', current: false },
              ].map(session => (
                <div key={session.device} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-slate-100 rounded flex items-center justify-center text-base flex-shrink-0">💻</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-700">{session.device}</span>
                      {session.current && <span className="badge badge-blue text-[10px]">Current Session</span>}
                    </div>
                    <div className="text-[10px] text-slate-400">{session.location} · {session.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 py-2 text-xs text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium flex items-center justify-center gap-1.5">
              <LogOut className="w-3.5 h-3.5" />
              Sign Out From All Devices
            </button>
          </div>

          {/* Danger Zone */}
          <div className="card p-5 border border-red-100">
            <h3 className="font-semibold text-red-600 mb-1">Danger Zone</h3>
            <p className="text-xs text-slate-400 mb-3">Permanently delete your workspace and all of its data.</p>
            <button className="w-full py-2 text-xs text-red-500 border border-red-300 rounded-lg hover:bg-red-50 transition-colors font-medium flex items-center justify-center gap-1.5">
              <Trash2 className="w-3.5 h-3.5" />
              Delete Workspace
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
