export function LoadBalanceMockup() {
  return (
    <div className="p-4 font-sans min-h-[230px]">
      <p className="text-[11px] font-bold text-caldelo-ink mb-0.5">This week</p>
      <p className="text-[9px] text-caldelo-secondary mb-4">Task split</p>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[9px] font-medium text-caldelo-ink">You</span>
            <span className="text-[9px] text-caldelo-secondary">14 tasks</span>
          </div>
          <div className="h-2 bg-caldelo-surface rounded-full overflow-hidden">
            <div className="h-full bg-caldelo-green rounded-full" style={{ width: '70%' }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[9px] font-medium text-caldelo-ink">Jamie</span>
            <span className="text-[9px] text-caldelo-secondary">6 tasks</span>
          </div>
          <div className="h-2 bg-caldelo-surface rounded-full overflow-hidden">
            <div className="h-full bg-caldelo-blue rounded-full" style={{ width: '30%' }} />
          </div>
        </div>

        <div className="bg-[#fff3f0] rounded-[8px] px-3 py-2 mt-1">
          <p className="text-[8px] text-caldelo-coral font-medium">3 tasks unassigned</p>
          <p className="text-[9px] text-caldelo-ink">Tap to assign →</p>
        </div>
      </div>
    </div>
  )
}
