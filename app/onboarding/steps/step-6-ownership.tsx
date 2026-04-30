'use client'

import { useState } from 'react'
import type { StepProps } from '../page'
import { EVENT_CATEGORIES } from './step-5-events'
import type { EventItem } from './step-5-events'
import { createClient } from '@/lib/supabase/browser'

type OwnerValue = 'partner1' | 'partner2' | 'shared'

function OwnerButton({
  value,
  current,
  label,
  onClick,
}: {
  value: OwnerValue
  current: OwnerValue | undefined
  label: string
  onClick: () => void
}) {
  const isActive = current === value
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      className={`h-9 px-3 rounded-pill text-xs font-medium transition-all ${
        isActive
          ? 'bg-caldelo-green text-white'
          : 'bg-caldelo-surface text-caldelo-secondary hover:bg-caldelo-border'
      }`}
    >
      {label}
    </button>
  )
}

export default function Step6Ownership({ data, onNext, onBack }: StepProps) {
  const selectedItems: EventItem[] = EVENT_CATEGORIES.flatMap(cat =>
    cat.items.filter(item => data.selectedEvents.includes(item.id))
  )

  const partner1Label = 'Me'
  const partner2Label = data.partnerFirstName || 'Partner'

  const [ownership, setOwnership] = useState<Record<string, OwnerValue>>(
    data.ownership ?? {}
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleNext() {
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      if (selectedItems.length > 0 && data.householdId) {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        const rows = selectedItems.map(item => ({
          household_id: data.householdId,
          title: item.label,
          owner_id:
            ownership[item.id] === 'partner1' ? (user?.id ?? null) : null,
          notes:
            ownership[item.id] === 'shared'
              ? 'Shared'
              : ownership[item.id] === 'partner2'
              ? `Assigned to ${partner2Label}`
              : null,
        }))

        const { error: insertError } = await supabase.from('tasks').insert(rows)

        if (insertError) {
          setError('Could not save tasks. Please try again.')
          setLoading(false)
          return
        }
      }

      onNext({ ownership })
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (selectedItems.length === 0) {
    return (
      <div className="space-y-6 w-full">
        <div className="space-y-2">
          <h2 className="font-display text-3xl font-bold text-caldelo-ink">
            Who usually handles these?
          </h2>
          <p className="text-caldelo-secondary text-base">
            You can always change this later.
          </p>
        </div>

        <p className="text-caldelo-secondary text-sm">
          Nothing selected — tap Back to add events, or continue.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            aria-label="Go back to previous step"
            className="h-[52px] px-6 rounded-pill border border-caldelo-border text-caldelo-ink text-sm font-medium hover:bg-caldelo-surface transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => onNext({ ownership: {} })}
            className="flex-1 h-[52px] rounded-pill bg-caldelo-green text-white text-base font-semibold hover:opacity-90 transition-opacity"
          >
            Next →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2">
        <h2 className="font-display text-3xl font-bold text-caldelo-ink">
          Who usually handles these?
        </h2>
        <p className="text-caldelo-secondary text-base">
          You can always change this later.
        </p>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {selectedItems.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center justify-between gap-3 py-3 border-b border-caldelo-border ${
              index === 0 ? 'border-t' : ''
            }`}
          >
            <span className="text-sm font-medium text-caldelo-ink flex-1">
              {item.label}
            </span>
            <div className="flex gap-1.5 flex-shrink-0">
              <OwnerButton
                value="partner1"
                current={ownership[item.id]}
                label={partner1Label}
                onClick={() =>
                  setOwnership(prev => ({ ...prev, [item.id]: 'partner1' }))
                }
              />
              <OwnerButton
                value="partner2"
                current={ownership[item.id]}
                label={partner2Label}
                onClick={() =>
                  setOwnership(prev => ({ ...prev, [item.id]: 'partner2' }))
                }
              />
              <OwnerButton
                value="shared"
                current={ownership[item.id]}
                label="Share"
                onClick={() =>
                  setOwnership(prev => ({ ...prev, [item.id]: 'shared' }))
                }
              />
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className="text-sm text-caldelo-coral" role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          aria-label="Go back to previous step"
          disabled={loading}
          className="h-[52px] px-6 rounded-pill border border-caldelo-border text-caldelo-ink text-sm font-medium hover:bg-caldelo-surface transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={loading}
          className="flex-1 h-[52px] rounded-pill bg-caldelo-green text-white text-base font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {loading ? 'Saving…' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
