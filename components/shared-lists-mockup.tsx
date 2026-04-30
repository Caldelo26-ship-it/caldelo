import { StatusBar } from './ui/status-bar'

const items = [
  { label: 'Milk (2 pints)',   done: true  },
  { label: 'Eggs',             done: true  },
  { label: 'Bread',            done: false },
  { label: 'Apples',           done: false },
  { label: 'Jake\'s lunch box', done: false },
]

export function SharedListsMockup() {
  return (
    <div className="font-sans text-caldelo-ink h-full flex flex-col">

      <StatusBar bg="bg-[#eef2ee]" />

      {/* Header */}
      <div className="bg-[#eef2ee] px-4 pb-3 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-bold text-caldelo-ink">Groceries</p>
            <p className="text-[9px] text-caldelo-secondary mt-0.5">Shared with Jamie · 2 of 5 done</p>
          </div>
          <div className="w-6 h-6 rounded-full bg-caldelo-green flex items-center justify-center">
            <span className="text-white text-[14px] leading-none font-light">+</span>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-caldelo-white px-4 py-4 space-y-2 overflow-hidden">
        {items.map(({ label, done }) => (
          <div key={label}
            className="bg-caldelo-surface rounded-xl px-4 py-3 flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              done ? 'bg-caldelo-green border-caldelo-green' : 'border-caldelo-border bg-white'
            }`}>
              {done && (
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className={`text-[10px] font-medium ${done ? 'line-through text-caldelo-muted' : 'text-caldelo-ink'}`}>
              {label}
            </span>
          </div>
        ))}

        {/* Add item */}
        <div className="rounded-xl border border-dashed border-caldelo-border px-4 py-3 flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-caldelo-border bg-white flex items-center justify-center flex-shrink-0">
            <span className="text-caldelo-muted text-[11px] leading-none">+</span>
          </div>
          <span className="text-[10px] text-caldelo-muted">Add item…</span>
        </div>
      </div>

      {/* Shared avatars */}
      <div className="bg-caldelo-white border-t border-caldelo-border px-4 py-2.5 flex items-center gap-2">
        <div className="flex -space-x-1.5">
          {[{ i: 'E', bg: 'bg-caldelo-green' }, { i: 'J', bg: 'bg-caldelo-blue' }].map(({ i, bg }) => (
            <div key={i} className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-white text-[7px] font-bold ${bg}`}>{i}</div>
          ))}
        </div>
        <span className="text-[8px] text-caldelo-muted">Emma &amp; Jamie</span>
      </div>

    </div>
  )
}
