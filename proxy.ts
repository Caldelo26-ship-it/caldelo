import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PROTECTED_PREFIXES = [
  '/today',
  '/calendar',
  '/balance',
  '/reminders',
  '/settings',
  '/onboarding',
]

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Write to request so downstream code sees refreshed tokens
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          // Rebuild response so the refreshed cookies reach the browser
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // getUser() both validates and refreshes the session via cookies
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isProtected = PROTECTED_PREFIXES.some((prefix) => path.startsWith(prefix))

  if (isProtected && !user) {
    const signIn = new URL('/signin', request.url)
    signIn.searchParams.set('next', path)
    return NextResponse.redirect(signIn)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:ico|png|jpg|svg|webp)$).*)'],
}
