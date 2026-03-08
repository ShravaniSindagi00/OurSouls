'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Users, Stethoscope, Calendar, Activity, TrendingUp, Menu, X, LogOut } from 'lucide-react'

const USER_GROWTH = [
  { month: 'Jan', patients: 120, therapists: 12 },
  { month: 'Feb', patients: 280, therapists: 28 },
  { month: 'Mar', patients: 450, therapists: 45 },
  { month: 'Apr', patients: 680, therapists: 68 },
  { month: 'May', therapists: 92, patients: 920 },
]

const SESSIONS_DATA = [
  { month: 'Jan', completed: 45, cancelled: 8 },
  { month: 'Feb', completed: 120, cancelled: 15 },
  { month: 'Mar', completed: 210, cancelled: 22 },
  { month: 'Apr', completed: 350, cancelled: 30 },
  { month: 'May', completed: 520, cancelled: 45 },
]

const SPECIALIZATION_DATA = [
  { name: 'Anxiety', value: 35 },
  { name: 'Depression', value: 28 },
  { name: 'Trauma', value: 18 },
  { name: 'Relationships', value: 12 },
  { name: 'Other', value: 7 },
]

const COLORS = ['#8b7fbf', '#4dd0e1', '#f0ad4e', '#5cb85c', '#d9534f']

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const stats = [
    {
      label: 'Total Users',
      value: '2,450',
      change: '+12%',
      icon: Users,
      color: 'bg-primary/10',
      textColor: 'text-primary',
    },
    {
      label: 'Active Therapists',
      value: '92',
      change: '+8%',
      icon: Stethoscope,
      color: 'bg-accent/10',
      textColor: 'text-accent',
    },
    {
      label: 'Completed Sessions',
      value: '1,245',
      change: '+23%',
      icon: Calendar,
      color: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      label: 'Avg User Rating',
      value: '4.8/5',
      change: '+0.2',
      icon: Activity,
      color: 'bg-yellow-100',
      textColor: 'text-yellow-600',
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } md:block fixed md:relative w-64 bg-card border-r border-border transition-all z-40`}
      >
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">OurSouls</h1>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="p-6 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted text-foreground"
          >
            <Activity size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Users size={20} />
            <span>Users</span>
          </Link>
          <Link
            href="/admin/therapists"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Stethoscope size={20} />
            <span>Therapists</span>
          </Link>
          <Link
            href="/admin/sessions"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Calendar size={20} />
            <span>Sessions</span>
          </Link>
          <Link
            href="/admin/reports"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
          >
            <TrendingUp size={20} />
            <span>Reports</span>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button variant="outline" className="w-full justify-center gap-2">
            <LogOut size={18} />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-card border-b border-border px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-2xl font-bold hidden sm:block">Admin Dashboard</h2>
          <div className="text-right">
            <p className="font-semibold">Admin User</p>
            <p className="text-sm text-muted-foreground">admin@oursols.com</p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 max-w-7xl">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <Card key={idx} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                      <Icon className={`${stat.textColor}`} size={24} />
                    </div>
                    <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </Card>
              )
            })}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* User Growth */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">User Growth</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={USER_GROWTH}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="patients"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    name="Patients"
                  />
                  <Line
                    type="monotone"
                    dataKey="therapists"
                    stroke="var(--color-accent)"
                    strokeWidth={2}
                    name="Therapists"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Session Completion */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Session Completion Rate</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={SESSIONS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="completed" fill="var(--color-primary)" name="Completed" />
                  <Bar dataKey="cancelled" fill="var(--color-destructive)" name="Cancelled" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Bottom Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Specialization Distribution */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Specialization Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={SPECIALIZATION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {SPECIALIZATION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {SPECIALIZATION_DATA.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[idx] }}
                    ></div>
                    <span className="text-sm">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <p className="font-medium text-sm">New User Signup</p>
                    <p className="text-xs text-muted-foreground">5 minutes ago</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">+1</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <p className="font-medium text-sm">Session Completed</p>
                    <p className="text-xs text-muted-foreground">15 minutes ago</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Session</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <p className="font-medium text-sm">New Therapist Added</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">+1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Post Moderated</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Review</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
