import { WaitlistForm } from './waitlist-form'
import { PhoneFrame } from './phone-frame'
import { TodayViewMockup } from './today-view-mockup'

export function Hero() {
  return (
    <section id="waitlist" className="bg-caldelo-white py-20 px-5 md:py-28">
      <div className="max-w-5xl mx-auto flex flex-col gap-12 md:flex-row md:items-center md:gap-16">

        {/* Left: copy */}
        <div className="flex-1 min-w-0">
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-caldelo-green bg-caldelo-green/10 rounded-full px-3 py-1 mb-6">
            Shared family calendar — early access
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-caldelo-ink leading-tight mb-5">
            Run family life like a team.
          </h1>
          <p className="text-caldelo-secondary text-base md:text-lg leading-relaxed mb-8 max-w-md">
            Know what&apos;s happening this week, who&apos;s doing what, and what needs attention.
            All in one place.
          </p>
          <ul className="space-y-2 mb-8">
            {[
              'Free shared family calendar',
              'Smart reminders at the right moment',
              'See who is carrying the week',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-caldelo-secondary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-caldelo-green">
                  <circle cx="8" cy="8" r="8" fill="currentColor" fillOpacity="0.15" />
                  <path d="M4.5 8.5l2 2 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <div className="mb-3">
            <WaitlistForm variant="hero" />
          </div>
          <p className="text-[11px] text-caldelo-muted">
            Join 300+ families getting ready for launch. Free. No spam. Ever.
          </p>
        </div>

        {/* Mobile: phone */}
        <div className="flex justify-center md:hidden">
          <PhoneFrame>
            <TodayViewMockup />
          </PhoneFrame>
        </div>

        {/* Desktop: phone + 4 floating annotations */}
        <div className="hidden md:flex flex-shrink-0 items-center justify-center">
          <div className="relative" style={{ width: 420, height: 560 }}>

            {/* Phone centred, rotated 3deg */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <PhoneFrame style={{ transform: 'rotate(3deg)' }}>
                <TodayViewMockup />
              </PhoneFrame>
            </div>

            {/* Upper-left annotation */}
            <div className="absolute left-0 top-10 max-w-[140px]">
              <p className="font-handwriting text-[16px] text-caldelo-secondary leading-snug -rotate-2">
                See the whole week at a glance
              </p>
              <svg width="70" height="38" viewBox="0 0 70 38" fill="none"
                className="stroke-caldelo-muted ml-8 mt-1" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M 4 6 C 22 4 50 10 66 32" strokeDasharray="5 3" />
                <path d="M 60 30 L 66 32 L 61 27" />
              </svg>
            </div>

            {/* Upper-right annotation */}
            <div className="absolute right-0 top-12 max-w-[130px] text-right">
              <svg width="70" height="38" viewBox="0 0 70 38" fill="none"
                className="stroke-caldelo-muted mr-4 mb-1 ml-auto" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M 66 6 C 48 4 20 10 4 32" strokeDasharray="5 3" />
                <path d="M 10 30 L 4 32 L 9 27" />
              </svg>
              <p className="font-handwriting text-[16px] text-caldelo-secondary leading-snug rotate-1">
                Everyone in the loop.
              </p>
            </div>

            {/* Lower-left annotation */}
            <div className="absolute left-0 bottom-12 max-w-[140px]">
              <svg width="70" height="38" viewBox="0 0 70 38" fill="none"
                className="stroke-caldelo-muted ml-8 mb-1" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M 4 32 C 22 34 50 28 66 6" strokeDasharray="5 3" />
                <path d="M 60 8 L 66 6 L 61 11" />
              </svg>
              <p className="font-handwriting text-[16px] text-caldelo-secondary leading-snug rotate-1">
                Never miss what matters
              </p>
            </div>

            {/* Lower-right annotation */}
            <div className="absolute right-0 bottom-14 max-w-[130px] text-right">
              <svg width="70" height="38" viewBox="0 0 70 38" fill="none"
                className="stroke-caldelo-muted mr-4 mb-1 ml-auto" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M 66 32 C 48 34 20 28 4 6" strokeDasharray="5 3" />
                <path d="M 10 8 L 4 6 L 9 11" />
              </svg>
              <p className="font-handwriting text-[16px] text-caldelo-secondary leading-snug -rotate-1">
                Share the load, clearly
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
