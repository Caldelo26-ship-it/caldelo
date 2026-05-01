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
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
          if (typeof record.content === 'string') {
            setContent(record.content)
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [householdId])

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value
    setContent(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      upsertDailyNoteAction(householdId, date, value)
    }, 1000)
  }

  return (
    <div className="bg-white rounded-card shadow-sm mx-4 mb-3 p-4">
      <p className="text-xs font-semibold text-caldelo-muted uppercase tracking-wide mb-3">
        Family note
      </p>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Add a note for today..."
        rows={3}
        className="w-full resize-none text-sm text-caldelo-ink placeholder:text-caldelo-muted bg-transparent outline-none leading-relaxed"
      />
    </div>
  )
}
