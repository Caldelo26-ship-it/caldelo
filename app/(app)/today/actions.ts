'use server'

import { revalidatePath } from 'next/cache'
import {
  dismissReminder,
  assignDropoffPickup,
  markTaskComplete,
  moveTaskToToday,
  upsertDailyNote,
} from '@/lib/db/helpers'

export async function dismissReminderAction(id: string): Promise<void> {
  await dismissReminder(id)
  revalidatePath('/today')
}

export async function assignDropoffPickupAction(
  taskId: string,
  ownerId: string | null,
): Promise<void> {
  await assignDropoffPickup(taskId, ownerId)
  revalidatePath('/today')
}

export async function markTaskCompleteAction(taskId: string): Promise<void> {
  await markTaskComplete(taskId)
  revalidatePath('/today')
}

export async function moveTaskToTodayAction(taskId: string): Promise<void> {
  await moveTaskToToday(taskId)
  revalidatePath('/today')
}

export async function upsertDailyNoteAction(
  householdId: string,
  date: string,
  content: string,
): Promise<void> {
  await upsertDailyNote(householdId, date, content)
  // No revalidatePath — realtime handles the other partner's UI update
}
