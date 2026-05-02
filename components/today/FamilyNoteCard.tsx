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
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastLocalSaveRef = useRef<number>(0)
  const dateRef = useRef(date)

  useEffect(() => {
    dateRef.current = date
  }, [date])

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
          if (
            typeof record.content === 'string' &&
            Date.now() - lastLocalSaveRef.current > 1500
          ) {
            setContent(record.content)
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [householdId])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current)
    }
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value
    setContent(value)
    setSaveStatus('idle')
    lastLocalSaveRef.current = Date.now()
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      try {
        await upsertDailyNoteAction(householdId, dateRef.current, value)
        setSaveStatus('saved')
        if (savedTimerRef.current) clearTimeout(savedTimerRef.current)
        savedTimerRef.current = setTimeout(() => setSaveStatus('idle'), 2000)
      } catch {
        setSaveStatus('error')
      }
    }, 1000)
  }

  return (
    <div className="bg-white rounded-card shadow-sm mx-4 mb-3 p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-caldelo-muted uppercase tracking-wide">
          Family note
        </p>
        {saveStatus === 'saved' && (
          <span className="text-xs text-caldelo-green">Saved</span>
        )}
        {saveStatus === 'error' && (
          <span className="text-xs text-red-600">Something didn&apos;t save. Try again.</span>
        )}
      </div>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Add a note for today..."
        aria-label="Family note for today"
        rows={3}
        className="w-full resize-none text-sm text-caldelo-ink placeholder:text-caldelo-muted bg-transparent outline-none leading-relaxed"
      />
    </div>
  )
}
