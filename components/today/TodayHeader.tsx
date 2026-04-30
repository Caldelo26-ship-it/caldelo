'use client'

import type { HouseholdMember } from '@/lib/db/helpers'

const AVATAR_COLORS = ['bg-caldelo-green', 'bg-caldelo-blue', 'bg-caldelo-coral'] as const

function Avatar({ name, colorClass }: { name: string; colorClass: string }) {
  return (
    <div
      className={`w-8 h-8 rounded-full ${colorClass} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

type TodayHeaderProps = {
  householdName: string
  members: HouseholdMember[]
  /** Today's formatted date string, e.g. "Tuesday, 30 April" */
  dateString: string
}

export function TodayHeader({ householdName, members, dateString }: TodayHeaderProps) {
  return (
    <header className="bg-caldelo-white px-5 pt-5 pb-4 flex items-start justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold text-caldelo-ink">{dateString}</h1>
        <p className="text-sm text-caldelo-muted mt-0.5">{householdName}</p>
      </div>
      <div className="flex -space-x-2">
        {members.slice(0, 2).map((m, i) => (
          <Avatar
            key={m.id}
            name={m.first_name}
            colorClass={AVATAR_COLORS[i] ?? 'bg-caldelo-muted'}
          />
        ))}
      </div>
    </header>
  )
}
