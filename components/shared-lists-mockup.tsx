const items = [
  { label: 'Milk',   done: true  },
  { label: 'Eggs',   done: true  },
  { label: 'Bread',  done: false },
  { label: 'Apples', done: false },
]

export function SharedListsMockup() {
  return (
    <div className="font-sans text-caldelo-ink">

      {/* Header bar */}
      <div className="bg-[#eef2ee] px-3 pt-2.5 pb-2 flex items-center justify-between">
        <span className="text-[9px] font-bold">Groceries</span>
        <div className="flex gap-1">
          <div className="w-5 h-5 rounded-full bg-caldelo-green flex items-center justify-center">
            <span className="text-white text-[13px] leading-none font-light">+</span>
          </div>
        </div>
      </div>

      <div className="px-3 py-2.5">
        {/* Subheader */}
        <p className="text-[7px] text-caldelo-muted uppercase tracking-widest font-bold mb-2">
          This week · 2 of 4 done
        </p>

        {/* List items */}
        <div className="space-y-1.5">
          {items.map(({ label, done }) => (
            <div key={label}
              className="bg-caldelo-surface rounded-[7px] px-2.5 py-2 flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                done
                  ? 'bg-caldelo-green border-caldelo-green'
                  : 'border-caldelo-border bg-white'
              }`}>
                {done && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className={`text-[9px] ${done ? 'line-through text-caldelo-muted' : 'text-caldelo-ink font-medium'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Add item row */}
        <div className="mt-2 rounded-[7px] border border-dashed border-caldelo-border px-2.5 py-2 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-caldelo-surface border border-caldelo-border flex items-center justify-center flex-shrink-0">
            <span className="text-caldelo-muted text-[10px] leading-none">+</span>
          </div>
          <span className="text-[9px] text-caldelo-muted">Add item…</span>
        </div>

        {/* Assigned by */}
        <div className="mt-3 flex items-center gap-1.5">
          <div className="flex -space-x-1">
            {['E', 'J'].map((initial, i) => (
              <div key={initial}
                className={`w-4 h-4 rounded-full border border-white flex items-center justify-center text-white text-[6px] font-bold flex-shrink-0 ${
                  i === 0 ? 'bg-caldelo-green' : 'bg-caldelo-blue'
                }`}>
                {initial}
              </div>
            ))}
          </div>
          <span className="text-[7px] text-caldelo-muted">Shared with Jamie</span>
        </div>
      </div>

    </div>
  )
}
