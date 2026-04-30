import { PhoneFrame } from './phone-frame'
import { TodayViewMockup } from './today-view-mockup'
import { LoadBalanceMockup } from './load-balance-mockup'
import { RemindersMockup } from './reminders-mockup'
import { SharedListsMockup } from './shared-lists-mockup'

const features = [
  {
    label: 'Today View',
    description: "Open Caldelo in the morning and the day is already clear — who has what, when.",
    accentClass: 'bg-caldelo-green',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polyline points="9 16 11 18 15 14" />
      </svg>
    ),
    phone: <TodayViewMockup />,
    rotation: 'rotate(-2deg)',
  },
  {
    label: 'Load Balance',
    description: "See who's carrying the week without a conversation. Data does the talking.",
    accentClass: 'bg-caldelo-blue',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    phone: <LoadBalanceMockup />,
    rotation: 'rotate(2deg)',
  },
  {
    label: 'Smart Reminders',
    description: "Warm nudges at the right moment. PE kit, nursery payment, swimming bag — sorted.",
    accentClass: 'bg-caldelo-coral',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    phone: <RemindersMockup />,
    rotation: 'rotate(-2deg)',
  },
  {
    label: 'Shared Lists',
    description: "Groceries, errands, school supplies — one list, both parents, always up to date.",
    accentClass: 'bg-purple-500',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <polyline points="3 6 4 7 6 5" />
        <polyline points="3 12 4 13 6 11" />
        <polyline points="3 18 4 19 6 17" />
      </svg>
    ),
    phone: <SharedListsMockup />,
    rotation: 'rotate(2deg)',
  },
]

export function Features() {
  return (
    <section id="how-it-works" className="bg-caldelo-white border-t border-caldelo-border py-20 px-5 md:py-28">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-[10px] font-bold tracking-widest uppercase text-caldelo-muted mb-3">
            More than a calendar
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-caldelo-ink leading-tight">
            Everything your family needs, in one place.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {features.map(({ label, description, accentClass, icon, phone, rotation }) => (
            <div key={label} className="flex flex-col">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 flex-shrink-0 ${accentClass}`}>
                {icon}
              </div>
              <h3 className="font-display text-lg font-bold text-caldelo-ink mb-2">{label}</h3>
              <p className="text-caldelo-secondary text-sm leading-relaxed mb-8 flex-1">{description}</p>
              <div className="flex justify-center">
                <PhoneFrame style={{ transform: rotation }}>
                  {phone}
                </PhoneFrame>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
