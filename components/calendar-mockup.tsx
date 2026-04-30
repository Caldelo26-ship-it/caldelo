const DAYS = ['Mon 20', 'Tue 21', 'Wed 22', 'Thu 23', 'Fri 24', 'Sat 25', 'Sun 26']

interface Event {
  day: number
  start: number
  span: number
  label: string
  color: 'green' | 'blue' | 'purple' | 'amber' | 'coral'
  short: string
}

const EVENTS: Event[] = [
  { day: 0, start: 1, span: 1, label: 'School run', color: 'green', short: 'School run' },
  { day: 1, start: 1, span: 1, label: 'School run', color: 'green', short: 'School run' },
  { day: 2, start: 1, span: 1, label: 'School run', color: 'green', short: 'School run' },
  { day: 3, start: 1, span: 1, label: 'School run', color: 'green', short: 'School run' },
  { day: 4, start: 1, span: 1, label: 'School run', color: 'green', short: 'School run' },
  { day: 1, start: 3, span: 2, label: 'Football practice', color: 'blue', short: 'Football' },
  { day: 3, start: 2, span: 1, label: "Zara's ballet", color: 'purple', short: 'Ballet' },
  { day: 2, start: 4, span: 1, label: "Dad's meeting", color: 'amber', short: 'Meeting' },
  { day: 4, start: 3, span: 2, label: 'Swimming lesson', color: 'coral', short: 'Swimming' },
  { day: 5, start: 2, span: 2, label: 'Park trip', color: 'amber', short: 'Park' },
]

const COLOR_MAP = {
  green:  { bg: 'bg-caldelo-green/20',  text: 'text-caldelo-green'  },
  blue:   { bg: 'bg-caldelo-blue/20',   text: 'text-caldelo-blue'   },
  purple: { bg: 'bg-purple-100',        text: 'text-purple-700'     },
  amber:  { bg: 'bg-amber-100',         text: 'text-amber-700'      },
  coral:  { bg: 'bg-caldelo-coral/20',  text: 'text-caldelo-coral'  },
}

const TIMES = ['8am', '10am', '12pm', '2pm', '4pm']

export function CalendarMockup() {
  return (
    <div className="font-sans text-caldelo-ink text-[7px] select-none">

      {/* Month header */}
      <div className="bg-[#eef2ee] px-2.5 pt-2 pb-1.5 flex items-center justify-between mb-1">
        <span className="text-[9px] font-bold">May 2025</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 rounded bg-white border border-caldelo-border flex items-center justify-center text-[8px] text-caldelo-secondary">‹</div>
          <div className="w-4 h-4 rounded bg-white border border-caldelo-border flex items-center justify-center text-[8px] text-caldelo-secondary">›</div>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-px bg-caldelo-border border border-caldelo-border rounded-t overflow-hidden mb-px">
        {DAYS.map((d, i) => (
          <div key={d}
            className={`text-center py-1 text-[6px] font-semibold leading-tight ${
              i === 1 ? 'bg-caldelo-green text-white' : 'bg-caldelo-surface text-caldelo-secondary'
            }`}>
            <div>{d.split(' ')[0]}</div>
            <div className={`text-[8px] font-bold ${i === 1 ? 'text-white' : 'text-caldelo-ink'}`}>
              {d.split(' ')[1]}
            </div>
          </div>
        ))}
      </div>

      {/* All-day row */}
      <div className="grid grid-cols-7 gap-px bg-caldelo-border border-x border-caldelo-border mb-px">
        {DAYS.map((d, i) => (
          <div key={d} className="bg-caldelo-white py-1 px-0.5 min-h-[12px]">
            {i === 3 && (
              <div className="rounded bg-amber-100 text-amber-700 text-[5px] font-medium px-0.5 py-px truncate">
                Birthday
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="border border-caldelo-border rounded-b overflow-hidden">
        {TIMES.map((time, row) => (
          <div key={time} className="grid grid-cols-7 gap-px bg-caldelo-border border-b border-caldelo-border last:border-b-0">
            {/* Time label col */}
            {DAYS.map((_, col) => {
              const event = EVENTS.find(e => e.day === col && e.start === row + 1)
              const occupied = EVENTS.some(e => e.day === col && e.start < row + 1 && e.start + e.span > row + 1)

              return (
                <div key={col} className="bg-caldelo-white relative" style={{ height: 22 }}>
                  {col === 0 && (
                    <span className="absolute -left-px top-0.5 text-[5px] text-caldelo-muted whitespace-nowrap" style={{ fontSize: 5 }}>
                      {time}
                    </span>
                  )}
                  {event && (
                    <div
                      className={`absolute inset-x-0.5 top-0.5 rounded text-[5px] font-medium px-0.5 py-px overflow-hidden ${COLOR_MAP[event.color].bg} ${COLOR_MAP[event.color].text}`}
                      style={{ height: event.span * 22 - 4 }}>
                      <div className="truncate leading-tight">{event.short}</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1.5 px-0.5">
        {[
          { label: 'You',       color: 'bg-caldelo-green'  },
          { label: 'Jamie',     color: 'bg-caldelo-blue'   },
          { label: 'Kids',      color: 'bg-purple-400'     },
          { label: 'Events',    color: 'bg-amber-400'      },
          { label: 'Reminders', color: 'bg-caldelo-coral'  },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-0.5">
            <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
            <span className="text-caldelo-muted" style={{ fontSize: 5 }}>{label}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
