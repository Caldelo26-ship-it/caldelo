const reminders = [
  { text: 'PE kit needed tomorrow morning', time: '8pm tonight',  colorClass: 'text-caldelo-coral' },
  { text: 'Nursery payment due Friday',     time: 'In 2 days',   colorClass: 'text-caldelo-secondary' },
  { text: 'Swimming bag — tonight',         time: 'Today',       colorClass: 'text-caldelo-green' },
]

export function RemindersMockup() {
  return (
    <div className="p-4 font-sans min-h-[230px]">
      <p className="text-[11px] font-bold text-caldelo-ink mb-0.5">Reminders</p>
      <p className="text-[9px] text-caldelo-secondary mb-4">Coming up</p>

      <div className="space-y-2">
        {reminders.map((r) => (
          <div key={r.text} className="bg-caldelo-surface rounded-[8px] px-3 py-2.5">
            <p className="text-[9px] font-medium text-caldelo-ink leading-tight">{r.text}</p>
            <p className={`text-[8px] mt-0.5 ${r.colorClass}`}>{r.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
