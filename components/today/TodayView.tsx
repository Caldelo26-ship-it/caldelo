'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TodayHeader } from '@/components/today/TodayHeader'
import { UrgentReminders } from '@/components/today/UrgentReminders'
import { DropoffPickupCard } from '@/components/today/DropoffPickupCard'
import { TodayEventsList } from '@/components/today/TodayEventsList'
import { FamilyNoteCard } from '@/components/today/FamilyNoteCard'
import { OverdueItems } from '@/components/today/OverdueItems'
import {
  dismissReminderAction,
  assignDropoffPickupAction,
  markTaskCompleteAction,
  moveTaskToTodayAction,
} from '@/app/(app)/today/actions'
import type {
  TodayEvent,
  Reminder,
  Task,
  HouseholdMember,
  DailyNote,
  SchoolRunTasks,
} from '@/lib/db/helpers'

export type TodayViewProps = {
  dateString: string
  householdName: string
  householdId: string
  members: HouseholdMember[]
  events: TodayEvent[]
  reminders: Reminder[]
  overdueTasks: Task[]
  schoolRuns: SchoolRunTasks
  dailyNote: DailyNote | null
  today: string
}

const PULL_THRESHOLD = 60

export function TodayView({
  dateString,
  householdName,
  householdId,
  members,
  events,
  reminders,
  overdueTasks,
  schoolRuns,
  dailyNote,
  today,
}: TodayViewProps) {
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)
  const touchStartY = useRef<number | null>(null)

  function handleTouchStart(e: React.TouchEvent) {
    if (window.scrollY === 0) {
      touchStartY.current = e.touches[0].clientY
    }
  }

  async function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartY.current === null) return
    const delta = e.changedTouches[0].clientY - touchStartY.current
    touchStartY.current = null
    if (delta > PULL_THRESHOLD && !refreshing) {
      setRefreshing(true)
      router.refresh()
      setTimeout(() => setRefreshing(false), 1000)
    }
  }

  return (
    <div
      className="min-h-screen bg-caldelo-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {refreshing && (
        <div className="flex justify-center pt-3 pb-1" aria-label="Refreshing">
          <div className="w-5 h-5 rounded-full border-2 border-caldelo-green border-t-transparent animate-spin" />
        </div>
      )}
      <TodayHeader
        dateString={dateString}
        householdName={householdName}
        members={members}
      />
      <div className="pt-3">
        <UrgentReminders reminders={reminders} onDismiss={dismissReminderAction} />
        <DropoffPickupCard
          dropoffTask={schoolRuns.dropoff}
          pickupTask={schoolRuns.pickup}
          members={members}
          onReassign={assignDropoffPickupAction}
        />
        <TodayEventsList events={events} members={members} />
        <FamilyNoteCard
          householdId={householdId}
          date={today}
          initialContent={dailyNote?.content ?? ''}
        />
        <OverdueItems
          tasks={overdueTasks}
          onMarkDone={markTaskCompleteAction}
          onMoveToToday={moveTaskToTodayAction}
        />
      </div>
    </div>
  )
}
