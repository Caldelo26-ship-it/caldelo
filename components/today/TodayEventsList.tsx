'use client'

import { useState } from 'react'
import type { TodayEvent, HouseholdMember } from '@/lib/db/helpers'
import { BottomSheet } from '@/components/ui/BottomSheet'
import {
  updateEventOwnerAction,
  updateEventTimeAction,
  deleteEventAction,
} from '@/app/(app)/today/actions'

const AVATAR_COLORS = ['bg-caldelo-green', 'bg-caldelo-blue', 'bg-caldelo-coral'] as const

function Avatar({
  name,
  colorClass,
  small,
}: {
  name: string
  colorClass: string
  small?: boolean
}) {
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
  household: '#6B6B64',
  'evening-routines': '#5C7A9E',
  'health-wellbeing': '#4A7C59',
  'home-car-admin': '#6B6B64',
  'birthdays-anniversaries': '#c27b6a',
  'holidays-travel': '#5C7A9E',
}
const DEFAULT_COLOR = '#B0ACA6'

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function toTimeInputValue(isoString: string): string {
  const d = new Date(isoString)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

function applyTimeToDate(isoString: string, timeValue: string): string {
  const [hours, minutes] = timeValue.split(':').map(Number)
  const date = new Date(isoString)
  date.setHours(hours ?? 0, minutes ?? 0, 0, 0)
  return date.toISOString()
}

function titleCase(str: string): string {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

type TodayEventsListProps = {
  events: TodayEvent[]
  members: HouseholdMember[]
}

type SheetView = 'detail' | 'reassign'

export function TodayEventsList({ events, members }: TodayEventsListProps) {
  const [selectedEvent, setSelectedEvent] = useState<TodayEvent | null>(null)
  const [sheetView, setSheetView] = useState<SheetView>('detail')
  // undefined = use server value; string | null = optimistic override
  const [localOwnerId, setLocalOwnerId] = useState<string | null | undefined>(undefined)
  const [editingTime, setEditingTime] = useState(false)
  const [timeValue, setTimeValue] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const effectiveOwnerId =
    localOwnerId !== undefined ? localOwnerId : (selectedEvent?.owner_id ?? null)
  const owner = effectiveOwnerId != null ? members.find((m) => m.id === effectiveOwnerId) : null
  const ownerIndex = owner ? members.indexOf(owner) : -1
  const ownerColor =
    ownerIndex >= 0 ? (AVATAR_COLORS[ownerIndex] ?? 'bg-caldelo-muted') : 'bg-caldelo-muted'

  function openEvent(event: TodayEvent) {
    setSelectedEvent(event)
    setSheetView('detail')
    setLocalOwnerId(undefined)
    setEditingTime(false)
    setTimeValue(toTimeInputValue(event.starts_at))
    setConfirmDelete(false)
    setError(null)
  }

  function closeSheet() {
    setSelectedEvent(null)
    setSheetView('detail')
    setLocalOwnerId(undefined)
    setEditingTime(false)
    setConfirmDelete(false)
    setError(null)
  }

  async function handleReassign(ownerId: string | null) {
    if (!selectedEvent) return
    const prev = localOwnerId !== undefined ? localOwnerId : (selectedEvent.owner_id ?? null)
    setLocalOwnerId(ownerId)
    setSheetView('detail')
    setError(null)
    try {
      await updateEventOwnerAction(selectedEvent.id, ownerId)
    } catch {
      setLocalOwnerId(prev)
      setError("Something didn't save. Try again.")
    }
  }

  async function handleSaveTime() {
    if (!selectedEvent || !timeValue) return
    const oldMs = new Date(selectedEvent.starts_at).getTime()
    const newStartsAt = applyTimeToDate(selectedEvent.starts_at, timeValue)
    const deltaMs = new Date(newStartsAt).getTime() - oldMs
    const newEndsAt = selectedEvent.ends_at
      ? new Date(new Date(selectedEvent.ends_at).getTime() + deltaMs).toISOString()
      : null
    setEditingTime(false)
    setError(null)
    try {
      await updateEventTimeAction(selectedEvent.id, newStartsAt, newEndsAt)
    } catch {
      setError("Something didn't save. Try again.")
    }
  }

  async function handleDelete() {
    if (!selectedEvent) return
    setError(null)
    try {
      await deleteEventAction(selectedEvent.id)
      closeSheet()
    } catch {
      setError("Something didn't save. Try again.")
    }
  }

  return (
    <>
      <div className="bg-white mx-4 rounded-card shadow-sm overflow-hidden mb-3">
        <p className="px-4 py-3 text-xs font-semibold text-caldelo-muted uppercase tracking-wide border-b border-caldelo-border">
          Today&apos;s events
        </p>

        {events.length === 0 ? (
          <div className="px-4 py-8">
            <p className="text-sm text-caldelo-muted text-center">
              Nothing scheduled today — enjoy it.
            </p>
          </div>
        ) : (
          events.map((event) => {
            const eventOwner =
              event.owner_id != null ? members.find((m) => m.id === event.owner_id) : null
            const ownerIdx = eventOwner ? members.indexOf(eventOwner) : -1
            const color =
              ownerIdx >= 0 ? (AVATAR_COLORS[ownerIdx] ?? 'bg-caldelo-muted') : 'bg-caldelo-muted'

            return (
              <button
                key={event.id}
                type="button"
                onClick={() => openEvent(event)}
                className="flex items-center gap-3 px-4 py-3.5 border-b border-caldelo-border last:border-0 hover:bg-caldelo-surface transition-colors min-h-[56px] w-full text-left"
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
                {eventOwner && <Avatar name={eventOwner.first_name} colorClass={color} small />}
              </button>
            )
          })
        )}
      </div>

      <BottomSheet
        isOpen={selectedEvent !== null}
        onClose={closeSheet}
        title={sheetView === 'detail' ? selectedEvent?.title : 'Reassign'}
      >
        {selectedEvent && sheetView === 'detail' && (
          <div className="flex flex-col gap-4 pt-2">
            {/* Meta */}
            <div className="flex flex-col gap-1">
              <p className="text-sm text-caldelo-secondary">
                {formatTime(selectedEvent.starts_at)}
                {selectedEvent.ends_at ? ` – ${formatTime(selectedEvent.ends_at)}` : ''}
              </p>
              <p className="text-sm text-caldelo-secondary">{titleCase(selectedEvent.category)}</p>
            </div>

            {/* Assigned person */}
            <div className="flex items-center justify-between min-h-[44px]">
              <div className="flex items-center gap-2">
                {owner ? (
                  <>
                    <Avatar name={owner.first_name} colorClass={ownerColor} />
                    <span className="text-sm font-medium text-caldelo-ink">{owner.first_name}</span>
                  </>
                ) : (
                  <span className="text-sm text-caldelo-muted">Unassigned</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSheetView('reassign')}
                className="text-sm text-caldelo-green font-medium min-h-[44px] flex items-center px-2"
              >
                Reassign
              </button>
            </div>

            {/* Edit time */}
            {editingTime ? (
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={timeValue}
                  onChange={(e) => setTimeValue(e.target.value)}
                  className="flex-1 rounded-[10px] border border-caldelo-border px-3 py-2 text-sm text-caldelo-ink bg-transparent min-h-[44px]"
                />
                <button
                  type="button"
                  onClick={handleSaveTime}
                  className="h-11 px-4 rounded-pill bg-caldelo-green text-white text-sm font-medium flex-shrink-0"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTime(false)}
                  className="h-11 px-3 rounded-pill bg-caldelo-surface text-caldelo-secondary text-sm flex-shrink-0"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setEditingTime(true)}
                className="w-full h-11 rounded-pill border border-caldelo-border text-caldelo-secondary text-sm font-medium"
              >
                Edit time
              </button>
            )}

            {/* Inline error */}
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            {/* Delete */}
            {confirmDelete ? (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="flex-1 h-11 rounded-pill bg-caldelo-surface text-caldelo-secondary text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 h-11 rounded-pill bg-red-500 text-white text-sm font-medium"
                >
                  Delete event
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="w-full text-sm text-caldelo-muted min-h-[44px] flex items-center justify-center"
              >
                Delete
              </button>
            )}
          </div>
        )}

        {selectedEvent && sheetView === 'reassign' && (
          <div className="flex flex-col pt-2">
            <button
              type="button"
              onClick={() => setSheetView('detail')}
              className="text-sm text-caldelo-green font-medium min-h-[44px] flex items-center mb-1"
            >
              ← Back
            </button>
            {members.map((m, i) => {
              const color = AVATAR_COLORS[i] ?? 'bg-caldelo-muted'
              const isSelected = effectiveOwnerId === m.id
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleReassign(m.id)}
                  className="flex items-center gap-3 py-4 border-b border-caldelo-border last:border-0 min-h-[64px] w-full text-left"
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
              className="w-full text-left py-4 text-sm text-caldelo-muted min-h-[64px] flex items-center"
            >
              Unassigned
            </button>
          </div>
        )}
      </BottomSheet>
    </>
  )
}
