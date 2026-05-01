# Today View Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Caldelo Today View — the app home screen — wiring five existing display components together with a new FamilyNoteCard, Server Actions, a loading skeleton, and a server-side data-fetching page.

**Architecture:** `app/(app)/today/page.tsx` is an async Server Component that fetches all data in parallel and redirects unauthenticated/un-onboarded users. It passes data and Server Actions to `TodayView.tsx`, a Client Component that handles pull-to-refresh and renders all sub-components. Mutations route through Server Actions in `app/(app)/today/actions.ts` which call existing helpers and call `revalidatePath('/today')`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Supabase (server SSR client + browser client for realtime), Tailwind v4.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `lib/db/helpers.ts` | Add `category` to `Task` type; add `SchoolRunTasks` type + `getSchoolRunTasks()` |
| Create | `app/(app)/today/actions.ts` | Server Actions wrapping helpers |
| Create | `app/(app)/today/date-utils.ts` | Pure `formatDateString` helper (extractable for tests) |
| Create | `app/(app)/today/loading.tsx` | Skeleton loading state shown by Next.js during server render |
| Create | `app/(app)/today/page.tsx` | Async Server Component: auth guard + parallel data fetch |
| Create | `components/today/FamilyNoteCard.tsx` | Realtime shared note card |
| Create | `components/today/TodayView.tsx` | Client wrapper: pull-to-refresh + renders all sub-components |
| Create | `__tests__/today-date-utils.test.ts` | Tests for `formatDateString` |

**Do not touch:** All five existing today components (TodayHeader, DropoffPickupCard, TodayEventsList, UrgentReminders, OverdueItems), layout.tsx, or any file outside the above list.

---

## Task 1: Update helpers.ts — add `category` to Task, add `getSchoolRunTasks`

**Files:**
- Modify: `lib/db/helpers.ts`

The `Task` type is missing `category`. `DropoffPickupCard` needs to know which task is drop-off and which is pick-up. We query by `category IN ('school-dropoff', 'school-pickup')` and `due_date = today`.

- [ ] **Step 1: Add `category` to the `Task` type**

In `lib/db/helpers.ts`, find the `Task` type (lines 20–29) and add the `category` field:

```typescript
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
```

- [ ] **Step 2: Add the `SchoolRunTasks` type and `getSchoolRunTasks` function**

After the `getHouseholdMembers` function (end of file), add:

```typescript
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
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors relating to `Task` or `SchoolRunTasks`.

- [ ] **Step 4: Commit**

```bash
git add lib/db/helpers.ts
git commit -m "feat: add category to Task type and getSchoolRunTasks helper"
```

---

## Task 2: Write and test `formatDateString`

**Files:**
- Create: `app/(app)/today/date-utils.ts`
- Create: `__tests__/today-date-utils.test.ts`

`formatDateString` must produce "Tuesday, 30 April" — day name, comma, day number (no leading zero), month name. This is the only pure logic in the feature worth unit testing.

- [ ] **Step 1: Write the failing test**

Create `__tests__/today-date-utils.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { formatDateString } from '../app/(app)/today/date-utils'

describe('formatDateString', () => {
  it('formats a Wednesday in January with no leading zero', () => {
    // 2026-01-07 is a Wednesday
    expect(formatDateString(new Date('2026-01-07T12:00:00'))).toBe('Wednesday, 7 January')
  })

  it('formats a Tuesday in April', () => {
    // 2026-04-28 is a Tuesday
    expect(formatDateString(new Date('2026-04-28T12:00:00'))).toBe('Tuesday, 28 April')
  })

  it('formats a single-digit day without a leading zero', () => {
    // 2026-03-01 is a Sunday
    expect(formatDateString(new Date('2026-03-01T12:00:00'))).toBe('Sunday, 1 March')
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npx vitest run __tests__/today-date-utils.test.ts
```

Expected: FAIL — `Cannot find module '../app/(app)/today/date-utils'`

- [ ] **Step 3: Create `app/(app)/today/date-utils.ts`**

```typescript
/**
 * Formats a Date as "Tuesday, 30 April" — day name, comma, day number, month name.
 * Uses en-GB locale so month/day names are English.
 */
export function formatDateString(date: Date): string {
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' })
  const day = date.getDate()
  const month = date.toLocaleDateString('en-GB', { month: 'long' })
  return `${weekday}, ${day} ${month}`
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run __tests__/today-date-utils.test.ts
```

Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add app/(app)/today/date-utils.ts __tests__/today-date-utils.test.ts
git commit -m "feat: add formatDateString utility with tests"
```

---

## Task 3: Create Server Actions

**Files:**
- Create: `app/(app)/today/actions.ts`

All mutations from the Today View route through these Server Actions. Each calls a helper and then calls `revalidatePath('/today')` so the server refetches fresh data on next navigation.

- [ ] **Step 1: Create `app/(app)/today/actions.ts`**

```typescript
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/(app)/today/actions.ts
git commit -m "feat: add Today View server actions"
```

---

## Task 4: Create `FamilyNoteCard`

**Files:**
- Create: `components/today/FamilyNoteCard.tsx`

The note card must:
- Show a shared textarea, placeholder "Add a note for today..."
- Subscribe to Supabase realtime changes on `daily_notes` filtered by `household_id` so both partners see updates instantly
- Write via a debounced (1 s) call to `upsertDailyNoteAction` to avoid flooding the server on every keystroke
- Clean up the realtime subscription on unmount

- [ ] **Step 1: Create `components/today/FamilyNoteCard.tsx`**

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/browser'
import { upsertDailyNoteAction } from '@/app/(app)/today/actions'

type FamilyNoteCardProps = {
  householdId: string
  date: string
  initialContent: string
}

export function FamilyNoteCard({ householdId, date, initialContent }: FamilyNoteCardProps) {
  const [content, setContent] = useState(initialContent)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel(`daily-notes-${householdId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'daily_notes',
          filter: `household_id=eq.${householdId}`,
        },
        (payload) => {
          const record = payload.new as { content?: string }
          if (typeof record.content === 'string') {
            setContent(record.content)
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [householdId])

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value
    setContent(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      upsertDailyNoteAction(householdId, date, value)
    }, 1000)
  }

  return (
    <div className="bg-white rounded-card shadow-sm mx-4 mb-3 p-4">
      <p className="text-xs font-semibold text-caldelo-muted uppercase tracking-wide mb-3">
        Family note
      </p>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Add a note for today..."
        rows={3}
        className="w-full resize-none text-sm text-caldelo-ink placeholder:text-caldelo-muted bg-transparent outline-none leading-relaxed"
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/today/FamilyNoteCard.tsx
git commit -m "feat: add FamilyNoteCard with realtime sync"
```

---

## Task 5: Create `TodayView` client wrapper

**Files:**
- Create: `components/today/TodayView.tsx`

`TodayView` is the single Client Component boundary between the Server page and all the interactive sub-components. It:
- Receives all pre-fetched server data as props
- Provides Server Action callbacks to each sub-component
- Handles pull-to-refresh: tracks touch Y delta, calls `router.refresh()` when the user pulls down ≥ 60 px from the top, and shows a spinner during the refresh
- Stacks the components in the specified order: header → urgent reminders → drop-off/pickup → events → family note → overdue items

- [ ] **Step 1: Create `components/today/TodayView.tsx`**

```typescript
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/today/TodayView.tsx
git commit -m "feat: add TodayView client wrapper with pull-to-refresh"
```

---

## Task 6: Create `loading.tsx` skeleton

**Files:**
- Create: `app/(app)/today/loading.tsx`

Next.js automatically shows this file while `page.tsx` is rendering on the server (React Suspense boundary). The skeleton should visually approximate the real layout — header, drop-off/pickup card, events card, note card — using pulsing grey blocks.

- [ ] **Step 1: Create `app/(app)/today/loading.tsx`**

```typescript
function Skel({ className }: { className?: string }) {
  return (
    <div className={`bg-caldelo-border rounded-lg animate-pulse ${className ?? ''}`} />
  )
}

export default function TodayLoading() {
  return (
    <div className="min-h-screen bg-caldelo-white">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <Skel className="w-48 h-7" />
          <Skel className="w-28 h-4" />
        </div>
        <div className="flex -space-x-2">
          <Skel className="w-8 h-8 !rounded-full" />
          <Skel className="w-8 h-8 !rounded-full" />
        </div>
      </div>
      {/* Cards */}
      <div className="pt-3 px-4 flex flex-col gap-3">
        <Skel className="w-full h-28 !rounded-[14px]" />
        <Skel className="w-full h-44 !rounded-[14px]" />
        <Skel className="w-full h-24 !rounded-[14px]" />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/(app)/today/loading.tsx
git commit -m "feat: add Today View loading skeleton"
```

---

## Task 7: Create `page.tsx`

**Files:**
- Create: `app/(app)/today/page.tsx`

The Server Component entry point. Responsibilities:
1. `getCurrentUser()` — redirect to `/signin` if null
2. `getCurrentHousehold(user.id)` — redirect to `/onboarding` if null
3. Compute today's date string once (avoids hydration mismatch)
4. Fetch all six data sources in parallel with `Promise.all`
5. Render `<TodayView>` passing everything as props

- [ ] **Step 1: Create `app/(app)/today/page.tsx`**

```typescript
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

  const today = new Date().toISOString().split('T')[0]

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
      dateString={formatDateString(new Date())}
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
```

- [ ] **Step 2: Run full test suite**

```bash
npx vitest run
```

Expected: all tests pass (the date-utils tests from Task 2 should still be green).

- [ ] **Step 3: Commit**

```bash
git add app/(app)/today/page.tsx
git commit -m "feat: add Today View server page with parallel data fetch"
```

---

## Task 8: Build check and final commit

**Files:** none new — verify the build is clean.

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: exits 0. No TypeScript errors, no missing imports, no "use client" / "use server" boundary violations.

If the build fails:
- `Type error: ...` → fix the TypeScript error in the indicated file
- `Error: createClient is not a function` → check that `lib/supabase/browser.ts` is imported in FamilyNoteCard (not the server client)
- `Error: Server Actions must be async functions` → ensure every export in `actions.ts` is `async`
- `Module not found: @/components/today/TodayView` → confirm the file path matches exactly

- [ ] **Step 2: Push to GitHub**

```bash
git push
```

Expected: branch pushed, all commits visible on remote.

---

## Self-Review

**Spec coverage check:**

| Requirement | Covered by |
|-------------|-----------|
| TodayHeader — warm date, household name, avatar circles | Existing component; wired in TodayView |
| DropoffPickupCard — two slots, assign/reassign | Existing component; school runs from Task 1 helper |
| TodayEventsList — events, category colours, EventDetailSheet | Existing component; wired in TodayView |
| UrgentReminders — amber card, dismiss | Existing component; wired in TodayView |
| FamilyNoteCard — textarea, realtime sync | Task 4 |
| OverdueItems — Done/Today actions | Existing component; wired in TodayView |
| page.tsx — server fetch, auth guard, realtime, pull-to-refresh | Tasks 3, 5, 7 |
| loading.tsx skeleton | Task 6 |
| Bottom nav (Today/Calendar/Balance/Reminders) | Already built in `app/(app)/layout.tsx` — untouched |
| FAB quick-add stub | Already built in `app/(app)/layout.tsx` — untouched |
| `npm run build` zero errors | Task 8 |
| Commit and push | Task 8 |

**Type consistency check:**
- `SchoolRunTasks` defined in `lib/db/helpers.ts` (Task 1), imported in `TodayView.tsx` (Task 5) and `page.tsx` (Task 7) — consistent
- `TodayViewProps` uses `SchoolRunTasks` for `schoolRuns` — consistent with how `page.tsx` passes `schoolRuns`
- `DailyNote | null` for `dailyNote` — consistent across helpers, TodayView, page
- `dismissReminderAction(id: string)` matches `onDismiss: (id: string) => Promise<void>` in UrgentReminders — consistent
- `assignDropoffPickupAction(taskId, ownerId)` matches `onReassign: (taskId: string, ownerId: string | null) => Promise<void>` in DropoffPickupCard — consistent
- `markTaskCompleteAction(taskId)` + `moveTaskToTodayAction(taskId)` match OverdueItems `onMarkDone` / `onMoveToToday` — consistent

**No placeholders found.**
