import { WaitlistForm } from './waitlist-form'
import { PhoneShell } from './phone-shell'
import { TodayViewMockup } from './today-view-mockup'

export function Hero() {
  return (
    <section id="waitlist" className="bg-caldelo-white py-24 px-5 md:py-36">
      <div className="max-w-5xl mx-auto flex flex-col gap-12 md:flex-row md:items-center md:gap-20">

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
        <div className="hidden md:block relative flex-shrink-0 w-[360px] h-[440px]">
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <PhoneShell className="w-[220px] -rotate-2">
              <TodayViewMockup />
            </PhoneShell>
          </div>

          {/* Morning. Sorted. */}
          <div className="absolute left-0 top-10">
            <p className="font-handwriting text-[17px] italic text-caldelo-secondary -rotate-2 whitespace-nowrap">
              Morning. Sorted.
            </p>
            <svg width="90" height="40" viewBox="0 0 90 40" fill="none"
              className="stroke-caldelo-muted" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M 4 8 C 30 2 65 10 82 32" />
              <path d="M 76 30 L 82 32 L 77 26" />
            </svg>
          </div>

          {/* Everyone in the loop. */}
          <div className="absolute left-0 top-1/2 -translate-y-6">
            <p className="font-handwriting text-[17px] italic text-caldelo-secondary rotate-1 whitespace-nowrap">
              Everyone in the loop.
            </p>
            <svg width="100" height="34" viewBox="0 0 100 34" fill="none"
              className="stroke-caldelo-muted" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M 4 8 C 36 2 75 8 92 24" />
              <path d="M 86 22 L 92 24 L 87 18" />
            </svg>
          </div>

          {/* Less stress. More team. */}
          <div className="absolute left-0 bottom-14">
            <p className="font-handwriting text-[17px] italic text-caldelo-secondary -rotate-1 whitespace-nowrap">
              Less stress. More team.
            </p>
            <svg width="96" height="42" viewBox="0 0 96 42" fill="none"
              className="stroke-caldelo-muted" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M 4 34 C 30 38 68 32 86 12" />
              <path d="M 80 14 L 86 12 L 82 18" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  )
}
