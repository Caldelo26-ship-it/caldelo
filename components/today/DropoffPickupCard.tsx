'use client'

import { useState } from 'react'
import type { Task, HouseholdMember } from '@/lib/db/helpers'
import { BottomSheet } from '@/components/ui/BottomSheet'

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

type DropoffPickupCardProps = {
  dropoffTask: Task | null
  pickupTask: Task | null
  members: HouseholdMember[]
  onReassign: (taskId: string, ownerId: string | null) => Promise<void>
}

type SlotKey = 'dropoff' | 'pickup'

type SlotProps = {
  label: string
  task: Task | null
  ownerId: string | null
  members: HouseholdMember[]
  onTap: () => void
}

function Slot({ label, task, ownerId, members, onTap }: SlotProps) {
  const owner = ownerId != null ? members.find((m) => m.id === ownerId) : null
  const memberIndex = owner ? members.indexOf(owner) : -1
  const colorClass =
    memberIndex >= 0 ? (AVATAR_COLORS[memberIndex] ?? 'bg-caldelo-muted') : 'bg-caldelo-muted'

  const assigned = task !== null && ownerId !== null && owner !== null

  return (
    <button
      type="button"
      onClick={onTap}
      className={`rounded-[10px] p-3 min-h-[80px] flex flex-col justify-between text-left w-full ${
        assigned ? 'bg-caldelo-surface' : 'bg-amber-50 border border-amber-200'
      }`}
    >
      <span className="text-xs text-caldelo-muted">{label}</span>
      {assigned && owner ? (
        <div className="flex items-center gap-2 mt-2">
          <Avatar name={owner.first_name} colorClass={colorClass} />
          <span className="text-sm font-medium text-caldelo-ink">{owner.first_name}</span>
        </div>
      ) : (
        <span className="text-sm text-amber-700 mt-2">Tap to assign</span>
      )}
    </button>
  )
}

export function DropoffPickupCard({
  dropoffTask,
  pickupTask,
  members,
  onReassign,
}: DropoffPickupCardProps) {
  const [sheetOpen, setSheetOpen] = useState<SlotKey | null>(null)
  const [dropoffOwnerId, setDropoffOwnerId] = useState<string | null>(
    dropoffTask?.owner_id ?? null,
  )
  const [pickupOwnerId, setPickupOwnerId] = useState<string | null>(
    pickupTask?.owner_id ?? null,
  )
  const [error, setError] = useState<string | null>(null)

  const activeTask =
    sheetOpen === 'dropoff' ? dropoffTask : sheetOpen === 'pickup' ? pickupTask : null
  const activeOwnerId = sheetOpen === 'dropoff' ? dropoffOwnerId : pickupOwnerId
  const sheetTitle = sheetOpen === 'dropoff' ? 'Assign Drop-off' : 'Assign Pick-up'

  async function handleReassign(ownerId: string | null) {
    if (!activeTask) return
    const slot = sheetOpen
    const prev = slot === 'dropoff' ? dropoffOwnerId : pickupOwnerId
    if (slot === 'dropoff') {
      setDropoffOwnerId(ownerId)
    } else {
      setPickupOwnerId(ownerId)
    }
    setSheetOpen(null)
    setError(null)
    try {
      await onReassign(activeTask.id, ownerId)
    } catch {
      if (slot === 'dropoff') {
        setDropoffOwnerId(prev)
      } else {
        setPickupOwnerId(prev)
      }
      setError("Something didn't save. Try again.")
    }
  }

  return (
    <>
      <div className="bg-white rounded-card shadow-sm mx-4 mb-3 p-4">
        <p className="text-xs font-semibold text-caldelo-muted uppercase tracking-wide mb-3">
          School runs today
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Slot
            label="Drop-off"
            task={dropoffTask}
            ownerId={dropoffOwnerId}
            members={members}
            onTap={() => {
              setError(null)
              setSheetOpen('dropoff')
            }}
          />
          <Slot
            label="Pick-up"
            task={pickupTask}
            ownerId={pickupOwnerId}
            members={members}
            onTap={() => {
              setError(null)
              setSheetOpen('pickup')
            }}
          />
        </div>
        {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
      </div>

      <BottomSheet
        isOpen={sheetOpen !== null}
        onClose={() => setSheetOpen(null)}
        title={sheetTitle}
      >
        {members.map((m, i) => {
          const color = AVATAR_COLORS[i] ?? 'bg-caldelo-muted'
          const isSelected = activeOwnerId === m.id
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => handleReassign(m.id)}
              className="w-full flex items-center gap-3 py-4 border-b border-caldelo-border last:border-0 min-h-[72px]"
            >
              <div className="relative flex-shrink-0">
                <Avatar name={m.first_name} colorClass={color} />
                {isSelected && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-caldelo-green rounded-full flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4l2 2 3-3"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </div>
              <span className="text-sm font-medium text-caldelo-ink">{m.first_name}</span>
            </button>
          )
        })}
        <button
          type="button"
          onClick={() => handleReassign(null)}
          className="w-full text-left py-4 text-sm text-caldelo-muted min-h-[72px] flex items-center"
        >
          Unassigned
        </button>
      </BottomSheet>
    </>
  )
}
