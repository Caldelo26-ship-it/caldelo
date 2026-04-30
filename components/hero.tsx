import { WaitlistForm } from './waitlist-form'
import { PhoneShell } from './phone-shell'
import { TodayViewMockup } from './today-view-mockup'

export function Hero() {
  return (
    <section id="waitlist" className="bg-caldelo-white py-24 px-5 md:py-36">
      <div className="max-w-5xl mx-auto flex flex-col gap-12 md:flex-row md:items-center md:gap-16">

        <div className="flex-1 min-w-0">
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-caldelo-green mb-6">
            Now in development
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-caldelo-ink leading-tight mb-6">
            Run family life<br />like a team.
          </h1>
          <p className="text-caldelo-secondary text-base md:text-lg leading-relaxed mb-10 max-w-md">
            Caldelo gives busy parents shared clarity — who&apos;s doing what, what&apos;s coming up,
            and no more dropped balls.
          </p>
          <div className="mb-3">
            <WaitlistForm variant="hero" />
          </div>
          <p className="text-[11px] text-caldelo-muted">
            Joining the waitlist is free. No credit card. No commitment.
          </p>
        </div>

        {/* Mobile: plain phone, no annotations */}
        <div className="flex justify-center md:hidden flex-shrink-0">
          <PhoneShell className="w-[180px]">
            <TodayViewMockup />
          </PhoneShell>
        </div>

        {/* Desktop: phone + floating handwritten annotations */}
        <div className="hidden md:flex flex-shrink-0 items-center justify-end">
          <div className="relative w-[380px] h-[440px]">

            {/* Phone */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <PhoneShell className="w-[220px] -rotate-2">
                <TodayViewMockup />
              </PhoneShell>
            </div>

            {/* Morning. Sorted. — upper left, arrow curves right-down to phone top */}
            <div className="absolute left-0 top-8">
              <p className="font-handwriting text-[15px] italic text-caldelo-secondary -rotate-2 whitespace-nowrap mb-1">
                Morning. Sorted.
              </p>
              <svg width="88" height="42" viewBox="0 0 88 42" fill="none"
                className="stroke-caldelo-muted" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M 4 6 C 24 4 58 10 84 36" strokeDasharray="5 3" />
                <path d="M 78 33 L 84 36 L 80 30" />
              </svg>
            </div>

            {/* Everyone in the loop. — mid left, arrow curves right to phone centre */}
            <div className="absolute left-0 top-1/2 -translate-y-5">
              <p className="font-handwriting text-[15px] italic text-caldelo-secondary rotate-1 whitespace-nowrap mb-1">
                Everyone in the loop.
              </p>
              <svg width="96" height="28" viewBox="0 0 96 28" fill="none"
                className="stroke-caldelo-muted" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M 4 6 C 32 2 68 6 92 20" strokeDasharray="5 3" />
                <path d="M 86 17 L 92 20 L 87 14" />
              </svg>
            </div>

            {/* Less stress. More team. — lower left, arrow curves right-up to phone bottom */}
            <div className="absolute left-0 bottom-10">
              <p className="font-handwriting text-[15px] italic text-caldelo-secondary -rotate-1 whitespace-nowrap mb-1">
                Less stress. More team.
              </p>
              <svg width="90" height="46" viewBox="0 0 90 46" fill="none"
                className="stroke-caldelo-muted" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M 4 40 C 26 38 60 28 86 8" strokeDasharray="5 3" />
                <path d="M 80 10 L 86 8 L 82 14" />
              </svg>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
