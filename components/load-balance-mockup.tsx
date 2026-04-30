import { StatusBar } from './ui/status-bar'

export function LoadBalanceMockup() {
  return (
    <div className="font-sans text-caldelo-ink h-full flex flex-col">

      <StatusBar bg="bg-[#eef2ee]" />

      {/* Header */}
      <div className="bg-[#eef2ee] px-4 pb-3 pt-1">
        <p className="text-[13px] font-bold text-caldelo-ink">This week</p>
        <p className="text-[9px] text-caldelo-secondary mt-0.5">21–27 May · Task split</p>
      </div>

      <div className="flex-1 bg-caldelo-white px-4 py-4 space-y-4 overflow-hidden">

        {/* You */}
        <div className="bg-caldelo-surface rounded-xl px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-caldelo-green flex items-center justify-center">
                <span className="text-white text-[9px] font-bold">E</span>
              </div>
              <span className="text-[11px] font-semibold text-caldelo-ink">You (Emma)</span>
            </div>
            <span className="text-[10px] font-bold text-caldelo-green">14</span>
          </div>
          <div className="h-2.5 bg-caldelo-border rounded-full overflow-hidden">
            <div className="h-full bg-caldelo-green rounded-full" style={{ width: '70%' }} />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[7px] text-caldelo-muted">School runs, dinners, reminders</span>
            <span className="text-[7px] font-semibold text-caldelo-green">70%</span>
          </div>
        </div>

        {/* Jamie */}
        <div className="bg-caldelo-surface rounded-xl px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-caldelo-blue flex items-center justify-center">
                <span className="text-white text-[9px] font-bold">J</span>
              </div>
              <span className="text-[11px] font-semibold text-caldelo-ink">Jamie</span>
            </div>
            <span className="text-[10px] font-bold text-caldelo-blue">6</span>
          </div>
          <div className="h-2.5 bg-caldelo-border rounded-full overflow-hidden">
            <div className="h-full bg-caldelo-blue rounded-full" style={{ width: '30%' }} />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[7px] text-caldelo-muted">Pickups, football drop-off</span>
            <span className="text-[7px] font-semibold text-caldelo-blue">30%</span>
          </div>
        </div>

        {/* Unassigned callout */}
        <div className="border border-caldelo-coral/30 bg-[#fff8f6] rounded-xl px-4 py-3 flex items-start gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-caldelo-coral mt-1.5 flex-shrink-0" />
          <div>
            <p className="text-[9px] font-semibold text-caldelo-coral">3 tasks unassigned</p>
            <p className="text-[8px] text-caldelo-secondary mt-0.5">Swimming, nursery drop, Friday pickup</p>
          </div>
        </div>

      </div>

      {/* Bottom nav */}
      <div className="border-t border-caldelo-border bg-caldelo-white px-2 py-2 flex justify-around">
        {[
          { label: 'Home', active: false },
          { label: 'Balance', active: true },
          { label: 'Tasks', active: false },
          { label: 'People', active: false },
        ].map(({ label, active }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div className={`w-5 h-5 rounded-md ${active ? 'bg-caldelo-blue/20' : 'bg-caldelo-surface'}`} />
            <span className={`text-[7px] ${active ? 'text-caldelo-blue font-bold' : 'text-caldelo-muted'}`}>{label}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
