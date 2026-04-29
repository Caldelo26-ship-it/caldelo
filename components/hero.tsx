import { WaitlistForm } from './waitlist-form'
import { PhoneShell } from './phone-shell'
import { TodayViewMockup } from './today-view-mockup'

export function Hero() {
  return (
    <section id="waitlist" className="bg-caldelo-white py-16 px-5 md:py-24">
      <div className="max-w-5xl mx-auto flex flex-col gap-10 md:flex-row md:items-center md:gap-16">

        <div className="flex-1 min-w-0">
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-caldelo-green mb-4">
            Now in development
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-caldelo-ink leading-tight mb-4">
            Run family life<br />like a team.
          </h1>
          <p className="text-caldelo-secondary text-base md:text-lg leading-relaxed mb-8 max-w-md">
            Caldelo gives busy parents shared clarity — who&apos;s doing what, what&apos;s coming up,
            and no more dropped balls.
          </p>
          <div className="mb-3">
            <WaitlistForm variant="hero" />
          </div>
          <p className="text-[11px] text-caldelo-muted">
            Join early families on the list &middot; Free &middot; No spam
          </p>
        </div>

        <div className="flex justify-center md:justify-end flex-shrink-0">
          <PhoneShell className="w-[180px] md:w-[220px] md:-rotate-2">
            <TodayViewMockup />
          </PhoneShell>
        </div>

      </div>
    </section>
  )
}
