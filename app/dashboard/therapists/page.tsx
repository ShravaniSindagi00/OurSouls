'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Star, MapPin, DollarSign, Clock } from 'lucide-react'

const SPECIALIZATIONS = [
  'Anxiety',
  'Depression',
  'Trauma',
  'Relationships',
  'Grief',
  'Stress Management',
  'PTSD',
  'OCD',
  'Eating Disorders',
  'Addiction',
]

const MOCK_THERAPISTS = [
  {
    id: 1,
    name: 'Dr. Sarah Mitchell',
    specializations: ['Anxiety', 'Depression', 'Stress Management'],
    rating: 4.9,
    reviews: 127,
    rate: 120,
    availability: 'Available Today',
    bio: 'Licensed Clinical Psychologist with 15 years of experience in anxiety and depression treatment.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
  {
    id: 2,
    name: 'Dr. James Chen',
    specializations: ['Trauma', 'PTSD', 'Depression'],
    rating: 4.8,
    reviews: 98,
    rate: 150,
    availability: 'Available Tomorrow',
    bio: 'Specialized in trauma-informed therapy and PTSD recovery. Trained in EMDR.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
  },
  {
    id: 3,
    name: 'Dr. Maria Garcia',
    specializations: ['Relationships', 'Grief', 'Life Transitions'],
    rating: 4.7,
    reviews: 156,
    rate: 110,
    availability: 'Available Today',
    bio: 'Expert in relationship counseling and grief support. Compassionate and client-centered approach.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
  },
  {
    id: 4,
    name: 'Dr. Michael Rodriguez',
    specializations: ['Addiction', 'Substance Abuse', 'Mental Health'],
    rating: 4.9,
    reviews: 112,
    rate: 130,
    availability: 'Available in 2 days',
    bio: 'Certified addiction specialist with holistic approach to recovery and wellness.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
  },
]

export default function TherapistsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'rating' | 'price'>('rating')

  const filteredTherapists = MOCK_THERAPISTS.filter((therapist) => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecializations =
      selectedSpecializations.length === 0 ||
      selectedSpecializations.some((spec) => therapist.specializations.includes(spec))

    return matchesSearch && matchesSpecializations
  })

  const sortedTherapists = [...filteredTherapists].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    return a.rate - b.rate
  })

  return (
    <div className="p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Therapist</h1>
        <p className="text-muted-foreground">Browse our network of licensed mental health professionals</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h3 className="font-semibold mb-4">Filters</h3>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Search</label>
              <Input
                type="text"
                placeholder="Therapist name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'price')}
                className="w-full border border-border rounded px-3 py-2"
              >
                <option value="rating">Highest Rated</option>
                <option value="price">Lowest Price</option>
              </select>
            </div>

            {/* Specializations */}
            <div>
              <label className="block text-sm font-medium mb-3">Specializations</label>
              <div className="space-y-2">
                {SPECIALIZATIONS.map((spec) => (
                  <label key={spec} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSpecializations.includes(spec)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSpecializations([...selectedSpecializations, spec])
                        } else {
                          setSelectedSpecializations(selectedSpecializations.filter((s) => s !== spec))
                        }
                      }}
                      className="w-4 h-4 cursor-pointer accent-primary"
                    />
                    <span className="text-sm">{spec}</span>
                  </label>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Therapist List */}
        <div className="lg:col-span-3">
          {sortedTherapists.length > 0 ? (
            <div className="space-y-4">
              {sortedTherapists.map((therapist) => (
                <Card key={therapist.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-6">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <img
                        src={therapist.image}
                        alt={therapist.name}
                        className="w-24 h-24 rounded-lg"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{therapist.name}</h3>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{therapist.rating}</span>
                            <span className="text-sm text-muted-foreground">({therapist.reviews})</span>
                          </div>
                          <p className="text-lg font-bold text-primary mt-1">${therapist.rate}/hr</p>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4">{therapist.bio}</p>

                      {/* Specializations */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {therapist.specializations.map((spec) => (
                          <span
                            key={spec}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      {/* Availability and Action */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock size={16} />
                          <span>{therapist.availability}</span>
                        </div>
                        <Link href={`/dashboard/booking/${therapist.id}`}>
                          <Button>Book Session</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No therapists found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedSpecializations([])
                }}
              >
                Clear Filters
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
