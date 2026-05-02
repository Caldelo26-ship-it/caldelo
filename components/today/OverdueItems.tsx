'use client'

import { useState } from 'react'
import type { Task } from '@/lib/db/helpers'

type OverdueItemsProps = {
  tasks: Task[]
  onMarkDone: (id: string) => Promise<void>
  onMoveToToday: (id: string) => Promise<void>
}

function formatDueDate(dueDate: string): string {
  return new Date(dueDate + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  })
}

export function OverdueItems({ tasks, onMarkDone, onMoveToToday }: OverdueItemsProps) {
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set())
  const [errors, setErrors] = useState<Record<string, string>>({})

  const visible = tasks.filter((t) => !removedIds.has(t.id))

  function removeId(id: string) {
    setRemovedIds((prev) => new Set(prev).add(id))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  function restoreId(id: string, errorMsg: string) {
    setRemovedIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    setErrors((prev) => ({ ...prev, [id]: errorMsg }))
  }

  async function handleMarkDone(id: string) {
    removeId(id)
    try {
      await onMarkDone(id)
    } catch {
      restoreId(id, "Something didn't save. Try again.")
    }
  }

  async function handleMoveToToday(id: string) {
    removeId(id)
    try {
      await onMoveToToday(id)
    } catch {
      restoreId(id, "Something didn't save. Try again.")
    }
  }

  if (visible.length === 0) {
    return (
      <div className="mx-4 mb-3 px-4 py-3">
        <p className="text-sm text-caldelo-muted">You&apos;re all caught up.</p>
      </div>
    )
  }

  return (
    <div className="bg-caldelo-surface rounded-card mx-4 mb-3 overflow-hidden">
      <p className="px-4 py-3 text-xs font-semibold text-caldelo-muted uppercase tracking-wide">
        Carried over
      </p>

      {visible.map((task) => (
        <div key={task.id} className="border-t border-caldelo-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-caldelo-secondary truncate">{task.title}</p>
              {task.due_date && (
                <p className="text-xs text-caldelo-muted">Was due {formatDueDate(task.due_date)}</p>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => handleMarkDone(task.id)}
                className="h-8 px-3 rounded-pill bg-caldelo-green/10 text-caldelo-green text-xs font-medium"
              >
                Done
              </button>
              <button
                type="button"
                onClick={() => handleMoveToToday(task.id)}
                className="h-8 px-3 rounded-pill bg-caldelo-surface border border-caldelo-border text-caldelo-secondary text-xs font-medium"
              >
                Today
              </button>
            </div>
          </div>
          {errors[task.id] && (
            <p className="px-4 pb-2 text-xs text-red-600">{errors[task.id]}</p>
          )}
        </div>
      ))}
    </div>
  )
}
