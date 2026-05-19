'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Shield, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    // Simulate auth
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left - Login Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 md:px-16 lg:px-20 bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-12">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <div>
            <div className="font-bold text-slate-900 text-lg leading-none">ProManage</div>
            <div className="text-xs text-slate-400 leading-none mt-0.5">Project Management System</div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back!</h1>
        <p className="text-slate-500 mb-8 text-sm">Sign in to access your admin dashboard</p>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@company.com"
                className="input-field !pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input-field !pl-10 !pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-600">Remember me</span>
            </label>
            <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-8 flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Shield className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800">Secure login</div>
            <div className="text-xs text-slate-500 mt-0.5">Your data is protected with enterprise-grade security and encryption.</div>
          </div>
        </div>
      </div>

      {/* Right - Hero */}
      <div className="hidden lg:flex lg:w-[55%] bg-gradient-to-br from-blue-50 via-blue-100 to-slate-200 flex-col justify-center items-start px-16 relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-200 rounded-full opacity-30" />
        <div className="absolute bottom-[-80px] left-[-60px] w-[300px] h-[300px] bg-blue-300 rounded-full opacity-20" />

        <div className="relative z-10 max-w-lg">
          <h2 className="text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Plan. Manage.<br />Deliver.
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-10">
            ProManage helps teams streamline projects, track progress, and deliver results efficiently all in one place.
          </p>

          {/* Mock dashboard preview */}
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 px-4 py-2.5 flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="p-4 bg-slate-50">
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { label: 'Projects', value: '24', color: 'bg-blue-500' },
                  { label: 'Tasks', value: '68', color: 'bg-green-500' },
                  { label: 'Members', value: '16', color: 'bg-purple-500' },
                ].map(item => (
                  <div key={item.label} className="bg-white rounded-lg p-2.5 border border-slate-100">
                    <div className={`w-5 h-5 ${item.color} rounded mb-1.5`} />
                    <div className="text-xs font-bold text-slate-800">{item.value}</div>
                    <div className="text-[10px] text-slate-400">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-100">
                <div className="text-[10px] font-semibold text-slate-600 mb-2">Project Progress</div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="text-sm font-bold text-slate-800">75%</div>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                <div className="flex gap-3">
                  {['Completed', 'In Progress', 'On Hold'].map((s, i) => (
                    <div key={s} className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-green-500' : 'bg-orange-400'}`} />
                      <span className="text-[9px] text-slate-500">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
