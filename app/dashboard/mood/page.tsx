'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const MOCK_MOOD_DATA = [
  { date: 'Mon', mood: 65, energy: 60 },
  { date: 'Tue', mood: 72, energy: 68 },
  { date: 'Wed', mood: 68, energy: 65 },
  { date: 'Thu', mood: 78, energy: 75 },
  { date: 'Fri', mood: 82, energy: 80 },
  { date: 'Sat', mood: 85, energy: 82 },
  { date: 'Sun', mood: 80, energy: 78 },
]

const MOOD_DISTRIBUTION = [
  { name: 'Great', value: 35, color: '#4dd0e1' },
  { name: 'Good', value: 30, color: '#8b7fbf' },
  { name: 'Okay', value: 20, color: '#f0ad4e' },
  { name: 'Bad', value: 15, color: '#d9534f' },
]

export default function MoodTrackerPage() {
  const [moodScore, setMoodScore] = useState(80)
  const [energyScore, setEnergyScore] = useState(75)
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/mood/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moodScore,
          energyScore,
          notes,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          setMoodScore(80)
          setEnergyScore(75)
          setNotes('')
          setSubmitted(false)
        }, 2000)
      }
    } catch (error) {
      console.error('Failed to save mood log:', error)
    }
  }

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mood & Wellness Tracker</h1>
        <p className="text-muted-foreground">Track your mental health journey and see your progress over time</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Log Mood Form */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Log Today's Mood</h2>

            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4">
                ✓ Mood logged successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mood Score */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  How's your mood? <span className="text-primary">{moodScore}</span>/100
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={moodScore}
                  onChange={(e) => setMoodScore(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Poor</span>
                  <span>Great</span>
                </div>
              </div>

              {/* Energy Score */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your energy level <span className="text-accent">{energyScore}</span>/100
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={energyScore}
                  onChange={(e) => setEnergyScore(Number(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium mb-2">Notes (optional)</label>
                <Textarea
                  placeholder="How are you feeling? What happened today?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-24"
                />
              </div>

              <Button type="submit" className="w-full">
                Save Mood Log
              </Button>
            </form>

            {/* Quick Stats */}
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="font-semibold mb-4">This Week</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Average Mood</p>
                  <p className="text-2xl font-bold text-primary">76/100</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Entries</p>
                  <p className="text-2xl font-bold text-accent">6/7</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Trend</p>
                  <p className="text-2xl font-bold text-green-600">↑ Improving</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Line Chart */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Mood & Energy Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={MOCK_MOOD_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
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
                  dataKey="mood"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', r: 4 }}
                  name="Mood"
                />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-accent)', r: 4 }}
                  name="Energy"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Pie Chart */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Mood Distribution (Last 30 Days)</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={MOOD_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {MOOD_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {MOOD_DISTRIBUTION.map((mood) => (
                  <div key={mood.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: mood.color }}></div>
                    <span className="text-sm">
                      {mood.name}: <span className="font-semibold">{mood.value}%</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Wellness Tips */}
          <Card className="p-6 bg-gradient-to-r from-accent/10 to-primary/10">
            <h2 className="text-xl font-semibold mb-4">Personalized Wellness Tips</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Consider scheduling a therapy session to maintain your positive mood trend.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Try a 10-minute meditation to boost your energy levels this week.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">•</span>
                <span>Your mood has improved significantly - keep up your wellness routine!</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
