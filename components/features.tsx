import { PhoneFrame } from './phone-frame'
import { TodayViewMockup } from './today-view-mockup'
import { LoadBalanceMockup } from './load-balance-mockup'

const featureRows = [
  {
    label: 'Today View',
    labelColor: 'text-caldelo-green',
    accentBg: 'bg-caldelo-green',
    headline: 'Your whole day.\nAt a glance.',
    body: "Open Caldelo each morning and the day is already organised — school runs, pickups, reminders, dinner. Everything you and your partner need to see, together.",
    phone: <TodayViewMockup />,
    rotation: 'rotate(-2deg)',
    reverse: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polyline points="9 16 11 18 15 14" />
      </svg>
    ),
  },
  {
    label: 'Load Balance',
    labelColor: 'text-caldelo-blue',
    accentBg: 'bg-caldelo-blue',
    headline: 'See who\'s\ncarrying the week.',
    body: "One view shows you exactly who has what. No conversation needed. No resentment building up quietly. Just an honest picture of the week — and the tools to rebalance it.",
    phone: <LoadBalanceMockup />,
    rotation: 'rotate(2deg)',
    reverse: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
]

const featureCards = [
  {
    accentBg: 'bg-caldelo-coral',
    headline: 'Smart Reminders',
    body: 'PE kit, nursery payment, swimming bag. Warm nudges at the right moment — never naggy, never late.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    accentBg: 'bg-purple-500',
    headline: 'Shared Lists',
    body: 'Groceries, errands, school supplies. One list, both parents, always in sync. No more duplicate trips.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <polyline points="3 6 4 7 6 5" />
        <polyline points="3 12 4 13 6 11" />
        <polyline points="3 18 4 19 6 17" />
      </svg>
    ),
  },
]

export function Features() {
  return (
    <section id="how-it-works" className="bg-caldelo-tint border-t border-caldelo-border py-[80px] md:py-[120px] px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">

        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-[11px] font-bold tracking-widest uppercase text-caldelo-muted mb-4">
            Built for real family life
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-caldelo-ink leading-tight">
            Everything your family needs,<br className="hidden md:block" /> in one place.
          </h2>
        </div>

        {/* Two full feature rows */}
        <div className="space-y-24 md:space-y-[120px] mb-20">
          {featureRows.map(({ label, labelColor, accentBg, headline, body, phone, rotation, reverse, icon }) => (
            <div
              key={label}
              className={`flex flex-col gap-16 md:items-center ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} md:gap-20`}
            >
              {/* Copy */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${accentBg}`}>
                    {icon}
                  </div>
                  <span className={`text-[11px] font-bold tracking-widest uppercase ${labelColor}`}>
                    {label}
                  </span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-caldelo-ink leading-tight mb-5 whitespace-pre-line">
                  {headline}
                </h3>
                <p className="text-caldelo-secondary text-base md:text-lg leading-relaxed">
                  {body}
                </p>
              </div>

              {/* Phone */}
              <div className="flex justify-center flex-shrink-0">
                <PhoneFrame style={{ transform: rotation }}>
                  {phone}
                </PhoneFrame>
              </div>
            </div>
          ))}
        </div>

        {/* Two feature cards (no phone) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featureCards.map(({ accentBg, headline, body, icon }) => (
            <div key={headline}
              className="bg-caldelo-white rounded-[20px] border border-caldelo-border px-8 py-8">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${accentBg}`}>
                {icon}
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-caldelo-ink mb-3">{headline}</h3>
              <p className="text-caldelo-secondary text-sm md:text-base leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
