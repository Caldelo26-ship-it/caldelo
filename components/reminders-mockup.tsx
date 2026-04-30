import { StatusBar } from './ui/status-bar'

const reminders = [
  {
    tag: 'Due today',
    tagColor: 'bg-caldelo-coral/15 text-caldelo-coral',
    dot: 'bg-caldelo-coral',
    title: 'PE kit',
    detail: "Jamie needs it first thing. Trainers too.",
  },
  {
    tag: 'Tomorrow',
    tagColor: 'bg-amber-100 text-amber-700',
    dot: 'bg-amber-400',
    title: 'Nursery invoice',
    detail: 'Payment due Friday — £340',
  },
  {
    tag: 'This week',
    tagColor: 'bg-caldelo-blue/15 text-caldelo-blue',
    dot: 'bg-caldelo-blue',
    title: 'Swimming 5pm',
    detail: 'Thursday · confirm transport',
  },
]

export function RemindersMockup() {
  return (
    <div className="font-sans text-caldelo-ink h-full flex flex-col">

      <StatusBar bg="bg-[#eef2ee]" />

      {/* Header */}
      <div className="bg-[#eef2ee] px-4 pb-3 pt-1">
        <p className="text-[13px] font-bold text-caldelo-ink">Reminders</p>
        <p className="text-[9px] text-caldelo-secondary mt-0.5">What needs attention</p>
      </div>

      <div className="flex-1 bg-caldelo-white px-4 py-4 space-y-3 overflow-hidden">
        {reminders.map(({ tag, tagColor, dot, title, detail }) => (
          <div key={title} className="bg-caldelo-surface rounded-xl px-4 py-4">
            <div className="flex items-center gap-1.5 mb-2">
              <div className={`w-1.5 h-1.5 rounded-full ${dot}`} />
              <span className={`text-[8px] font-bold rounded-full px-2 py-0.5 ${tagColor}`}>{tag}</span>
            </div>
            <p className="text-[11px] font-semibold text-caldelo-ink leading-tight">{title}</p>
            <p className="text-[8px] text-caldelo-secondary mt-1">{detail}</p>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="border-t border-caldelo-border bg-caldelo-white px-2 py-2 flex justify-around">
        {[
          { label: 'Home', active: false },
          { label: 'Alerts', active: true },
          { label: 'Tasks', active: false },
          { label: 'People', active: false },
        ].map(({ label, active }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div className={`w-5 h-5 rounded-md ${active ? 'bg-caldelo-coral/20' : 'bg-caldelo-surface'}`} />
            <span className={`text-[7px] ${active ? 'text-caldelo-coral font-bold' : 'text-caldelo-muted'}`}>{label}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
