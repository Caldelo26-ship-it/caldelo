import { StatusBar } from './ui/status-bar'

export function TodayViewMockup() {
  return (
    <div className="font-sans text-caldelo-ink h-full flex flex-col">

      <StatusBar bg="bg-[#eef2ee]" />

      {/* Greeting bar */}
      <div className="bg-[#eef2ee] px-4 pt-1 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-caldelo-green flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">E</span>
          </div>
          <span className="text-[9px] text-caldelo-secondary font-medium">Good morning, Emma</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-white border border-caldelo-border flex items-center justify-center">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#6b6b64" strokeWidth="1.8" strokeLinecap="round">
            <path d="M8 1a5 5 0 0 1 5 5c0 5-2 7-2 7H3S1 11 1 6a5 5 0 0 1 5-5z"/>
            <path d="M9.5 13.5a1.5 1.5 0 0 1-3 0"/>
          </svg>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 bg-caldelo-white space-y-3 overflow-hidden">

        {/* Date header */}
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-[14px] font-bold text-caldelo-ink leading-tight">Today</p>
            <p className="text-[9px] text-caldelo-muted mt-0.5">Tuesday, 21 May</p>
          </div>
          <div className="border border-caldelo-border rounded-md px-2.5 py-1">
            <span className="text-[8px] text-caldelo-secondary font-medium">Week view</span>
          </div>
        </div>

        {/* School drop-off */}
        <div className="bg-caldelo-surface rounded-xl px-3 py-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] text-caldelo-muted mb-0.5">8:30am</p>
              <p className="text-[11px] font-semibold text-caldelo-ink leading-tight">School drop-off</p>
              <p className="text-[8px] text-caldelo-secondary mt-0.5">Zara &amp; Jake</p>
            </div>
            <span className="text-[8px] bg-caldelo-green/15 text-caldelo-green font-semibold rounded-full px-2.5 py-1">You ✓</span>
          </div>
        </div>

        {/* Jamie pickup */}
        <div className="bg-caldelo-surface rounded-xl px-3 py-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] text-caldelo-muted mb-0.5">3:15pm</p>
              <p className="text-[11px] font-semibold text-caldelo-ink leading-tight">Jamie pickup 3:15</p>
              <p className="text-[8px] text-caldelo-secondary mt-0.5">Jake</p>
            </div>
            <span className="text-[8px] bg-caldelo-blue/15 text-caldelo-blue font-semibold rounded-full px-2.5 py-1">Jamie ✓</span>
          </div>
        </div>

        {/* Swimming — urgent */}
        <div className="rounded-xl overflow-hidden border border-caldelo-coral/20">
          <div className="bg-caldelo-coral/10 px-3 py-1.5 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-caldelo-coral" />
            <span className="text-[8px] text-caldelo-coral font-bold uppercase tracking-wider">Needs cover · 5:00pm</span>
          </div>
          <div className="bg-[#fff8f6] px-3 py-3 flex items-start justify-between">
            <div>
              <p className="text-[9px] text-caldelo-muted mb-0.5">5:00 – 6:00pm</p>
              <p className="text-[11px] font-semibold text-caldelo-ink leading-tight">Swimming 5pm</p>
              <p className="text-[8px] text-caldelo-secondary mt-0.5">Zara</p>
            </div>
            <span className="text-[8px] bg-caldelo-coral/20 text-caldelo-coral font-semibold rounded-full px-2.5 py-1">Needed</span>
          </div>
        </div>

        {/* PE kit reminder */}
        <div className="bg-amber-50 border border-amber-200/70 rounded-xl px-3 py-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-amber-800 leading-tight">PE kit tomorrow</p>
            <p className="text-[8px] text-amber-600 mt-0.5">Don&apos;t forget trainers</p>
          </div>
          <span className="text-[8px] bg-amber-100 text-amber-700 font-semibold rounded-full px-2.5 py-1">Reminder</span>
        </div>

      </div>

      {/* Bottom nav */}
      <div className="border-t border-caldelo-border bg-caldelo-white px-2 py-2 flex justify-around">
        {[
          { label: 'Home', active: false },
          { label: 'Calendar', active: true },
          { label: 'Tasks', active: false },
          { label: 'People', active: false },
        ].map(({ label, active }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div className={`w-5 h-5 rounded-md ${active ? 'bg-caldelo-green/20' : 'bg-caldelo-surface'}`} />
            <span className={`text-[7px] ${active ? 'text-caldelo-green font-bold' : 'text-caldelo-muted'}`}>{label}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
