const testimonials = [
  {
    quote: "Finally, an app that actually gets how chaotic family life is. We haven't dropped a single thing since we started using it.",
    name: 'Sarah',
    role: 'Mum of 2, London',
    initial: 'S',
    color: 'bg-caldelo-green',
  },
  {
    quote: "I was the one always forgetting pickups. Now I get a nudge at the right moment. My wife is impressed and I'm not in trouble anymore.",
    name: 'Tom',
    role: 'Dad of 3, Manchester',
    initial: 'T',
    color: 'bg-caldelo-blue',
  },
  {
    quote: "The load balance view was a revelation. We could see who was actually doing what and have a proper conversation about it.",
    name: 'Emma',
    role: 'Mum of 1, Bristol',
    initial: 'E',
    color: 'bg-caldelo-coral',
  },
]

export function Testimonials() {
  return (
    <section className="bg-caldelo-tint border-t border-caldelo-border py-[80px] md:py-[120px] px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-16 md:flex-row md:gap-20">

        {/* Left: trust summary */}
        <div className="md:w-80 flex-shrink-0">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-caldelo-ink leading-tight mb-8">
            Trusted by busy parents like you.
          </h2>

          {/* Avatar cluster */}
          <div className="flex -space-x-2 mb-5">
            {[
              { initial: 'S', bg: 'bg-caldelo-green' },
              { initial: 'T', bg: 'bg-caldelo-blue' },
              { initial: 'E', bg: 'bg-caldelo-coral' },
              { initial: 'A', bg: 'bg-purple-400' },
              { initial: 'R', bg: 'bg-amber-400' },
            ].map(({ initial, bg }) => (
              <div key={initial}
                className={`w-10 h-10 rounded-full border-2 border-caldelo-tint flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${bg}`}>
                {initial}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 14 14" fill="#f59e0b">
                  <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7z" />
                </svg>
              ))}
            </div>
            <span className="text-base font-bold text-caldelo-ink">4.9/5</span>
          </div>
          <p className="text-sm text-caldelo-muted mb-10">From 300+ early families</p>

          <a href="#waitlist"
            className="inline-flex items-center justify-center h-12 px-8 rounded-pill bg-caldelo-green text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            Join them on the waitlist
          </a>
        </div>

        {/* Right: cards */}
        <div className="flex-1 space-y-4">
          {testimonials.map(({ quote, name, role, initial, color }) => (
            <div key={name}
              className="bg-caldelo-white rounded-[20px] border border-caldelo-border px-8 py-7">
              <p className="text-caldelo-secondary text-base leading-relaxed mb-6">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${color}`}>
                  {initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-caldelo-ink">{name}</p>
                  <p className="text-xs text-caldelo-muted">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
