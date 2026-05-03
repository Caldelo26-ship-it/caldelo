'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/browser'
import type { HouseholdMember, Task } from '@/lib/db/helpers'
import { BottomSheet } from '@/components/ui/BottomSheet'

const OWNER_COLORS = ['#4A7C59', '#5C7A9E', '#C27B6A']

type OwnerState = { ownerId: string | null; shared: boolean }

type ReassignSheetProps = {
  isOpen: boolean
  onClose: () => void
  recurringTasks: Task[]
  members: HouseholdMember[]
}

export function ReassignSheet({ isOpen, onClose, recurringTasks, members }: ReassignSheetProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [ownerMap, setOwnerMap] = useState<Record<string, OwnerState>>(() =>
    Object.fromEntries(recurringTasks.map(t => [t.id, { ownerId: t.owner_id, shared: false }]))
  )

  function toggleOwner(taskId: string) {
    if (members.length === 0) return
    setOwnerMap(prev => {
      const cur = prev[taskId] ?? { ownerId: null, shared: false }
      const idx = members.findIndex(m => m.id === cur.ownerId)
      const next = members[(idx + 1) % members.length]!
      return { ...prev, [taskId]: { ...cur, ownerId: next.id } }
    })
  }

  function toggleShared(taskId: string) {
    setOwnerMap(prev => {
      const cur = prev[taskId] ?? { ownerId: null, shared: false }
      return { ...prev, [taskId]: { ownerId: cur.shared ? cur.ownerId : null, shared: !cur.shared } }
    })
  }

  function handleSave() {
    startTransition(async () => {
      const supabase = createClient()
      await Promise.all(
        Object.entries(ownerMap).map(([id, s]) =>
          supabase.from('tasks').update({ owner_id: s.shared ? null : s.ownerId }).eq('id', id)
        )
      )
      router.refresh()
      onClose()
    })
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Recurring responsibilities">
      <div className="flex flex-col gap-1 py-2">
        {recurringTasks.length === 0 ? (
          <p className="text-sm text-caldelo-muted text-center py-6">No recurring tasks yet</p>
        ) : (
          recurringTasks.map(task => {
            const state = ownerMap[task.id] ?? { ownerId: null, shared: false }
            const ownerIdx = members.findIndex(m => m.id === state.ownerId)
            const owner = ownerIdx >= 0 ? members[ownerIdx] : null

            return (
              <div
                key={task.id}
                className="flex items-center gap-3 py-3 border-b border-caldelo-border last:border-0"
              >
                <span className="flex-1 min-w-0 text-sm font-medium text-caldelo-ink truncate">
                  {task.title}
                </span>
                <button
                  type="button"
                  onClick={() => toggleShared(task.id)}
                  className={`h-7 px-2 rounded-pill border text-xs transition-colors flex-shrink-0 ${
                    state.shared
                      ? 'border-caldelo-green bg-caldelo-green text-white'
                      : 'border-caldelo-border text-caldelo-secondary'
                  }`}
                >
                  We share
                </button>
                {!state.shared && (
                  <button
                    type="button"
                    onClick={() => toggleOwner(task.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: owner ? (OWNER_COLORS[ownerIdx] ?? '#B0ACA6') : '#E5E3DC',
                      color: owner ? '#fff' : '#6B6B64',
                    }}
                  >
                    {owner ? owner.first_name.charAt(0).toUpperCase() : '?'}
                  </button>
                )}
              </div>
            )
          })
        )}
        <button
          type="button"
          disabled={isPending}
          onClick={handleSave}
          className="mt-3 w-full h-12 rounded-pill bg-caldelo-green text-white text-sm font-semibold disabled:opacity-60"
        >
          {isPending ? 'Saving…' : 'Save'}
        </button>
      </div>
    </BottomSheet>
  )
}
