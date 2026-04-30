import { NextResponse } from 'next/server'
import { isValidEmail } from '@/lib/waitlist'
import { createServerSupabase } from '@/lib/supabase-server'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (
    typeof body !== 'object' ||
    body === null ||
    !('email' in body) ||
    typeof (body as Record<string, unknown>).email !== 'string'
  ) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const email = ((body as Record<string, string>).email).trim().toLowerCase()

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const supabase = createServerSupabase()

  const { error } = await supabase
    .from('waitlist')
    .insert({ email, source: 'homepage' })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ success: true })
    }
    console.error('Waitlist insert error:', error)
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
