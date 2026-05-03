export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser, getCurrentHousehold } from '@/lib/auth/helpers'
import { getHouseholdMembers } from '@/lib/db/helpers'
import { isPremium } from '@/lib/stripe/client'
import { LoadBalanceDashboard } from '@/components/balance/LoadBalanceDashboard'
import { LoadBalancePreview } from '@/components/balance/LoadBalancePreview'
import type { Task, TodayEvent } from '@/lib/db/helpers'

function getWeekRange(): { start: string; end: string } {
  const now = new Date()
  const dow = (now.getDay() + 6) % 7 // Mon = 0
  const mon = new Date(now)
  mon.setDate(now.getDate() - dow)
  mon.setHours(0, 0, 0, 0)
  const nextMon = new Date(mon)
  nextMon.setDate(mon.getDate() + 7)
  const fmt = (d: Date): string =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  return { start: fmt(mon), end: fmt(nextMon) }
}

export default async function BalancePage() {
  const user = await getCurrentUser()
  if (!user) redirect('/signin')

  const household = await getCurrentHousehold(user.id)
  if (!household) redirect('/onboarding')

  const { start, end } = getWeekRange()
  const supabase = await createClient()

  const [
    members,
    { data: eventsData },
    { data: tasksData },
    { data: recurringData },
    { data: unresolvedData },
    premium,
  ] = await Promise.all([
    getHouseholdMembers(household.id),
    supabase
      .from('events')
      .select('id,title,category,starts_at,ends_at,owner_id,completed')
      .eq('household_id', household.id)
      .gte('starts_at', start)
      .lt('starts_at', end)
      .order('starts_at', { ascending: true }),
    supabase
      .from('tasks')
      .select('id,title,due_date,owner_id,completed,notes,household_id,category')
      .eq('household_id', household.id)
      .eq('completed', false)
      .gte('due_date', start)
      .lt('due_date', end),
    supabase
      .from('tasks')
      .select('id,title,due_date,owner_id,completed,notes,household_id,category')
      .eq('household_id', household.id)
      .eq('completed', false)
      .is('due_date', null),
    supabase
      .from('tasks')
      .select('id,title,due_date,owner_id,completed,notes,household_id,category')
      .eq('household_id', household.id)
      .eq('completed', false)
      .is('owner_id', null)
      .not('due_date', 'is', null),
    isPremium(household.id),
  ])

  const sharedProps = {
    members,
    weekEvents: (eventsData ?? []) as TodayEvent[],
    weekTasks: (tasksData ?? []) as Task[],
    recurringTasks: (recurringData ?? []) as Task[],
    unresolvedTasks: (unresolvedData ?? []) as Task[],
  }

  return (
    <div className="min-h-screen bg-caldelo-white">
      <div className="pt-4">
        <h1 className="font-display text-2xl font-bold text-caldelo-ink px-4 mb-6">
          Load Balance
        </h1>
        {premium ? (
          <LoadBalanceDashboard {...sharedProps} />
        ) : (
          <LoadBalancePreview {...sharedProps} />
        )}
      </div>
    </div>
  )
}
