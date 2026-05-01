import { createClient } from '@/lib/supabase/server'

export type TodayEvent = {
  id: string
  title: string
  category: string
  starts_at: string
  ends_at: string | null
  owner_id: string | null
  completed: boolean
}

export type Reminder = {
  id: string
  title: string
  scheduled_for: string
  is_dismissed: boolean
}

export type Task = {
  id: string
  title: string
  due_date: string | null
  owner_id: string | null
  completed: boolean
  notes: string | null
  household_id: string
  category: string | null
}

export type HouseholdMember = {
  id: string
  household_id: string
  first_name: string
  role: string
}

export type DailyNote = {
  id: string
  household_id: string
  date: string
  content: string
}

/** Returns today's date as 'YYYY-MM-DD'. */
function getToday(): string {
  return new Date().toISOString().split('T')[0]
}

/** Returns tomorrow's date as 'YYYY-MM-DD'. */
function getTomorrow(): string {
  return new Date(Date.now() + 86400000).toISOString().split('T')[0]
}

/**
 * Fetches all events for the given household that start today.
 * Returns [] if the table doesn't exist yet.
 */
export async function getEventsForToday(householdId: string): Promise<TodayEvent[]> {
  const supabase = await createClient()
  const today = getToday()
  const tomorrow = getTomorrow()

  const { data, error } = await supabase
    .from('events')
    .select('id,title,category,starts_at,ends_at,owner_id,completed')
    .eq('household_id', householdId)
    .gte('starts_at', today)
    .lt('starts_at', tomorrow)
    .order('starts_at', { ascending: true })

  if (error) return []
  return (data ?? []) as TodayEvent[]
}

/**
 * Fetches undismissed reminders scheduled for today or earlier.
 * Returns [] if the table doesn't exist yet.
 */
export async function getUrgentReminders(householdId: string): Promise<Reminder[]> {
  const supabase = await createClient()
  const today = getToday()

  const { data, error } = await supabase
    .from('reminders')
    .select('id,title,scheduled_for,is_dismissed')
    .eq('household_id', householdId)
    .eq('is_dismissed', false)
    .lte('scheduled_for', today)
    .order('scheduled_for', { ascending: true })

  if (error) return []
  return (data ?? []) as Reminder[]
}

/**
 * Fetches incomplete tasks with a due_date in the past.
 * Returns [] if the table doesn't exist yet or has no matching rows.
 */
export async function getOverdueTasks(householdId: string): Promise<Task[]> {
  const supabase = await createClient()
  const today = getToday()

  const { data, error } = await supabase
    .from('tasks')
    .select('id,title,due_date,owner_id,completed,notes,household_id')
    .eq('household_id', householdId)
    .eq('completed', false)
    .lt('due_date', today)
    .not('due_date', 'is', null)
    .order('due_date', { ascending: true })

  if (error) return []
  return (data ?? []) as Task[]
}

/**
 * Fetches the daily note for the given household and date (YYYY-MM-DD).
 * Returns null if none exists or on error.
 */
export async function getDailyNote(
  householdId: string,
  date: string,
): Promise<DailyNote | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('daily_notes')
    .select('id,household_id,date,content')
    .eq('household_id', householdId)
    .eq('date', date)
    .maybeSingle()

  if (error) return null
  return (data as DailyNote | null) ?? null
}

/**
 * Creates or updates the daily note for the given household and date.
 * Errors are silently ignored.
 */
export async function upsertDailyNote(
  householdId: string,
  date: string,
  content: string,
): Promise<void> {
  const supabase = await createClient()

  await supabase
    .from('daily_notes')
    .upsert({ household_id: householdId, date, content }, { onConflict: 'household_id,date' })
}

/**
 * Marks a reminder as dismissed. Errors are silently ignored.
 */
export async function dismissReminder(reminderId: string): Promise<void> {
  const supabase = await createClient()

  await supabase.from('reminders').update({ is_dismissed: true }).eq('id', reminderId)
}

/**
 * Marks a task as complete.
 */
export async function markTaskComplete(taskId: string): Promise<void> {
  const supabase = await createClient()

  await supabase.from('tasks').update({ completed: true }).eq('id', taskId)
}

/**
 * Sets a task's due_date to today, surfacing it in the Today View.
 */
export async function moveTaskToToday(taskId: string): Promise<void> {
  const supabase = await createClient()
  const today = getToday()

  await supabase.from('tasks').update({ due_date: today }).eq('id', taskId)
}

/**
 * Fetches all members of the given household.
 */
export async function getHouseholdMembers(householdId: string): Promise<HouseholdMember[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('household_members')
    .select('id,household_id,first_name,role')
    .eq('household_id', householdId)

  if (error) return []
  return (data ?? []) as HouseholdMember[]
}

/**
 * Assigns (or unassigns) an owner to a task — used for school-run reassignment.
 */
export async function assignDropoffPickup(
  taskId: string,
  ownerId: string | null,
): Promise<void> {
  const supabase = await createClient()

  await supabase.from('tasks').update({ owner_id: ownerId }).eq('id', taskId)
}

export type SchoolRunTasks = {
  dropoff: Task | null
  pickup: Task | null
}

/**
 * Fetches today's school-run tasks for a household.
 * Looks for tasks with category 'school-dropoff' or 'school-pickup' due today.
 */
export async function getSchoolRunTasks(householdId: string): Promise<SchoolRunTasks> {
  const supabase = await createClient()
  const today = getToday()

  const { data, error } = await supabase
    .from('tasks')
    .select('id,title,due_date,owner_id,completed,notes,household_id,category')
    .eq('household_id', householdId)
    .in('category', ['school-dropoff', 'school-pickup'])
    .eq('due_date', today)
    .eq('completed', false)

  if (error) return { dropoff: null, pickup: null }

  const tasks = (data ?? []) as Task[]
  return {
    dropoff: tasks.find((t) => t.category === 'school-dropoff') ?? null,
    pickup: tasks.find((t) => t.category === 'school-pickup') ?? null,
  }
}
