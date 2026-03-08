import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { moodScore, energyScore, notes } = await req.json()

    // Validation
    if (typeof moodScore !== 'number' || moodScore < 0 || moodScore > 100) {
      return NextResponse.json(
        { message: 'Mood score must be between 0 and 100' },
        { status: 400 }
      )
    }

    if (typeof energyScore !== 'number' || energyScore < 0 || energyScore > 100) {
      return NextResponse.json(
        { message: 'Energy score must be between 0 and 100' },
        { status: 400 }
      )
    }

    // In a real app, you would:
    // 1. Get the current user from session/token
    // 2. Insert mood log entry into Supabase
    // 3. Update user's mood_score if needed

    return NextResponse.json(
      { message: 'Mood logged successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Mood logging error:', error)
    return NextResponse.json(
      { message: 'Failed to log mood' },
      { status: 500 }
    )
  }
}
