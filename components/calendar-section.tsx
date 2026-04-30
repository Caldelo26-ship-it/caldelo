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
    <section id="features" className="bg-caldelo-white border-t border-caldelo-border py-[80px] md:py-[120px] px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-16 md:flex-row md:items-center md:gap-20">

        {/* Copy */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-caldelo-green flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <polyline points="9 16 11 18 15 14" />
              </svg>
            </div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-caldelo-green">
              Shared family calendar
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-caldelo-ink leading-[1.05] mb-5">
            See the whole week.<br />Stay ahead together.
          </h2>

          <p className="text-caldelo-secondary text-lg md:text-xl leading-relaxed mb-10">
            Everything your family has going on. Finally in one place.
          </p>

          <ul className="space-y-4 mb-10">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm md:text-base text-caldelo-secondary">
                <div className="w-5 h-5 rounded-full bg-caldelo-green/15 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="#4a7c59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {f}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a href="#waitlist"
              className="inline-flex items-center justify-center h-12 px-8 rounded-pill bg-caldelo-green text-white text-sm font-semibold hover:opacity-90 transition-opacity">
              Get early access
            </a>
            <p className="text-[12px] text-caldelo-muted">Join 300+ families. Free.</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex justify-center flex-shrink-0">
          <PhoneFrame style={{ transform: 'rotate(-2deg)' }}>
            <CalendarMockup />
          </PhoneFrame>
        </div>

      </div>
    </section>
  )
}
