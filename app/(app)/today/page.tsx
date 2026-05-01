export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { getCurrentUser, getCurrentHousehold } from '@/lib/auth/helpers'
import {
  getEventsForToday,
  getUrgentReminders,
  getOverdueTasks,
  getHouseholdMembers,
  getDailyNote,
  getSchoolRunTasks,
} from '@/lib/db/helpers'
import { TodayView } from '@/components/today/TodayView'
import { formatDateString } from './date-utils'

export default async function TodayPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/signin')

  const household = await getCurrentHousehold(user.id)
  if (!household) redirect('/onboarding')

  const now = new Date()
  const today = now.toISOString().split('T')[0]

  const [events, reminders, overdueTasks, members, schoolRuns, dailyNote] = await Promise.all([
    getEventsForToday(household.id),
    getUrgentReminders(household.id),
    getOverdueTasks(household.id),
    getHouseholdMembers(household.id),
    getSchoolRunTasks(household.id),
    getDailyNote(household.id, today),
  ])

  return (
    <TodayView
      dateString={formatDateString(now)}
      householdName={household.name}
      householdId={household.id}
      members={members}
      events={events}
      reminders={reminders}
      overdueTasks={overdueTasks}
      schoolRuns={schoolRuns}
      dailyNote={dailyNote}
      today={today}
    />
  )
}
