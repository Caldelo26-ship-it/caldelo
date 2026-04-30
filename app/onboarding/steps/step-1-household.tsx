'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/browser'
import type { StepProps } from '../page'

export default function Step1HouseholdName({ data, onNext }: StepProps) {
  const [householdName, setHouseholdName] = useState(data.householdName)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleNext() {
    const trimmed = householdName.trim()
    if (!trimmed) {
      setError('Please enter a name for your household.')
      return
    }

    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()
      const { data: userData, error: userError } = await supabase.auth.getUser()
      if (userError || !userData.user) {
        setError('Could not verify your account. Please refresh and try again.')
        return
      }

      const userId = userData.user.id

      const { data: row, error: dbError } = data.householdId
        ? await supabase
            .from('households')
            .update({ name: trimmed })
            .eq('id', data.householdId)
            .select('id')
            .single()
        : await supabase
            .from('households')
            .insert({ user_id: userId, name: trimmed })
            .select('id')
            .single()

      if (dbError || !row) {
        setError('Failed to save your household. Please try again.')
        return
      }

      onNext({ householdName: trimmed, householdId: row.id as string })
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
          What shall we call your home?
        </h2>
        <p className="text-caldelo-secondary text-base">
          This is how your household will appear to everyone in it.
        </p>
      </div>

      <div className="space-y-2">
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
          placeholder="The Johnsons"
          value={householdName}
          onChange={e => setHouseholdName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleNext() }}
          aria-label="Household name"
          autoFocus
        />
        {error && (
          <p className="text-caldelo-coral text-sm">{error}</p>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={loading}
        className="w-full h-[52px] rounded-pill bg-caldelo-green text-white text-base font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
        style={{ backgroundColor: '#4A7C59' }}
      >
        {loading ? 'Saving…' : 'Next →'}
      </button>
    </div>
  )
}
