'use client'

import type { HouseholdMember, TodayEvent } from '@/lib/db/helpers'
import { BottomSheet } from '@/components/ui/BottomSheet'

const CATEGORY_COLORS: Record<string, string> = {
  'school-runs': '#4A7C59',
  'clubs-activities': '#B85C4A',
  'household': '#6B6B64',
  'evening-routines': '#5C7A9E',
  'health-wellbeing': '#4A7C59',
  'home-car-admin': '#6B6B64',
  'birthdays-anniversaries': '#C27B6A',
  'holidays-travel': '#5C7A9E',
}
const DEFAULT_COLOR = '#B0ACA6'
const OWNER_COLORS = ['#4A7C59', '#5C7A9E', '#C27B6A']

function formatTime(startsAt: string): string {
  return new Date(startsAt).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

type DayDetailSheetProps = {
  isOpen: boolean
  date: Date | null
  events: TodayEvent[]
  members: HouseholdMember[]
  onClose: () => void
}

export function DayDetailSheet({ isOpen, date, events, members, onClose }: DayDetailSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {date && (
        <div className="flex flex-col gap-4 pt-1">
          <h2 className="font-display text-2xl font-bold text-caldelo-ink">
            {formatDate(date)}
          </h2>

          {events.length === 0 ? (
            <p className="text-sm text-caldelo-muted py-6 text-center">Nothing scheduled</p>
          ) : (
            <div className="flex flex-col divide-y divide-caldelo-border">
              {events.map((ev) => {
                const owner = ev.owner_id ? members.find((m) => m.id === ev.owner_id) : null
                const ownerIdx = owner ? members.findIndex((m) => m.id === owner.id) : -1
                const ownerColor = ownerIdx >= 0 ? (OWNER_COLORS[ownerIdx] ?? DEFAULT_COLOR) : DEFAULT_COLOR
                const catColor = CATEGORY_COLORS[ev.category] ?? DEFAULT_COLOR

                return (
                  <div key={ev.id} className="flex items-center gap-3 py-3 min-h-[52px]">
                    <span className="text-sm text-caldelo-muted w-12 text-right flex-shrink-0">
                      {formatTime(ev.starts_at)}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: catColor }}
                    />
                    <span className="text-sm font-medium text-caldelo-ink flex-1 min-w-0 truncate">
                      {ev.title}
                    </span>
                    {owner && (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: ownerColor }}
                      >
                        {owner.first_name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full h-12 rounded-pill bg-caldelo-green text-white text-sm font-medium"
          >
            + Quick Add{' '}
            {date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </button>
        </div>
      )}
    </BottomSheet>
  )
}
