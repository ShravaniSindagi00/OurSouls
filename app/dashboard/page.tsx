'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Calendar, BarChart3, Users, MessageSquare, LogOut, Menu, X } from 'lucide-react'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // In a real app, fetch user data and appointments
    // For now, we'll set up the skeleton
    const timer = setTimeout(() => {
      setLoading(false)
      setUser({
        id: '1',
        fullName: 'John Doe',
        email: 'john@example.com',
        moodScore: 72,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const navigation = [
    { name: 'Overview', href: '#', icon: BarChart3 },
    { name: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
    { name: 'Therapists', href: '/dashboard/therapists', icon: Users },
    { name: 'Mood Tracker', href: '/dashboard/mood', icon: BarChart3 },
    { name: 'Community', href: '/dashboard/community', icon: MessageSquare },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-muted rounded mb-4"></div>
          <div className="h-4 w-24 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed md:relative w-64 bg-card border-r border-border transition-all`}>
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">OurSouls</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-6 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="outline"
            className="w-full justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 bg-card border-b border-border px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-2xl font-bold hidden sm:block">Welcome back, {user?.fullName?.split(' ')[0]}!</h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-semibold">{user?.fullName}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 max-w-7xl">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Mood Score</div>
              <div className="text-4xl font-bold text-primary">{user?.moodScore || 72}%</div>
              <p className="text-xs text-muted-foreground mt-2">↑ 5% from last week</p>
            </Card>

            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Upcoming Sessions</div>
              <div className="text-4xl font-bold text-accent">2</div>
              <p className="text-xs text-muted-foreground mt-2">Next: Tomorrow at 2 PM</p>
            </Card>

            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Streak Days</div>
              <div className="text-4xl font-bold text-primary">12</div>
              <p className="text-xs text-muted-foreground mt-2">Consecutive check-ins</p>
            </Card>

            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Community Posts</div>
              <div className="text-4xl font-bold text-accent">8</div>
              <p className="text-xs text-muted-foreground mt-2">You've helped 5 people</p>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Upcoming Appointments */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
              {appointments.length > 0 ? (
                <div className="space-y-3">
                  {appointments.slice(0, 3).map((apt) => (
                    <div key={apt.id} className="flex justify-between items-center pb-3 border-b border-border last:border-0">
                      <div>
                        <p className="font-medium">{apt.therapistName}</p>
                        <p className="text-sm text-muted-foreground">{apt.time}</p>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  ))}
                  {appointments.length === 0 && (
                    <p className="text-muted-foreground mb-4">No appointments scheduled</p>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground mb-4">No appointments scheduled</p>
              )}
              <Link href="/dashboard/appointments">
                <Button className="w-full mt-4">Book a Session</Button>
              </Link>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 size={18} className="mr-2" />
                  Log Mood Today
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare size={18} className="mr-2" />
                  Chat with AI Assistant
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users size={18} className="mr-2" />
                  Browse Therapists
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare size={18} className="mr-2" />
                  Visit Community
                </Button>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex gap-4 pb-4 border-b border-border last:border-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Session with Dr. Sarah</p>
                  <p className="text-sm text-muted-foreground">Today at 2:00 PM - Completed</p>
                </div>
              </div>
              <div className="flex gap-4 pb-4 border-b border-border last:border-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-accent flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Logged mood: Great day</p>
                  <p className="text-sm text-muted-foreground">Yesterday - Mood score: 85%</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Posted on community</p>
                  <p className="text-sm text-muted-foreground">2 days ago - Got 3 supportive responses</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
