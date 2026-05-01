'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/browser'
import type { TodayEvent } from '@/lib/db/helpers'

export function useCalendarEvents(
  householdId: string,
  startDate: string,
  endDate: string,
): { events: Record<string, TodayEvent[]>; isLoading: boolean } {
  const [events, setEvents] = useState<Record<string, TodayEvent[]>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)

    const supabase = createClient()
    supabase
      .from('events')
      .select('id,title,category,starts_at,ends_at,owner_id,completed')
      .eq('household_id', householdId)
      .gte('starts_at', startDate)
      .lt('starts_at', endDate)
      .order('starts_at', { ascending: true })
      .then(({ data }) => {
        if (cancelled) return
        const grouped: Record<string, TodayEvent[]> = {}
        for (const ev of (data ?? []) as TodayEvent[]) {
          const key = ev.starts_at.slice(0, 10)
          ;(grouped[key] ??= []).push(ev)
        }
        setEvents(grouped)
        setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [householdId, startDate, endDate])

  return { events, isLoading }
}
