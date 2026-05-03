'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/browser'
import type { HouseholdMember, Task, TodayEvent } from '@/lib/db/helpers'
import { BottomSheet } from '@/components/ui/BottomSheet'
import { ReassignSheet } from './ReassignSheet'

const OWNER_COLORS = ['#4A7C59', '#5C7A9E', '#C27B6A']

type AssignTarget = { kind: 'event' | 'task'; id: string; title: string }

type Item = { id: string; title: string; kind: 'event' | 'task' }

export type LoadBalanceProps = {
  members: HouseholdMember[]
  weekEvents: TodayEvent[]
  weekTasks: Task[]
  recurringTasks: Task[]
  unresolvedTasks: Task[]
}

export function LoadBalanceDashboard({
  members,
  weekEvents,
  weekTasks,
  recurringTasks,
  unresolvedTasks,
}: LoadBalanceProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [assignTarget, setAssignTarget] = useState<AssignTarget | null>(null)
  const [reassignOpen, setReassignOpen] = useState(false)

  // ── Split computation ─────────────────────────────────────────────────────
  const allItems = [
    ...weekEvents.map(e => ({ owner_id: e.owner_id })),
    ...weekTasks.map(t => ({ owner_id: t.owner_id })),
  ]
  const total = allItems.length
  const memberCounts = members.map(m => ({
    member: m,
    count: allItems.filter(i => i.owner_id === m.id).length,
  }))
  const assignedCount = memberCounts.reduce((s, c) => s + c.count, 0)
  const unassignedCount = total - assignedCount

  // ── Who owns what ─────────────────────────────────────────────────────────
  const unassignedItems: AssignTarget[] = [
    ...weekEvents
      .filter(e => e.owner_id === null)
      .map(e => ({ kind: 'event' as const, id: e.id, title: e.title })),
    ...weekTasks
      .filter(t => t.owner_id === null)
      .map(t => ({ kind: 'task' as const, id: t.id, title: t.title })),
  ]

  const byMember = members.map((m, i) => ({
    member: m,
    color: OWNER_COLORS[i] ?? '#B0ACA6',
    items: [
      ...weekEvents
        .filter(e => e.owner_id === m.id)
        .map((e): Item => ({ id: e.id, title: e.title, kind: 'event' })),
      ...weekTasks
        .filter(t => t.owner_id === m.id)
        .map((t): Item => ({ id: t.id, title: t.title, kind: 'task' })),
    ],
  }))

  // ── Mutations ─────────────────────────────────────────────────────────────
  function assign(target: AssignTarget, ownerId: string) {
    startTransition(async () => {
      const supabase = createClient()
      const table = target.kind === 'event' ? 'events' : 'tasks'
      await supabase.from(table).update({ owner_id: ownerId }).eq('id', target.id)
      router.refresh()
      setAssignTarget(null)
    })
  }

  function markDone(taskId: string) {
    startTransition(async () => {
      const supabase = createClient()
      await supabase.from('tasks').update({ completed: true }).eq('id', taskId)
      router.refresh()
    })
  }

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* ── Section 1: This week's split ─────────────────────────────────── */}
      <section className="px-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-caldelo-muted mb-3">
          This week&apos;s split
        </p>

        {total === 0 ? (
          <p className="text-sm text-caldelo-muted">Nothing scheduled this week.</p>
        ) : (
          <>
            <div className="flex gap-3 mb-3">
              {memberCounts.map(({ member, count }, i) => {
                const pct = assignedCount > 0 ? Math.round((count / assignedCount) * 100) : 0
                return (
                  <div key={member.id} className="flex-1 bg-caldelo-surface rounded-card p-4">
                    <p className="text-xs font-semibold text-caldelo-secondary">{member.first_name}</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: OWNER_COLORS[i] ?? '#B0ACA6' }}>
                      {count}
                    </p>
                    <p className="text-xs text-caldelo-muted mt-0.5">{pct}% of load</p>
                  </div>
                )
              })}
              {unassignedCount > 0 && (
                <div className="flex-1 bg-[#FFFBEB] border border-[#FDE68A] rounded-card p-4">
                  <p className="text-xs font-semibold text-[#92400E]">Unassigned</p>
                  <p className="text-3xl font-bold mt-1 text-[#D97706]">{unassignedCount}</p>
                  <p className="text-xs text-[#92400E] mt-0.5">need owner</p>
                </div>
              )}
            </div>

            {assignedCount > 0 && members.length >= 2 && (
              <div className="h-3 rounded-full overflow-hidden flex">
                {memberCounts.map(({ member, count }, i) => {
                  const pct = Math.round((count / assignedCount) * 100)
                  if (pct === 0) return null
                  return (
                    <div
                      key={member.id}
                      className="h-full"
                      style={{ width: `${pct}%`, backgroundColor: OWNER_COLORS[i] ?? '#B0ACA6' }}
                    />
                  )
                })}
              </div>
            )}
          </>
        )}
      </section>

      {/* ── Section 2: Who owns what ─────────────────────────────────────── */}
      <section className="px-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-caldelo-muted mb-3">
          Who owns what
        </p>

        {unassignedItems.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-[#92400E] mb-2">Tap to assign</p>
            <div className="flex flex-col gap-1.5">
              {unassignedItems.map(item => (
                <button
                  key={`${item.kind}-${item.id}`}
                  type="button"
                  disabled={isPending}
                  onClick={() => setAssignTarget(item)}
                  className="w-full text-left bg-[#FFFBEB] border border-[#FDE68A] rounded-card px-4 py-3 flex items-center justify-between min-h-[52px] disabled:opacity-60"
                >
                  <span className="text-sm font-medium text-caldelo-ink flex-1 min-w-0 pr-2 truncate">
                    {item.title}
                  </span>
                  <span className="text-xs font-semibold text-[#D97706] flex-shrink-0">Assign →</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {byMember.map(({ member, color, items }) => (
          <div key={member.id} className="mb-4 last:mb-0">
            <div className="flex items-center gap-2 mb-1.5">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                style={{ backgroundColor: color }}
              >
                {member.first_name.charAt(0).toUpperCase()}
              </div>
              <p className="text-xs font-semibold text-caldelo-secondary">
                {member.first_name} · {items.length} items
              </p>
            </div>
            {items.length === 0 ? (
              <p className="text-xs text-caldelo-muted pl-7">Nothing assigned yet</p>
            ) : (
              <div className="flex flex-col gap-1 pl-7">
                {items.map(item => (
                  <div key={`${item.kind}-${item.id}`} className="bg-caldelo-surface rounded-[10px] px-3 py-2.5">
                    <p className="text-sm text-caldelo-ink">{item.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ── Section 3: Recurring responsibilities ───────────────────────── */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-caldelo-muted">
            Recurring responsibilities
          </p>
          <button
            type="button"
            onClick={() => setReassignOpen(true)}
            className="text-xs font-semibold text-caldelo-green"
          >
            Review split
          </button>
        </div>

        {recurringTasks.length === 0 ? (
          <p className="text-sm text-caldelo-muted">No recurring tasks yet.</p>
        ) : (
          <div className="flex flex-col gap-1.5">
            {recurringTasks.map(task => {
              const ownerIdx = members.findIndex(m => m.id === task.owner_id)
              const owner = ownerIdx >= 0 ? members[ownerIdx] : null
              return (
                <div
                  key={task.id}
                  className="bg-caldelo-surface rounded-card px-4 py-3 flex items-center justify-between min-h-[52px]"
                >
                  <span className="text-sm text-caldelo-ink flex-1 min-w-0 truncate pr-3">
                    {task.title}
                  </span>
                  {owner ? (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: OWNER_COLORS[ownerIdx] ?? '#B0ACA6' }}
                    >
                      {owner.first_name.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <span className="text-xs text-caldelo-muted flex-shrink-0">Unassigned</span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Section 4: Unresolved jobs ───────────────────────────────────── */}
      {unresolvedTasks.length > 0 && (
        <section className="px-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-caldelo-muted mb-3">
            Unresolved jobs
          </p>
          <div className="flex flex-col gap-1.5">
            {unresolvedTasks.map(task => (
              <div
                key={task.id}
                className="bg-caldelo-surface rounded-card px-4 py-3 flex items-center gap-3 min-h-[52px]"
              >
                <span className="text-sm text-caldelo-ink flex-1 min-w-0 truncate">{task.title}</span>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => setAssignTarget({ kind: 'task', id: task.id, title: task.title })}
                  className="text-xs font-semibold text-caldelo-blue flex-shrink-0 disabled:opacity-40"
                >
                  Assign
                </button>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => markDone(task.id)}
                  className="text-xs font-semibold text-caldelo-green flex-shrink-0 disabled:opacity-40"
                >
                  Done
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Assign bottom sheet ──────────────────────────────────────────── */}
      <BottomSheet
        isOpen={assignTarget !== null}
        onClose={() => setAssignTarget(null)}
        title="Assign to"
      >
        <div className="flex flex-col gap-2 py-2">
          {members.map((m, i) => (
            <button
              key={m.id}
              type="button"
              disabled={isPending}
              onClick={() => assignTarget && assign(assignTarget, m.id)}
              className="w-full h-12 rounded-card flex items-center gap-3 px-4 text-sm font-medium text-caldelo-ink bg-caldelo-surface disabled:opacity-60"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: OWNER_COLORS[i] ?? '#B0ACA6' }}
              >
                {m.first_name.charAt(0).toUpperCase()}
              </div>
              {m.first_name}
            </button>
          ))}
        </div>
      </BottomSheet>

      {/* ── ReassignSheet ────────────────────────────────────────────────── */}
      <ReassignSheet
        isOpen={reassignOpen}
        onClose={() => setReassignOpen(false)}
        recurringTasks={recurringTasks}
        members={members}
      />
    </div>
  )
}
