'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, MoreVertical, Mail, Calendar } from 'lucide-react'

const MOCK_USERS = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    email: 'sarah@example.com',
    joinDate: '2024-01-15',
    mood: 85,
    status: 'active',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: '2024-02-20',
    mood: 72,
    status: 'active',
  },
  {
    id: 3,
    name: 'Maria Garcia',
    email: 'maria@example.com',
    joinDate: '2024-03-10',
    mood: 68,
    status: 'inactive',
  },
]

export default function AdminUsersPage() {
  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage platform users and their accounts</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
          <Input
            placeholder="Search users by name or email..."
            className="pl-10"
          />
        </div>
        <Button>Add User</Button>
      </div>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Name</th>
              <th className="px-6 py-4 text-left font-semibold">Email</th>
              <th className="px-6 py-4 text-left font-semibold">Join Date</th>
              <th className="px-6 py-4 text-left font-semibold">Mood Score</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
              <th className="px-6 py-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-medium">{user.name}</td>
                <td className="px-6 py-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {user.joinDate}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-primary">{user.mood}/100</div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 hover:bg-muted rounded-lg">
                    <MoreVertical size={18} className="text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
