export function TodayViewMockup() {
  return (
    <div className="p-4 font-sans min-h-[230px]">
      <p className="text-[11px] font-bold text-caldelo-ink mb-0.5">Tuesday</p>
      <p className="text-[9px] text-caldelo-secondary mb-4">3 things today</p>

      <div className="space-y-2">
        <div className="bg-caldelo-surface rounded-[8px] px-3 py-2">
          <p className="text-[8px] text-caldelo-secondary">School drop-off</p>
          <p className="text-[10px] font-semibold text-caldelo-ink">You ✓</p>
        </div>
        <div className="bg-caldelo-surface rounded-[8px] px-3 py-2">
          <p className="text-[8px] text-caldelo-secondary">Pickup 3:15pm</p>
          <p className="text-[10px] font-semibold text-caldelo-ink">Jamie</p>
        </div>
        <div className="bg-[#fff3f0] rounded-[8px] px-3 py-2">
          <p className="text-[8px] text-caldelo-coral font-medium">⚠ PE kit</p>
          <p className="text-[10px] font-semibold text-caldelo-ink">Needed tomorrow</p>
        </div>
        <div className="bg-caldelo-surface rounded-[8px] px-3 py-2">
          <p className="text-[8px] text-caldelo-secondary">Dinner</p>
          <p className="text-[10px] font-semibold text-caldelo-ink">Pasta ✓</p>
        </div>
      </div>
    </div>
  )
}
