'use client'

import { useState } from 'react'
import type { TodayEvent, HouseholdMember } from '@/lib/db/helpers'
import { BottomSheet } from '@/components/ui/BottomSheet'

const AVATAR_COLORS = ['bg-caldelo-green', 'bg-caldelo-blue', 'bg-caldelo-coral'] as const

function Avatar({ name, colorClass, small }: { name: string; colorClass: string; small?: boolean }) {
  const size = small ? 'w-7 h-7' : 'w-8 h-8'
  return (
    <div
      className={`${size} rounded-full ${colorClass} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

const CATEGORY_COLORS: Record<string, string> = {
  'school-runs': '#4A7C59',
  'clubs-activities': '#B85C4A',
  'household': '#6B6B64',
  'evening-routines': '#5C7A9E',
  'health-wellbeing': '#4A7C59',
  'home-car-admin': '#6B6B64',
  'birthdays-anniversaries': '#c27b6a',
  'holidays-travel': '#5C7A9E',
}
const DEFAULT_COLOR = '#B0ACA6'

function formatTime(startsAt: string): string {
  return new Date(startsAt).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function titleCase(str: string): string {
  return str
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

type TodayEventsListProps = {
  events: TodayEvent[]
  members: HouseholdMember[]
}

export function TodayEventsList({ events, members }: TodayEventsListProps) {
  const [selectedEvent, setSelectedEvent] = useState<TodayEvent | null>(null)

  const owner =
    selectedEvent?.owner_id != null
      ? members.find((m) => m.id === selectedEvent.owner_id)
      : null

  return (
    <>
      <div className="bg-white mx-4 rounded-card shadow-sm overflow-hidden mb-3">
        <p className="px-4 py-3 text-xs font-semibold text-caldelo-muted uppercase tracking-wide border-b border-caldelo-border">
          Today&apos;s events
        </p>

        {events.length === 0 ? (
          <div className="px-4 py-10 flex flex-col items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B0ACA6" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <p className="text-sm text-caldelo-muted text-center">
              Nothing scheduled today — enjoy it.
            </p>
          </div>
        ) : (
          events.map((event) => {
            const eventOwner =
              event.owner_id != null
                ? members.find((m) => m.id === event.owner_id)
                : null
            const ownerIndex = eventOwner ? members.indexOf(eventOwner) : -1
            const ownerColor =
              ownerIndex >= 0
                ? (AVATAR_COLORS[ownerIndex] ?? 'bg-caldelo-muted')
                : 'bg-caldelo-muted'

            return (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelectedEvent(event)}
                className="flex items-center gap-3 px-4 py-3.5 border-b border-caldelo-border last:border-0 cursor-pointer hover:bg-caldelo-surface transition-colors min-h-[56px] w-full text-left"
              >
                <span className="text-sm font-medium text-caldelo-muted w-12 text-right flex-shrink-0">
                  {formatTime(event.starts_at)}
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[event.category] ?? DEFAULT_COLOR }}
                />
                <span className="text-sm font-medium text-caldelo-ink flex-1 min-w-0 truncate">
                  {event.title}
                </span>
                {eventOwner && (
                  <Avatar name={eventOwner.first_name} colorClass={ownerColor} small />
                )}
              </button>
            )
          })
        )}
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
                {formatTime(selectedEvent.starts_at)}
                {selectedEvent.ends_at
                  ? ` – ${formatTime(selectedEvent.ends_at)}`
                  : ''}
              </p>
              <p className="text-sm text-caldelo-secondary">
                {titleCase(selectedEvent.category)}
              </p>
              {owner && (
                <p className="text-sm text-caldelo-secondary">
                  With {owner.first_name}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="w-full h-11 rounded-pill bg-caldelo-green text-white text-sm font-medium"
            >
              Mark done
            </button>
          </div>
        )}
      </BottomSheet>
    </>
  )
}
