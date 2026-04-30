import { FeatureBlock } from './feature-block'
import { TodayViewMockup } from './today-view-mockup'
import { LoadBalanceMockup } from './load-balance-mockup'
import { RemindersMockup } from './reminders-mockup'

const TodayIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <polyline points="9 16 11 18 15 14" />
  </svg>
)

const BalanceIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

const BellIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const features = [
  {
    label: 'Today View',
    description: "What matters. Who has it. At a glance. Open Caldelo in the morning and the day is already clear.",
    accentClass: 'bg-caldelo-green',
    icon: TodayIcon,
    phone: <TodayViewMockup />,
    reverse: false,
  },
  {
    label: 'Load Balance',
    description: "See who's carrying the week — without a conversation. The data does the talking, so you don't have to.",
    accentClass: 'bg-caldelo-blue',
    icon: BalanceIcon,
    phone: <LoadBalanceMockup />,
    reverse: true,
  },
  {
    label: 'Smart Reminders',
    description: "Warm nudges at the right moment. Never naggy. PE kit, nursery payment, swimming bag — Caldelo remembers so you don't have to.",
    accentClass: 'bg-caldelo-coral',
    icon: BellIcon,
    phone: <RemindersMockup />,
    reverse: false,
  },
]

export function Features() {
  return (
    <section id="how-it-works" className="bg-caldelo-white border-t border-caldelo-border py-24 px-5 md:py-32">
      <div className="max-w-5xl mx-auto">
        <p className="text-[10px] font-bold tracking-widest uppercase text-caldelo-muted mb-12">
          How it works
        </p>
        <div className="space-y-16 md:space-y-20">
          {features.map((f) => (
            <FeatureBlock key={f.label} {...f} />
          ))}
        </div>
      </div>
    </section>
  )
}
