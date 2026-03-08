'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

const WELLNESS_GOALS = [
  { id: 'anxiety', label: 'Anxiety Management' },
  { id: 'depression', label: 'Depression Support' },
  { id: 'stress', label: 'Stress Relief' },
  { id: 'relationships', label: 'Relationship Issues' },
  { id: 'work', label: 'Work & Career' },
  { id: 'trauma', label: 'Trauma Recovery' },
  { id: 'selfesteem', label: 'Self-Esteem Building' },
  { id: 'sleep', label: 'Sleep Issues' },
  { id: 'coping', label: 'Coping Strategies' },
  { id: 'mindfulness', label: 'Mindfulness & Meditation' },
]

export default function QuestionnairePage() {
  const router = useRouter()
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/wellness/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goals: selectedGoals }),
      })

      if (!response.ok) {
        throw new Error('Failed to save wellness goals')
      }

      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Your Wellness Journey</h1>
          <p className="text-muted-foreground mb-8">
            Tell us about your wellness goals so we can match you with the right support and resources.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Goals Selection */}
            <div>
              <label className="block text-sm font-medium mb-4">
                Select areas you'd like support with (choose one or more):
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {WELLNESS_GOALS.map((goal) => (
                  <label
                    key={goal.id}
                    className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedGoals.includes(goal.id)}
                      onChange={() => toggleGoal(goal.id)}
                      className="w-5 h-5 rounded border-border cursor-pointer accent-primary"
                    />
                    <span className="text-sm">{goal.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={loading || selectedGoals.length === 0}
              >
                {loading ? 'Saving...' : 'Continue to Dashboard'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard')}
              >
                Skip
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
