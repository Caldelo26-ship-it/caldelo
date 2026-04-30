'use client'

import { useState } from 'react'
import type { StepProps } from '../page'

export type EventItem = {
  id: string
  label: string
}

export type EventCategory = {
  id: string
  label: string
  icon: string
  items: EventItem[]
}

export const EVENT_CATEGORIES: EventCategory[] = [
  {
    id: 'school-runs',
    label: 'School Runs',
    icon: '🚗',
    items: [
      { id: 'school-morning-drop', label: 'Morning drop-off' },
      { id: 'school-afternoon-pickup', label: 'Afternoon pick-up' },
      { id: 'school-activity-transport', label: 'After-school activities transport' },
    ],
  },
  {
    id: 'clubs-activities',
    label: 'Clubs & Activities',
    icon: '⚽',
    items: [
      { id: 'club-football', label: 'Football / sports practice' },
      { id: 'club-swimming', label: 'Swimming lessons' },
      { id: 'club-dance-drama', label: 'Dance / drama / gymnastics' },
      { id: 'club-music', label: 'Music lessons' },
    ],
  },
  {
    id: 'household',
    label: 'Household',
    icon: '🏠',
    items: [
      { id: 'house-food-shop', label: 'Weekly food shop' },
      { id: 'house-meal-plan', label: 'Meal planning' },
      { id: 'house-laundry', label: 'Laundry' },
      { id: 'house-cleaning', label: 'Cleaning' },
    ],
  },
  {
    id: 'evening-routines',
    label: 'Evening Routines',
    icon: '🌙',
    items: [
      { id: 'eve-homework', label: 'Homework help' },
      { id: 'eve-bedtime', label: 'Bedtime routine' },
      { id: 'eve-bath', label: 'Bath time' },
      { id: 'eve-reading', label: 'Reading together' },
    ],
  },
  {
    id: 'health-wellbeing',
    label: 'Health & Wellbeing',
    icon: '💊',
    items: [
      { id: 'health-doctor', label: 'Doctor appointments' },
      { id: 'health-dentist', label: 'Dentist / optician' },
      { id: 'health-medication', label: 'Medication reminders' },
    ],
  },
  {
    id: 'home-car-admin',
    label: 'Home & Car Admin',
    icon: '🔧',
    items: [
      { id: 'admin-car-service', label: 'Car service / MOT' },
      { id: 'admin-insurance', label: 'Home / car insurance renewal' },
      { id: 'admin-boiler', label: 'Boiler / home maintenance' },
    ],
  },
  {
    id: 'birthdays-anniversaries',
    label: 'Birthdays & Anniversaries',
    icon: '🎂',
    items: [
      { id: 'bday-family', label: 'Family birthdays' },
      { id: 'bday-friends', label: "Friends' birthdays" },
      { id: 'bday-anniversary', label: 'Anniversary reminders' },
    ],
  },
  {
    id: 'holidays-travel',
    label: 'Holidays & Travel',
    icon: '✈️',
    items: [
      { id: 'holiday-school', label: 'School holiday planning' },
      { id: 'holiday-family', label: 'Family holiday' },
      { id: 'holiday-day-trips', label: 'Day trips' },
    ],
  },
]

export default function Step5Events({ data, onNext, onBack }: StepProps) {
  const [selectedEvents, setSelectedEvents] = useState<string[]>(
    data.selectedEvents ?? []
  )
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  function toggleItem(id: string) {
    setSelectedEvents(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    )
  }

  function toggleExpanded(id: string) {
    setExpandedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  function handleNext() {
    onNext({ selectedEvents })
  }

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2">
        <h2 className="font-display text-3xl font-bold text-caldelo-ink">
          What does your week usually involve?
        </h2>
        <p className="text-caldelo-secondary text-base">
          Pick everything that applies — you can add more later.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {EVENT_CATEGORIES.map(cat => {
          const isExpanded = expandedCategories.includes(cat.id)
          const selectedCount = cat.items.filter(item =>
            selectedEvents.includes(item.id)
          ).length

          return (
            <div
              key={cat.id}
              className={`rounded-card border p-4 transition-all ${
                isExpanded
                  ? 'border-caldelo-green/30 bg-caldelo-tint col-span-2'
                  : 'border-caldelo-border bg-white hover:border-caldelo-green/50 cursor-pointer'
              }`}
            >
              <button
                onClick={() => toggleExpanded(cat.id)}
                className="flex items-center gap-2 w-full text-left mb-2"
                aria-expanded={isExpanded}
                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${cat.label}`}
              >
                <span className="text-2xl" aria-hidden="true">{cat.icon}</span>
                <span className="text-sm font-medium text-caldelo-ink flex-1">{cat.label}</span>
                {selectedCount > 0 && !isExpanded && (
                  <span className="text-xs font-medium text-caldelo-green bg-caldelo-tint border border-caldelo-green/30 rounded-pill px-2 py-0.5">
                    {selectedCount} selected
                  </span>
                )}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  className={`text-caldelo-muted transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {isExpanded && (
                <div className="mt-1 space-y-0.5">
                  {cat.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className="flex items-center gap-3 w-full py-2 text-sm text-caldelo-ink hover:text-caldelo-green transition-colors text-left min-h-[44px]"
                      aria-pressed={selectedEvents.includes(item.id)}
                      aria-label={item.label}
                    >
                      <div
                        className={`w-5 h-5 rounded-[4px] flex items-center justify-center flex-shrink-0 transition-colors ${
                          selectedEvents.includes(item.id)
                            ? 'bg-caldelo-green'
                            : 'bg-white border border-caldelo-border'
                        }`}
                        aria-hidden="true"
                      >
                        {selectedEvents.includes(item.id) && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                            <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          aria-label="Go back to previous step"
          className="h-[52px] px-6 rounded-pill border border-caldelo-border text-caldelo-ink text-sm font-medium hover:bg-caldelo-surface transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          aria-label={selectedEvents.length > 0 ? 'Continue to next step' : 'Skip event selection and continue'}
          className="flex-1 h-[52px] rounded-pill bg-caldelo-green text-white text-base font-semibold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#4A7C59' }}
        >
          {selectedEvents.length > 0 ? 'Next →' : 'Skip for now →'}
        </button>
      </div>
    </div>
  )
}
