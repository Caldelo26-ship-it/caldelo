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
  const colorClass = memberIndex >= 0 ? (AVATAR_COLORS[memberIndex] ?? 'bg-caldelo-muted') : 'bg-caldelo-muted'

  const assigned = task !== null && ownerId !== null && owner !== null

  return (
    <button
      type="button"
      onClick={onTap}
      className={`rounded-[10px] p-3 min-h-[80px] flex flex-col justify-between text-left w-full ${
        assigned
          ? 'bg-caldelo-surface'
          : 'bg-amber-50 border border-amber-200'
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

  // Local optimistic owner IDs
  const [dropoffOwnerId, setDropoffOwnerId] = useState<string | null>(
    dropoffTask?.owner_id ?? null,
  )
  const [pickupOwnerId, setPickupOwnerId] = useState<string | null>(
    pickupTask?.owner_id ?? null,
  )

  const activeTask = sheetOpen === 'dropoff' ? dropoffTask : sheetOpen === 'pickup' ? pickupTask : null
  const sheetTitle = sheetOpen === 'dropoff' ? 'Assign Drop-off' : 'Assign Pick-up'

  async function handleReassign(ownerId: string | null) {
    if (!activeTask) return
    if (sheetOpen === 'dropoff') {
      setDropoffOwnerId(ownerId)
    } else {
      setPickupOwnerId(ownerId)
    }
    setSheetOpen(null)
    await onReassign(activeTask.id, ownerId)
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
            onTap={() => setSheetOpen('dropoff')}
          />
          <Slot
            label="Pick-up"
            task={pickupTask}
            ownerId={pickupOwnerId}
            members={members}
            onTap={() => setSheetOpen('pickup')}
          />
        </div>
      </div>

      <BottomSheet
        isOpen={sheetOpen !== null}
        onClose={() => setSheetOpen(null)}
        title={sheetTitle}
      >
        {members.map((m, i) => (
          <button
            key={m.id}
            onClick={() => handleReassign(m.id)}
            className="w-full flex items-center gap-3 py-3 border-b border-caldelo-border last:border-0"
          >
            <Avatar
              name={m.first_name}
              colorClass={AVATAR_COLORS[i] ?? 'bg-caldelo-muted'}
            />
            <span className="text-sm font-medium text-caldelo-ink">{m.first_name}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => handleReassign(null)}
          className="w-full text-left py-3 text-sm text-caldelo-muted min-h-[44px] flex items-center"
        >
          Unassigned
        </button>
      </BottomSheet>
    </>
  )
}
