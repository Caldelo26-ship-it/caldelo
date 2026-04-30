import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type') as 'magiclink' | 'email' | 'recovery' | null

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        },
      },
    },
  )

  let sessionError: string | null = null

  if (code) {
    // PKCE flow — OAuth or magic link
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) sessionError = error.message
  } else if (tokenHash && type) {
    // OTP / email verification flow
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type })
    if (error) sessionError = error.message
  } else {
    sessionError = 'missing_code'
  }

  if (sessionError) {
    return NextResponse.redirect(
      new URL(`/signin?error=${encodeURIComponent(sessionError)}`, origin),
    )
  }

  // Resolve the user after session is established
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.redirect(new URL('/signin?error=no_user', origin))
  }

  // Decide where to send the user based on onboarding state
  const { data: household } = await supabase
    .from('households')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle()

  const destination = household ? '/today' : '/onboarding'
  return NextResponse.redirect(new URL(destination, origin))
}
