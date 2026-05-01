'use client'

import { useRef } from 'react'
import type { HouseholdMember, TodayEvent } from '@/lib/db/helpers'
import { useCalendarEvents } from './useCalendarEvents'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const WEEKDAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

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
const TODAY_GREEN = '#4A7C59'
const MUTED = '#B0ACA6'
const HOLIDAY_TINT = '#fef9ee'

function toLocalDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function isToday(d: Date): boolean {
  const n = new Date()
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate()
}

function isPast(d: Date): boolean {
  const n = new Date()
  n.setHours(0, 0, 0, 0)
  return d < n
}

function getISOWeek(date: Date): number {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7))
  const week1 = new Date(d.getFullYear(), 0, 4)
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
}

function buildGrid(year: number, month: number): Date[][] {
  const firstDay = new Date(year, month, 1)
  const startDow = (firstDay.getDay() + 6) % 7 // Mon=0 … Sun=6
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const totalCells = Math.ceil((startDow + daysInMonth) / 7) * 7
  const weeks: Date[][] = []
  const cursor = new Date(year, month, 1 - startDow)

  for (let i = 0; i < totalCells; i++) {
    if (i % 7 === 0) weeks.push([])
    weeks[weeks.length - 1]!.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }

  return weeks
}

type MonthViewProps = {
  year: number
  month: number
  householdId: string
  members: HouseholdMember[]
  onPrevMonth: () => void
  onNextMonth: () => void
  onDayTap: (date: Date, events: TodayEvent[]) => void
  onHeadingTap: () => void
}

export function MonthView({
  year,
  month,
  householdId,
  members,
  onPrevMonth,
  onNextMonth,
  onDayTap,
  onHeadingTap,
}: MonthViewProps) {
  const touchStartX = useRef(0)
  const weeks = buildGrid(year, month)

  const gridStart = weeks[0]![0]!
  const gridEnd = weeks[weeks.length - 1]![6]!
  const afterEnd = new Date(gridEnd)
  afterEnd.setDate(afterEnd.getDate() + 1)

  const { events } = useCalendarEvents(
    householdId,
    toLocalDateStr(gridStart),
    toLocalDateStr(afterEnd),
  )

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]!.clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0]!.clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) onNextMonth()
      else onPrevMonth()
    }
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Month heading */}
      <div className="flex items-center justify-between px-4 mb-3">
        <button
          type="button"
          onClick={onHeadingTap}
          className="flex items-center gap-1"
          aria-label="Open year picker"
        >
          <h2 className="font-display text-3xl font-bold text-caldelo-ink">
            {MONTH_NAMES[month]} {year}
          </h2>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b6b64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onPrevMonth}
            aria-label="Previous month"
            className="w-9 h-9 flex items-center justify-center text-caldelo-secondary rounded-full hover:bg-caldelo-surface transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            aria-label="Next month"
            className="w-9 h-9 flex items-center justify-center text-caldelo-secondary rounded-full hover:bg-caldelo-surface transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Weekday header row */}
      <div className="flex px-4 mb-1">
        {/* Week number spacer */}
        <div className="w-6 flex-shrink-0" />
        {WEEKDAY_LABELS.map((label, i) => (
          <div key={i} className="flex-1 text-center">
            <span className="text-[11px] font-semibold text-caldelo-muted uppercase tracking-wide">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="px-4">
        {weeks.map((week, wi) => {
          const weekNum = getISOWeek(week[0]!)
          return (
            <div key={wi} className="flex">
              {/* Week number */}
              <div className="w-6 flex-shrink-0 flex items-center justify-center">
                <span className="text-[9px] text-caldelo-muted font-medium">{weekNum}</span>
              </div>

              {/* Day cells */}
              {week.map((day, di) => {
                const dateKey = toLocalDateStr(day)
                const dayEvents = events[dateKey] ?? []
                const inMonth = day.getMonth() === month
                const today = isToday(day)
                const past = isPast(day)
                const isHoliday = dayEvents.some((e) => e.category === 'holidays-travel')

                const dots = dayEvents.slice(0, 3)
                const overflow = dayEvents.length > 3 ? dayEvents.length - 3 : 0

                let dateNumColor = '#1a1917'
                if (today) dateNumColor = '#fff'
                else if (!inMonth || past) dateNumColor = MUTED

                return (
                  <button
                    key={di}
                    type="button"
                    onClick={() => onDayTap(day, dayEvents)}
                    className="flex-1 flex flex-col items-center py-1 transition-colors"
                    style={{
                      minHeight: 52,
                      backgroundColor: isHoliday && !today ? HOLIDAY_TINT : undefined,
                    }}
                    aria-label={dateKey}
                  >
                    {/* Date number */}
                    <span
                      className="w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold"
                      style={
                        today
                          ? { backgroundColor: TODAY_GREEN, color: dateNumColor }
                          : { color: dateNumColor }
                      }
                    >
                      {day.getDate()}
                    </span>

                    {/* Dots row */}
                    {dayEvents.length > 0 && (
                      <div className="flex items-center gap-[2px] mt-0.5 h-3">
                        {dots.map((ev, ei) => (
                          <span
                            key={ei}
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: CATEGORY_COLORS[ev.category] ?? DEFAULT_COLOR }}
                          />
                        ))}
                        {overflow > 0 && (
                          <span className="text-[8px] text-caldelo-muted font-medium leading-none">
                            +{overflow}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
