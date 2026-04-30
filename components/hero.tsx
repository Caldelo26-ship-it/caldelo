import { WaitlistForm } from './waitlist-form'
import { PhoneFrame } from './phone-frame'
import { TodayViewMockup } from './today-view-mockup'

export function Hero() {
  return (
    <section id="waitlist" className="bg-caldelo-white py-[80px] md:py-[120px] px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-16 md:flex-row md:items-center md:gap-20">

        {/* Copy */}
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 bg-caldelo-tint rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-caldelo-green" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-caldelo-green">
              Shared family calendar — early access
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-caldelo-ink leading-[1.05] mb-6">
            Run family life<br />like a team.
          </h1>

          <p className="text-caldelo-secondary text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
            Know what&apos;s happening this week, who&apos;s doing what, and what needs attention.
            All in one place.
          </p>

          <ul className="space-y-3 mb-10">
            {[
              'Free shared family calendar',
              'Smart reminders at the right moment',
              'See who is carrying the week',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-caldelo-secondary">
                <div className="w-5 h-5 rounded-full bg-caldelo-green/15 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="#4a7c59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>

          <WaitlistForm variant="hero" />

          <p className="text-[12px] text-caldelo-muted mt-4">
            Join 300+ families getting ready for launch. Free. No spam. Ever.
          </p>
        </div>

        {/* Mobile: phone */}
        <div className="flex justify-center md:hidden">
          <PhoneFrame>
            <TodayViewMockup />
          </PhoneFrame>
        </div>

        {/* Desktop: phone + annotations */}
        <div className="hidden md:flex flex-shrink-0 items-center justify-center">
          <div className="relative" style={{ width: 440, height: 580 }}>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <PhoneFrame style={{ transform: 'rotate(3deg)' }}>
                <TodayViewMockup />
              </PhoneFrame>
            </div>

            <div className="absolute left-0 top-8 max-w-[140px]">
              <p className="font-handwriting text-[17px] text-caldelo-secondary leading-snug -rotate-2">
                See the whole week at a glance
              </p>
              <svg width="72" height="40" viewBox="0 0 72 40" fill="none"
                className="stroke-caldelo-muted ml-8 mt-1" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M 4 6 C 22 4 52 12 68 34" strokeDasharray="5 3" />
                <path d="M 62 32 L 68 34 L 63 29" />
              </svg>
            </div>

            <div className="absolute right-0 top-10 max-w-[130px] text-right">
              <svg width="72" height="40" viewBox="0 0 72 40" fill="none"
                className="stroke-caldelo-muted mr-4 mb-1 ml-auto" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M 68 6 C 50 4 20 12 4 34" strokeDasharray="5 3" />
                <path d="M 10 32 L 4 34 L 9 29" />
              </svg>
              <p className="font-handwriting text-[17px] text-caldelo-secondary leading-snug rotate-1">
                Everyone in the loop.
              </p>
            </div>

            <div className="absolute left-0 bottom-10 max-w-[140px]">
              <svg width="72" height="40" viewBox="0 0 72 40" fill="none"
                className="stroke-caldelo-muted ml-8 mb-1" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M 4 34 C 22 36 52 28 68 6" strokeDasharray="5 3" />
                <path d="M 62 8 L 68 6 L 63 11" />
              </svg>
              <p className="font-handwriting text-[17px] text-caldelo-secondary leading-snug rotate-1">
                Never miss what matters
              </p>
            </div>

            <div className="absolute right-0 bottom-12 max-w-[130px] text-right">
              <svg width="72" height="40" viewBox="0 0 72 40" fill="none"
                className="stroke-caldelo-muted mr-4 mb-1 ml-auto" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M 68 34 C 50 36 20 28 4 6" strokeDasharray="5 3" />
                <path d="M 10 8 L 4 6 L 9 11" />
              </svg>
              <p className="font-handwriting text-[17px] text-caldelo-secondary leading-snug -rotate-1">
                Share the load, clearly
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
