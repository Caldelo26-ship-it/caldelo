'use client'

import { useState } from 'react'
import type { HouseholdMember, TodayEvent } from '@/lib/db/helpers'
import { BottomSheet } from '@/components/ui/BottomSheet'
import { useCalendarEvents } from './useCalendarEvents'

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const OWNER_COLORS = ['#4A7C59', '#5C7A9E', '#C27B6A']
const TODAY_GREEN = '#4A7C59'
const HOLIDAY_TINT = '#fef9ee'

function toLocalDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function isToday(d: Date): boolean {
  const n = new Date()
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate()
}

function getOwnerColor(ownerId: string | null, members: HouseholdMember[]): string {
  if (!ownerId) return '#B0ACA6'
  const idx = members.findIndex((m) => m.id === ownerId)
  return OWNER_COLORS[idx] ?? '#B0ACA6'
}

function formatEventTime(startsAt: string): string {
  return new Date(startsAt).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

type WeekViewProps = {
  weekStart: Date
  householdId: string
  members: HouseholdMember[]
}

export function WeekView({ weekStart, householdId, members }: WeekViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<TodayEvent | null>(null)

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    return d
  })

  const startDate = toLocalDateStr(days[0]!)
  const afterEnd = new Date(days[6]!)
  afterEnd.setDate(afterEnd.getDate() + 1)
  const endDate = toLocalDateStr(afterEnd)

  const { events } = useCalendarEvents(householdId, startDate, endDate)

  const owner = selectedEvent?.owner_id
    ? members.find((m) => m.id === selectedEvent.owner_id)
    : null

  return (
    <>
      <div className="flex border-t border-caldelo-border">
        {days.map((day, i) => {
          const dateKey = toLocalDateStr(day)
          const dayEvents = events[dateKey] ?? []
          const today = isToday(day)
          const isHoliday = dayEvents.some((e) => e.category === 'holidays-travel')

          return (
            <div
              key={i}
              className="flex-1 min-w-0 border-r border-caldelo-border last:border-r-0"
              style={{ backgroundColor: isHoliday && !today ? HOLIDAY_TINT : undefined }}
            >
              {/* Column header */}
              <div className="flex flex-col items-center pt-2 pb-2 border-b border-caldelo-border">
                <span className="text-[10px] text-caldelo-secondary uppercase tracking-wide font-medium">
                  {DAY_LABELS[i]}
                </span>
                <span
                  className="mt-1 w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold"
                  style={
                    today
                      ? { backgroundColor: TODAY_GREEN, color: '#fff' }
                      : { color: '#1a1917' }
                  }
                >
                  {day.getDate()}
                </span>
              </div>

              {/* Event chips */}
              <div className="flex flex-col gap-0.5 p-0.5 min-h-[52px]">
                {dayEvents.map((ev) => (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => setSelectedEvent(ev)}
                    className="w-full rounded text-left overflow-hidden"
                    style={{ backgroundColor: getOwnerColor(ev.owner_id, members) }}
                    aria-label={ev.title}
                  >
                    <span className="block px-1 py-[3px] text-[9px] text-white font-medium leading-tight truncate">
                      {ev.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <BottomSheet
        isOpen={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title}
      >
        {selectedEvent && (
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-caldelo-muted">
                {formatEventTime(selectedEvent.starts_at)}
                {selectedEvent.ends_at ? ` – ${formatEventTime(selectedEvent.ends_at)}` : ''}
              </p>
              <p className="text-sm text-caldelo-secondary capitalize">
                {selectedEvent.category.replace(/-/g, ' ')}
              </p>
              {owner && (
                <p className="text-sm text-caldelo-secondary">With {owner.first_name}</p>
              )}
            </div>
          </div>
        )}
      </BottomSheet>
    </>
  )
}
