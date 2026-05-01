import { redirect } from 'next/navigation'
import { getCurrentUser, getCurrentHousehold } from '@/lib/auth/helpers'
import { getHouseholdMembers } from '@/lib/db/helpers'
import { CalendarView } from '@/components/calendar/CalendarView'

export default async function CalendarPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/signin')

  const household = await getCurrentHousehold(user.id)
  if (!household) redirect('/onboarding')

  const members = await getHouseholdMembers(household.id)

  return (
    <div className="min-h-screen bg-caldelo-white">
      <div className="pt-4">
        <CalendarView householdId={household.id} members={members} />
      </div>
    </div>
  )
}
