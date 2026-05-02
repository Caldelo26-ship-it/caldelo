'use server'

import { revalidatePath } from 'next/cache'
import { getCurrentUser, getCurrentHousehold } from '@/lib/auth/helpers'
import { createClient } from '@/lib/supabase/server'
import {
  dismissReminder,
  assignDropoffPickup,
  markTaskComplete,
  moveTaskToToday,
  upsertDailyNote,
} from '@/lib/db/helpers'

async function requireAuth(): Promise<{ householdId: string }> {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')
  const household = await getCurrentHousehold(user.id)
  if (!household) throw new Error('Unauthorized')
  return { householdId: household.id }
}

async function verifyTaskOwnership(taskId: string, householdId: string): Promise<void> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('tasks')
    .select('id')
    .eq('id', taskId)
    .eq('household_id', householdId)
    .maybeSingle()
  if (!data) throw new Error('Unauthorized')
}

async function verifyReminderOwnership(reminderId: string, householdId: string): Promise<void> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('reminders')
    .select('id')
    .eq('id', reminderId)
    .eq('household_id', householdId)
    .maybeSingle()
  if (!data) throw new Error('Unauthorized')
}

export async function dismissReminderAction(id: string): Promise<void> {
  const { householdId } = await requireAuth()
  await verifyReminderOwnership(id, householdId)
  await dismissReminder(id)
  revalidatePath('/today')
}

export async function assignDropoffPickupAction(
  taskId: string,
  ownerId: string | null,
): Promise<void> {
  const { householdId } = await requireAuth()
  await verifyTaskOwnership(taskId, householdId)
  await assignDropoffPickup(taskId, ownerId)
  revalidatePath('/today')
}

export async function markTaskCompleteAction(taskId: string): Promise<void> {
  const { householdId } = await requireAuth()
  await verifyTaskOwnership(taskId, householdId)
  await markTaskComplete(taskId)
  revalidatePath('/today')
}

export async function moveTaskToTodayAction(taskId: string): Promise<void> {
  const { householdId } = await requireAuth()
  await verifyTaskOwnership(taskId, householdId)
  await moveTaskToToday(taskId)
  revalidatePath('/today')
}

export async function upsertDailyNoteAction(
  householdId: string,
  date: string,
  content: string,
): Promise<void> {
  const { householdId: authHouseholdId } = await requireAuth()
  if (householdId !== authHouseholdId) throw new Error('Unauthorized')
  await upsertDailyNote(householdId, date, content)
  // No revalidatePath — realtime handles the other partner's UI update
}

async function verifyEventOwnership(eventId: string, householdId: string): Promise<void> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('events')
    .select('id')
    .eq('id', eventId)
    .eq('household_id', householdId)
    .maybeSingle()
  if (!data) throw new Error('Unauthorized')
}

export async function updateEventOwnerAction(
  eventId: string,
  ownerId: string | null,
): Promise<void> {
  const { householdId } = await requireAuth()
  await verifyEventOwnership(eventId, householdId)
  const supabase = await createClient()
  await supabase.from('events').update({ owner_id: ownerId }).eq('id', eventId)
  revalidatePath('/today')
}

export async function updateEventTimeAction(
  eventId: string,
  startsAt: string,
  endsAt: string | null,
): Promise<void> {
  const { householdId } = await requireAuth()
  await verifyEventOwnership(eventId, householdId)
  const supabase = await createClient()
  await supabase
    .from('events')
    .update({ starts_at: startsAt, ends_at: endsAt })
    .eq('id', eventId)
  revalidatePath('/today')
}

export async function deleteEventAction(eventId: string): Promise<void> {
  const { householdId } = await requireAuth()
  await verifyEventOwnership(eventId, householdId)
  const supabase = await createClient()
  await supabase.from('events').delete().eq('id', eventId)
  revalidatePath('/today')
}
