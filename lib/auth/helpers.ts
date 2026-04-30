import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'

export type Household = {
  id: string
  user_id: string
  name: string
  created_at: string
}

/** Returns the authenticated Supabase user, or null if not signed in. */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user ?? null
}

/** Returns the household row for the given user, or null if none exists. */
export async function getCurrentHousehold(userId: string): Promise<Household | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('households')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()
  return (data as Household | null) ?? null
}

/** Returns true if the user has completed onboarding (i.e. has a household). */
export async function isOnboardingComplete(userId: string): Promise<boolean> {
  const household = await getCurrentHousehold(userId)
  return household !== null
}

/** Signs out the current user and redirects to the homepage. */
export async function signOut(): Promise<never> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
