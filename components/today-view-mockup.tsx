export function TodayViewMockup() {
  return (
    <div className="font-sans text-caldelo-ink">

      {/* Greeting bar */}
      <div className="bg-[#eef2ee] px-3 pt-2.5 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-caldelo-green flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[7px] font-bold">E</span>
          </div>
          <span className="text-[8px] text-caldelo-secondary">Good morning, Emma</span>
        </div>
        <div className="flex gap-1">
          <div className="w-5 h-5 rounded-full bg-white border border-caldelo-border flex items-center justify-center">
            <svg width="9" height="9" viewBox="0 0 16 16" fill="none" stroke="#6b6b64" strokeWidth="1.8" strokeLinecap="round">
              <path d="M8 1a5 5 0 0 1 5 5c0 5-2 7-2 7H3S1 11 1 6a5 5 0 0 1 5-5z"/>
              <path d="M9.5 13.5a1.5 1.5 0 0 1-3 0"/>
            </svg>
          </div>
          <div className="w-5 h-5 rounded-full bg-caldelo-green flex items-center justify-center">
            <span className="text-white text-[13px] leading-none font-light">+</span>
          </div>
        </div>
      </div>

      <div className="px-3 py-2.5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[13px] font-bold leading-tight">Today</p>
            <p className="text-[8px] text-caldelo-muted">Tuesday, 21 May</p>
          </div>
          <div className="border border-caldelo-border rounded-[5px] px-2 py-0.5 mt-0.5">
            <span className="text-[7px] text-caldelo-secondary">View week</span>
          </div>
        </div>

        {/* Events */}
        <div className="space-y-1.5">

          {/* School drop-off */}
          <div className="bg-caldelo-surface rounded-[7px] px-2.5 py-2 flex items-center justify-between">
            <div>
              <p className="text-[8px] text-caldelo-secondary leading-tight">School drop-off</p>
              <p className="text-[9px] font-semibold leading-tight">8:30am</p>
              <p className="text-[7px] text-caldelo-muted">Zara &amp; Jake</p>
            </div>
            <span className="text-[7px] bg-caldelo-green/15 text-caldelo-green font-medium rounded-full px-2 py-0.5 whitespace-nowrap">You ✓</span>
          </div>

          {/* Jamie pickup */}
          <div className="bg-caldelo-surface rounded-[7px] px-2.5 py-2 flex items-center justify-between">
            <div>
              <p className="text-[8px] text-caldelo-secondary leading-tight">Jamie pickup 3:15</p>
              <p className="text-[9px] font-semibold leading-tight">3:15pm</p>
              <p className="text-[7px] text-caldelo-muted">Jake</p>
            </div>
            <span className="text-[7px] bg-caldelo-blue/15 text-caldelo-blue font-medium rounded-full px-2 py-0.5 whitespace-nowrap">Jamie ✓</span>
          </div>

          {/* Football — urgent */}
          <div className="rounded-[7px] overflow-hidden">
            <div className="bg-caldelo-coral/15 px-2.5 py-0.5">
              <span className="text-[6px] text-caldelo-coral font-bold uppercase tracking-widest">AT 5:00PM · NEEDED</span>
            </div>
            <div className="bg-[#fff3f0] px-2.5 py-2 flex items-center justify-between">
              <div>
                <p className="text-[8px] text-caldelo-secondary leading-tight">Swimming 5pm</p>
                <p className="text-[9px] font-semibold leading-tight">5:00 – 6:00pm</p>
                <p className="text-[7px] text-caldelo-muted">Zara</p>
              </div>
              <span className="text-[7px] bg-caldelo-coral/20 text-caldelo-coral font-medium rounded-full px-2 py-0.5">Needed</span>
            </div>
          </div>

          {/* PE kit reminder */}
          <div className="bg-amber-50 border border-amber-200 rounded-[7px] px-2.5 py-2 flex items-center justify-between">
            <div>
              <p className="text-[8px] text-amber-700 leading-tight font-medium">PE kit tomorrow</p>
              <p className="text-[7px] text-amber-600">Don&apos;t forget trainers</p>
            </div>
            <span className="text-[7px] bg-amber-100 text-amber-700 font-medium rounded-full px-2 py-0.5 whitespace-nowrap">Reminder</span>
          </div>

        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-caldelo-border px-1 py-1.5 flex justify-around">
        {[
          { label: 'Home',     active: false },
          { label: 'Calendar', active: true  },
          { label: 'Tasks',    active: false },
          { label: 'People',   active: false },
          { label: 'More',     active: false },
        ].map(({ label, active }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <div className={`w-4 h-4 rounded-[3px] ${active ? 'bg-caldelo-green/20' : 'bg-caldelo-surface'}`} />
            <span className={`text-[6px] ${active ? 'text-caldelo-green font-semibold' : 'text-caldelo-muted'}`}>{label}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
