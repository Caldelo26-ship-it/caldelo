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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.next({ request })
  }

  let response = NextResponse.next({ request })

  try {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    })

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
  } catch {
    return NextResponse.next({ request })
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:ico|png|jpg|svg|webp)$).*)'],
}
