'use client'

import { useState } from 'react'
import type { Reminder } from '@/lib/db/helpers'

type UrgentRemindersProps = {
  reminders: Reminder[]
  onDismiss: (id: string) => Promise<void>
}

export function UrgentReminders({ reminders, onDismiss }: UrgentRemindersProps) {
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())

  const visible = reminders.filter((r) => !dismissedIds.has(r.id))

  if (visible.length === 0) return null

  async function handleDismiss(id: string) {
    setDismissedIds((prev) => new Set(prev).add(id))
    await onDismiss(id)
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-card mx-4 mb-3 p-4">
      <div className="flex items-center gap-2 mb-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#92400e"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span className="text-sm font-semibold text-amber-800">Needs attention</span>
      </div>

      {visible.map((reminder) => (
        <div key={reminder.id} className="flex items-center justify-between py-2">
          <span className="text-sm text-amber-900">{reminder.title}</span>
          <button
            type="button"
            aria-label="Dismiss reminder"
            onClick={() => handleDismiss(reminder.id)}
            className="text-amber-600 text-xs underline ml-4 flex-shrink-0 min-h-[44px] flex items-center"
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  )
}
