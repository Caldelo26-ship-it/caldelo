'use client'

import { useRouter } from 'next/navigation'
import type { StepProps } from '../page'

export default function Step7Done({ data }: StepProps) {
  const router = useRouter()

  const regionDisplay =
    data.region.length > 0
      ? data.region.charAt(0).toUpperCase() + data.region.slice(1)
      : null

  const childrenDisplay =
    data.children.length > 0
      ? `${data.children.length} ${data.children.length === 1 ? 'child' : 'children'} added`
      : null

  const eventsDisplay =
    data.selectedEvents.length > 0
      ? `${data.selectedEvents.length} ${data.selectedEvents.length === 1 ? 'event' : 'events'} added`
      : null

  return (
    <div className="space-y-6 w-full text-center">
      <div className="w-20 h-20 rounded-full bg-caldelo-green/15 flex items-center justify-center mx-auto mb-8">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          stroke="#4a7c59"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 18l8 8L30 10" />
        </svg>
      </div>

      <h2 className="font-display text-4xl font-bold text-caldelo-ink">
        You&apos;re all set.
      </h2>

      <div className="space-y-1.5">
        {eventsDisplay && (
          <p className="text-caldelo-secondary text-base">{eventsDisplay}</p>
        )}
        {regionDisplay && (
          <p className="text-caldelo-secondary text-base">
            School region: {regionDisplay}
          </p>
        )}
        {childrenDisplay && (
          <p className="text-caldelo-secondary text-base">{childrenDisplay}</p>
        )}
        {!eventsDisplay && !regionDisplay && !childrenDisplay && (
          <p className="text-caldelo-secondary text-base">
            Your household is ready.
          </p>
        )}
      </div>

      <button
        onClick={() => router.push('/today')}
        className="w-full h-[56px] rounded-pill bg-caldelo-green text-white text-base font-semibold hover:opacity-90 transition-opacity mt-8"
      >
        See this week →
      </button>

      <p className="text-caldelo-muted text-sm">Your family calendar is ready.</p>
    </div>
  )
}
