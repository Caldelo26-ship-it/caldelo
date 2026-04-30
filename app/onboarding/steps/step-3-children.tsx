'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/browser'
import type { StepProps } from '../page'

const FREE_TIER_CHILD_LIMIT = 2

export default function Step3Children({ data, onNext, onBack }: StepProps) {
  const [children, setChildren] = useState<string[]>(data.children)
  const [newName, setNewName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showUpsell, setShowUpsell] = useState(false)

  function handleAdd() {
    const trimmed = newName.trim()
    if (!trimmed) return

    if (children.length >= FREE_TIER_CHILD_LIMIT) {
      setShowUpsell(true)
      return
    }

    setChildren(prev => [...prev, trimmed])
    setNewName('')
  }

  function handleRemove(index: number) {
    setChildren(prev => prev.filter((_, i) => i !== index))
    setShowUpsell(false)
  }

  function handleSkip() {
    onNext({ children: [] })
  }

  async function handleNext() {
    if (children.length === 0) {
      onNext({ children: [] })
      return
    }

    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()

      const rows = children.map(name => ({
        household_id: data.householdId,
        first_name: name,
      }))

      const { error: dbError } = await supabase
        .from('children')
        .insert(rows)

      if (dbError) {
        setError('Failed to save children. Please try again.')
        return
      }

      onNext({ children })
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2">
        <h2 className="font-display text-3xl font-bold text-caldelo-ink">
          Who are the little ones?
        </h2>
        <div className="space-y-0.5">
          <p className="text-caldelo-muted text-sm">
            First name only. We don&apos;t need anything else.
          </p>
          <p className="text-caldelo-muted text-sm">
            Caldelo stores no personal data about your children.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Add child row */}
        <div className="flex gap-2">
          <input
            className="flex-1 h-[52px] px-4 rounded-[10px] bg-white text-caldelo-ink placeholder:text-caldelo-muted text-base focus:outline-none"
            style={{ border: '1.5px solid #E5E3DC', boxShadow: 'none' }}
            onFocus={e => {
              e.currentTarget.style.border = '1.5px solid #4A7C59'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74,124,89,0.12)'
            }}
            onBlur={e => {
              e.currentTarget.style.border = '1.5px solid #E5E3DC'
              e.currentTarget.style.boxShadow = 'none'
            }}
            placeholder="First name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleAdd() }}
            aria-label="Child's first name"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="h-11 px-5 rounded-pill bg-caldelo-tint text-caldelo-green text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Add
          </button>
        </div>

        {/* Children list */}
        {children.length > 0 && (
          <ul className="space-y-2">
            {children.map((name, i) => (
              <li
                key={name}
                className="flex items-center justify-between h-11 px-4 rounded-[10px] bg-caldelo-surface"
              >
                <span className="text-caldelo-ink text-base">{name}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(i)}
                  className="h-11 w-11 flex items-center justify-center text-caldelo-muted hover:text-caldelo-coral transition-colors text-lg"
                  aria-label={`Remove ${name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Upsell prompt */}
        {showUpsell && (
          <div className="relative bg-caldelo-tint rounded-card p-4 space-y-2">
            <button
              type="button"
              onClick={() => setShowUpsell(false)}
              className="absolute top-3 right-3 h-6 w-6 flex items-center justify-center text-caldelo-muted hover:text-caldelo-ink transition-colors text-sm"
              aria-label="Dismiss"
            >
              ×
            </button>
            <p className="text-caldelo-ink text-sm font-medium pr-6">
              You can add up to 2 children on the free plan.
            </p>
            <p className="text-caldelo-secondary text-sm">
              Upgrade to Premium for unlimited children.
            </p>
            <a
              href="/pricing"
              className="inline-block text-caldelo-green text-sm underline hover:opacity-80 transition-opacity"
            >
              Upgrade to Premium — £4.99/month
            </a>
          </div>
        )}

        {error && (
          <p className="text-caldelo-coral text-sm">{error}</p>
        )}
      </div>

      <div className="space-y-3">
        <button
          onClick={handleNext}
          disabled={loading}
          className="w-full h-[52px] rounded-pill bg-caldelo-green text-white text-base font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          style={{ backgroundColor: '#4A7C59' }}
        >
          {loading ? 'Saving…' : children.length > 0 ? 'Next →' : 'Skip →'}
        </button>

        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="h-[52px] px-6 rounded-pill border border-caldelo-border text-caldelo-ink text-sm font-medium hover:bg-caldelo-surface transition-colors"
          >
            ← Back
          </button>

          {children.length === 0 && (
            <button
              type="button"
              onClick={handleSkip}
              className="text-caldelo-secondary text-sm hover:text-caldelo-ink transition-colors"
            >
              Skip for now →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
