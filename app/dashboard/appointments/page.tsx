'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, Clock, Video, MapPin, FileText } from 'lucide-react'

const MOCK_APPOINTMENTS = [
  {
    id: 1,
    therapistName: 'Dr. Sarah Mitchell',
    specializations: ['Anxiety', 'Depression'],
    date: 'Tomorrow',
    time: '2:00 PM',
    duration: '60 min',
    status: 'scheduled',
    meetLink: 'https://meet.google.com/xyz-abc',
    notes: 'Discuss coping strategies for workplace anxiety',
  },
  {
    id: 2,
    therapistName: 'Dr. James Chen',
    specializations: ['Trauma', 'PTSD'],
    date: 'Friday, March 15',
    time: '3:30 PM',
    duration: '90 min',
    status: 'scheduled',
    meetLink: 'https://meet.google.com/abc-xyz',
    notes: 'EMDR session',
  },
]

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const handleCancel = async (appointmentId: number) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return

    setAppointments(
      appointments.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
      )
    )
  }

  const upcomingAppointments = appointments.filter((apt) => apt.status === 'scheduled')
  const pastAppointments = appointments.filter((apt) => apt.status !== 'scheduled')

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Sessions</h1>
        <p className="text-muted-foreground">Manage your therapy appointments and sessions</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 flex gap-4">
        <Link href="/dashboard/therapists">
          <Button>Book New Session</Button>
        </Link>
      </div>

      {/* Upcoming Appointments */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Sessions</h2>
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <Card
                key={appointment.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() =>
                  setExpandedId(expandedId === appointment.id ? null : appointment.id)
                }
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{appointment.therapistName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {appointment.specializations.join(', ')}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Scheduled
                  </span>
                </div>

                {/* Appointment Details */}
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{appointment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">{appointment.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video size={18} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{appointment.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Expandable Details */}
                {expandedId === appointment.id && (
                  <div className="mt-6 pt-6 border-t border-border space-y-4">
                    {appointment.notes && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <FileText size={18} className="text-muted-foreground" />
                          <p className="font-medium">Notes</p>
                        </div>
                        <p className="text-muted-foreground text-sm">{appointment.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <a href={appointment.meetLink} target="_blank" rel="noopener noreferrer">
                        <Button className="flex gap-2">
                          <Video size={18} />
                          Join Video Call
                        </Button>
                      </a>
                      <Button
                        variant="outline"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        Cancel Session
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Calendar size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Upcoming Sessions</h3>
            <p className="text-muted-foreground mb-6">
              Book your first therapy session to get started
            </p>
            <Link href="/dashboard/therapists">
              <Button>Browse Therapists</Button>
            </Link>
          </Card>
        )}
      </div>

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Past Sessions</h2>
          <div className="space-y-4">
            {pastAppointments.map((appointment) => (
              <Card key={appointment.id} className="p-6 opacity-75">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{appointment.therapistName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {appointment.date} at {appointment.time}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                    Cancelled
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
