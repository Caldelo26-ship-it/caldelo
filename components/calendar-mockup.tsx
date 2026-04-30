import { StatusBar } from './ui/status-bar'

const DAYS = [
  { short: 'M', num: '20' },
  { short: 'T', num: '21', today: true },
  { short: 'W', num: '22' },
  { short: 'T', num: '23' },
  { short: 'F', num: '24' },
  { short: 'S', num: '25' },
  { short: 'S', num: '26' },
]

const events = [
  { day: 0, slot: 0, label: 'School run',   color: 'bg-caldelo-green/20 text-caldelo-green' },
  { day: 1, slot: 0, label: 'School run',   color: 'bg-caldelo-green/20 text-caldelo-green' },
  { day: 1, slot: 2, label: 'Football',     color: 'bg-caldelo-blue/20 text-caldelo-blue' },
  { day: 2, slot: 0, label: 'School run',   color: 'bg-caldelo-green/20 text-caldelo-green' },
  { day: 2, slot: 3, label: "Dad's mtg",    color: 'bg-amber-100 text-amber-700' },
  { day: 3, slot: 1, label: 'Ballet',       color: 'bg-purple-100 text-purple-700' },
  { day: 4, slot: 2, label: 'Swimming',     color: 'bg-caldelo-coral/20 text-caldelo-coral' },
  { day: 5, slot: 1, label: 'Park trip',    color: 'bg-amber-100 text-amber-700' },
  { day: 5, slot: 3, label: 'Family lunch', color: 'bg-caldelo-green/20 text-caldelo-green' },
]

const TIME_SLOTS = ['8am', '10am', '12pm', '2pm', '4pm']

export function CalendarMockup() {
  return (
    <div className="font-sans text-caldelo-ink h-full flex flex-col">

      <StatusBar bg="bg-[#eef2ee]" />

      {/* Header */}
      <div className="bg-[#eef2ee] px-4 pb-3 pt-1">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[13px] font-bold">May 2025</p>
          <div className="flex gap-1">
            <div className="w-5 h-5 rounded-md bg-white border border-caldelo-border flex items-center justify-center text-[9px] text-caldelo-secondary">‹</div>
            <div className="w-5 h-5 rounded-md bg-white border border-caldelo-border flex items-center justify-center text-[9px] text-caldelo-secondary">›</div>
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-0.5">
          {DAYS.map(({ short, num, today }) => (
            <div key={num} className="flex flex-col items-center">
              <span className="text-[7px] text-caldelo-muted font-medium mb-0.5">{short}</span>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${
                today ? 'bg-caldelo-green text-white' : 'text-caldelo-secondary'
              }`}>
                {num}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time grid */}
      <div className="flex-1 bg-caldelo-white overflow-hidden px-2 py-2">
        {TIME_SLOTS.map((time, row) => (
          <div key={time} className="flex gap-0.5 mb-1">
            {/* Time label */}
            <div className="w-7 pt-0.5 flex-shrink-0">
              <span className="text-[6px] text-caldelo-muted">{time}</span>
            </div>
            {/* Day columns */}
            {DAYS.map((_, col) => {
              const ev = events.find(e => e.day === col && e.slot === row)
              return (
                <div key={col} className="flex-1 h-[28px] rounded relative">
                  {ev ? (
                    <div className={`absolute inset-0 rounded text-[5.5px] font-semibold flex items-center px-1 ${ev.color}`}>
                      <span className="truncate">{ev.label}</span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 border-b border-caldelo-border/40" />
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="bg-caldelo-white border-t border-caldelo-border px-4 py-2">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {[
            { label: 'You',    dot: 'bg-caldelo-green'  },
            { label: 'Jamie',  dot: 'bg-caldelo-blue'   },
            { label: 'Kids',   dot: 'bg-purple-400'     },
            { label: 'Events', dot: 'bg-amber-400'      },
          ].map(({ label, dot }) => (
            <div key={label} className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${dot}`} />
              <span className="text-[6.5px] text-caldelo-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
