'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/browser'
import type { StepProps } from '../page'

type Region = 'england' | 'scotland' | 'wales' | 'northern-ireland'

const REGIONS: { id: Region; label: string }[] = [
  { id: 'england', label: 'England' },
  { id: 'scotland', label: 'Scotland' },
  { id: 'wales', label: 'Wales' },
  { id: 'northern-ireland', label: 'Northern Ireland' },
]

export default function Step4Region({ data, onNext, onBack }: StepProps) {
  const [selected, setSelected] = useState<Region | ''>(
    (data.region as Region | '') ?? ''
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleNext() {
    if (!selected) {
      setError('Please select your region.')
      return
    }

    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()
      const { error: dbError } = await supabase
        .from('households')
        .update({ school_region: selected })
        .eq('id', data.householdId)

      if (dbError) {
        setError('Failed to save your region. Please try again.')
        return
      }

      onNext({ region: selected })
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
          Which region are you in?
        </h2>
        <p className="text-caldelo-secondary text-base">
          This loads your school term dates automatically.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {REGIONS.map(region => {
          const isSelected = selected === region.id
          return (
            <button
              key={region.id}
              onClick={() => {
                setSelected(region.id)
                setError(null)
              }}
              aria-pressed={isSelected}
              aria-label={`Select ${region.label}`}
              className={`relative rounded-card border-2 p-6 text-center text-base cursor-pointer transition-all min-h-[80px] flex items-center justify-center ${
                isSelected
                  ? 'border-caldelo-green bg-caldelo-tint font-semibold text-caldelo-green'
                  : 'border-caldelo-border bg-white font-medium text-caldelo-ink hover:border-caldelo-green/50'
              }`}
            >
              {isSelected && (
                <span className="absolute top-2 right-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-caldelo-green">
                    <circle cx="8" cy="8" r="8" fill="currentColor"/>
                    <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
              {region.label}
            </button>
          )
        })}
      </div>

      {error && (
        <p className="text-caldelo-coral text-sm">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          aria-label="Go back to previous step"
          className="h-[52px] px-6 rounded-pill border border-caldelo-border text-caldelo-ink text-sm font-medium hover:bg-caldelo-surface transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={loading}
          aria-label="Continue to next step"
          className="flex-1 h-[52px] rounded-pill bg-caldelo-green text-white text-base font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {loading ? 'Saving…' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
