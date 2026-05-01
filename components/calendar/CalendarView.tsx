'use client'

import { useState } from 'react'
import type { HouseholdMember, TodayEvent } from '@/lib/db/helpers'
import { WeekView } from './WeekView'
import { MonthView } from './MonthView'
import { DayDetailSheet } from './DayDetailSheet'
import { YearPicker } from './YearPicker'

type Tab = 'month' | 'week'

function getMondayOfWeek(d: Date): Date {
  const diff = (d.getDay() + 6) % 7
  const monday = new Date(d)
  monday.setDate(d.getDate() - diff)
  monday.setHours(0, 0, 0, 0)
  return monday
}

type CalendarViewProps = {
  householdId: string
  members: HouseholdMember[]
}

export function CalendarView({ householdId, members }: CalendarViewProps) {
  const now = new Date()
  const [activeTab, setActiveTab] = useState<Tab>('month')
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [weekStart, setWeekStart] = useState(getMondayOfWeek(now))
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false)
  const [daySheet, setDaySheet] = useState<{ date: Date; events: TodayEvent[] } | null>(null)

  function goToPrevMonth() {
    if (month === 0) {
      setMonth(11)
      setYear((y) => y - 1)
    } else {
      setMonth((m) => m - 1)
    }
  }

  function goToNextMonth() {
    if (month === 11) {
      setMonth(0)
      setYear((y) => y + 1)
    } else {
      setMonth((m) => m + 1)
    }
  }

  function goToPrevWeek() {
    setWeekStart((ws) => {
      const d = new Date(ws)
      d.setDate(d.getDate() - 7)
      return d
    })
  }

  function goToNextWeek() {
    setWeekStart((ws) => {
      const d = new Date(ws)
      d.setDate(d.getDate() + 7)
      return d
    })
  }

  function handleYearSelect(y: number, m: number) {
    setYear(y)
    setMonth(m)
    setIsYearPickerOpen(false)
  }

  const weekEndDate = new Date(weekStart)
  weekEndDate.setDate(weekEndDate.getDate() + 6)

  return (
    <>
      {/* Tab switcher */}
      <div className="flex gap-1 p-1 mx-4 mb-4 bg-caldelo-surface rounded-pill">
        {(['week', 'month'] as Tab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 h-8 rounded-pill text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'bg-white text-caldelo-ink shadow-sm'
                : 'text-caldelo-secondary'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'week' ? (
        <>
          {/* Week navigation bar */}
          <div className="flex items-center justify-between px-4 mb-2">
            <button
              type="button"
              onClick={goToPrevWeek}
              aria-label="Previous week"
              className="w-9 h-9 flex items-center justify-center text-caldelo-secondary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span className="text-sm font-medium text-caldelo-ink">
              {weekStart.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              {' – '}
              {weekEndDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            <button
              type="button"
              onClick={goToNextWeek}
              aria-label="Next week"
              className="w-9 h-9 flex items-center justify-center text-caldelo-secondary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <WeekView weekStart={weekStart} householdId={householdId} members={members} />
        </>
      ) : (
        <MonthView
          year={year}
          month={month}
          householdId={householdId}
          members={members}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
          onDayTap={(date, evts) => setDaySheet({ date, events: evts })}
          onHeadingTap={() => setIsYearPickerOpen(true)}
        />
      )}

      <DayDetailSheet
        isOpen={daySheet !== null}
        date={daySheet?.date ?? null}
        events={daySheet?.events ?? []}
        members={members}
        onClose={() => setDaySheet(null)}
      />

      <YearPicker
        isOpen={isYearPickerOpen}
        currentYear={year}
        currentMonth={month}
        onSelect={handleYearSelect}
        onClose={() => setIsYearPickerOpen(false)}
      />
    </>
  )
}
