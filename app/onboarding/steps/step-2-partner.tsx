'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/browser'
import type { StepProps } from '../page'

export default function Step2Partner({ data, onNext, onBack }: StepProps) {
  const [partnerName, setPartnerName] = useState(data.partnerFirstName)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  async function handleCopyLink() {
    const url = `${window.location.origin}/invite/${data.householdId}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for browsers that block clipboard without interaction
      setCopied(false)
    }
  }

  function handleSkip() {
    onNext({ partnerFirstName: '', partnerSkipped: true })
  }

  async function handleNext() {
    const trimmed = partnerName.trim()
    if (!trimmed) {
      setError('Please enter your partner\'s first name.')
      return
    }

    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()

      const { error: dbError } = await supabase
        .from('household_members')
        .insert({ household_id: data.householdId, first_name: trimmed, role: 'partner' })

      if (dbError) {
        setError('Failed to save partner details. Please try again.')
        return
      }

      onNext({ partnerFirstName: trimmed, partnerSkipped: false })
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
          Who are you coordinating with?
        </h2>
        <p className="text-caldelo-secondary text-base">
          Invite your partner, co-parent, or whoever helps run your household.
        </p>
      </div>

      <div className="space-y-3">
        <input
          className="w-full h-[52px] px-4 rounded-[10px] bg-white text-caldelo-ink placeholder:text-caldelo-muted text-base focus:outline-none"
          style={{ border: '1.5px solid #E5E3DC', boxShadow: 'none' }}
          onFocus={e => {
            e.currentTarget.style.border = '1.5px solid #4A7C59'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74,124,89,0.12)'
          }}
          onBlur={e => {
            e.currentTarget.style.border = '1.5px solid #E5E3DC'
            e.currentTarget.style.boxShadow = 'none'
          }}
          placeholder="Their first name"
          value={partnerName}
          onChange={e => setPartnerName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleNext() }}
          aria-label="Partner's first name"
          autoFocus
        />

        <button
          type="button"
          onClick={handleCopyLink}
          className="w-full h-[52px] rounded-pill border border-caldelo-border text-caldelo-ink text-base font-medium hover:bg-caldelo-surface transition-colors flex items-center justify-center gap-2"
        >
          {copied ? '✓ Copied!' : '🔗 Copy invite link'}
        </button>

        {error && (
          <p className="text-caldelo-coral text-sm">{error}</p>
        )}

        <p className="text-caldelo-muted text-xs text-center">
          Free plan includes up to 2 household members.
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleNext}
          disabled={loading}
          className="w-full h-[52px] rounded-pill bg-caldelo-green text-white text-base font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          style={{ backgroundColor: '#4A7C59' }}
        >
          {loading ? 'Saving…' : 'Next →'}
        </button>

        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="h-[52px] px-6 rounded-pill border border-caldelo-border text-caldelo-ink text-sm font-medium hover:bg-caldelo-surface transition-colors"
          >
            ← Back
          </button>

          <button
            type="button"
            onClick={handleSkip}
            className="text-caldelo-secondary text-sm hover:text-caldelo-ink transition-colors"
          >
            I&apos;ll invite them later →
          </button>
        </div>
      </div>
    </div>
  )
}
