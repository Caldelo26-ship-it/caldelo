'use server'

import { revalidatePath } from 'next/cache'
import { getCurrentUser } from '@/lib/auth/helpers'
import {
  dismissReminder,
  assignDropoffPickup,
  markTaskComplete,
  moveTaskToToday,
  upsertDailyNote,
} from '@/lib/db/helpers'

async function requireAuth(): Promise<void> {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')
}

export async function dismissReminderAction(id: string): Promise<void> {
  await requireAuth()
  await dismissReminder(id)
  revalidatePath('/today')
}

export async function assignDropoffPickupAction(
  taskId: string,
  ownerId: string | null,
): Promise<void> {
  await requireAuth()
  await assignDropoffPickup(taskId, ownerId)
  revalidatePath('/today')
}

export async function markTaskCompleteAction(taskId: string): Promise<void> {
  await requireAuth()
  await markTaskComplete(taskId)
  revalidatePath('/today')
}

export async function moveTaskToTodayAction(taskId: string): Promise<void> {
  await requireAuth()
  await moveTaskToToday(taskId)
  revalidatePath('/today')
}

export async function upsertDailyNoteAction(
  householdId: string,
  date: string,
  content: string,
): Promise<void> {
  await requireAuth()
  await upsertDailyNote(householdId, date, content)
  // No revalidatePath — realtime handles the other partner's UI update
}
