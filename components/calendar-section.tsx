import { PhoneShell } from './phone-shell'
import { CalendarMockup } from './calendar-mockup'

const features = [
  'Events & appointments',
  'School runs & pickups',
  'Clubs, activities & lessons',
  'Birthdays & special days',
  'Colour-coded by person',
  'Works on all devices',
]

export function CalendarSection() {
  return (
    <section id="features" className="bg-caldelo-surface border-t border-caldelo-border py-20 px-5 md:py-28">
      <div className="max-w-5xl mx-auto flex flex-col gap-12 md:flex-row md:items-center md:gap-16">

        {/* Left: copy */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-caldelo-green flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <polyline points="9 16 11 18 15 14" />
              </svg>
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-caldelo-muted">
              Calendar
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-caldelo-ink leading-tight mb-6">
            See the whole family week, beautifully.
          </h2>

          <ul className="space-y-2.5 mb-8">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-caldelo-secondary">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 text-caldelo-green">
                  <circle cx="7" cy="7" r="7" fill="currentColor" fillOpacity="0.15" />
                  <path d="M4 7.5l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          <a href="#how-it-works"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-caldelo-green hover:opacity-80 transition-opacity">
            See how it works
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>

        {/* Right: calendar mockup in phone */}
        <div className="flex justify-center flex-shrink-0">
          <PhoneShell className="w-[220px]">
            <CalendarMockup />
          </PhoneShell>
        </div>

      </div>
    </section>
  )
}
