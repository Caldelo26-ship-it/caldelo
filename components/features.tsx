import { FeatureBlock } from './feature-block'
import { TodayViewMockup } from './today-view-mockup'
import { LoadBalanceMockup } from './load-balance-mockup'
import { RemindersMockup } from './reminders-mockup'

const features = [
  {
    label: 'Today View',
    description: "What matters. Who has it. At a glance. Open Caldelo in the morning and the day is already clear.",
    accentClass: 'bg-caldelo-green',
    phone: <TodayViewMockup />,
    reverse: false,
  },
  {
    label: 'Load Balance',
    description: "See who's carrying the week — without a conversation. The data does the talking, so you don't have to.",
    accentClass: 'bg-caldelo-blue',
    phone: <LoadBalanceMockup />,
    reverse: true,
  },
  {
    label: 'Smart Reminders',
    description: "Warm nudges at the right moment. Never naggy. PE kit, nursery payment, swimming bag — Caldelo remembers so you don't have to.",
    accentClass: 'bg-caldelo-coral',
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
