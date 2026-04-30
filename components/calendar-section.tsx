import { PhoneFrame } from './phone-frame'
import { CalendarMockup } from './calendar-mockup'

const features = [
  'Events, school runs & pickups',
  'Clubs, activities & lessons',
  'Birthdays & special days',
  'Colour-coded by family member',
  'Shared in real time',
  'Works on all devices',
]

export function CalendarSection() {
  return (
    <section id="features" className="bg-caldelo-white border-t border-caldelo-border py-24 px-5 md:py-36">
      <div className="max-w-5xl mx-auto flex flex-col gap-14 md:flex-row md:items-center md:gap-20">

        {/* Left: copy */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-xl bg-caldelo-green flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <polyline points="9 16 11 18 15 14" />
              </svg>
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-caldelo-green">
              Shared family calendar
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-bold text-caldelo-ink leading-tight mb-4">
            See the whole week.<br />Stay ahead together.
          </h2>

          <p className="text-caldelo-secondary text-base md:text-lg leading-relaxed mb-8">
            Everything your family has going on. Finally in one place.
          </p>

          <ul className="space-y-3 mb-10">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-caldelo-secondary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-caldelo-green">
                  <circle cx="8" cy="8" r="8" fill="currentColor" fillOpacity="0.15" />
                  <path d="M4.5 8.5l2 2 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          <a href="#waitlist"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-pill bg-caldelo-green text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            Get early access
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <p className="text-[11px] text-caldelo-muted mt-2">Join 300+ families. Free. No spam.</p>
        </div>

        {/* Right: calendar mockup */}
        <div className="flex justify-center flex-shrink-0">
          <PhoneFrame style={{ transform: 'rotate(-2deg)' }}>
            <CalendarMockup />
          </PhoneFrame>
        </div>

      </div>
    </section>
  )
}
