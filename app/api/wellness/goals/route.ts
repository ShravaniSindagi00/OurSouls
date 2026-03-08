import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { goals } = await req.json()

    if (!Array.isArray(goals) || goals.length === 0) {
      return NextResponse.json(
        { message: 'At least one wellness goal is required' },
        { status: 400 }
      )
    }

    // In a real app, you would:
    // 1. Get the current user from session/token
    // 2. Update user's wellness_goals in Supabase

    return NextResponse.json(
      { message: 'Wellness goals saved successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Wellness goals error:', error)
    return NextResponse.json(
      { message: 'Failed to save wellness goals' },
      { status: 500 }
    )
  }
}
