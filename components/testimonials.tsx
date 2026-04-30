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
    <section className="bg-caldelo-surface border-t border-caldelo-border py-20 px-5 md:py-28">
      <div className="max-w-5xl mx-auto flex flex-col gap-12 md:flex-row md:gap-16">

        {/* Left: trust summary */}
        <div className="md:w-72 flex-shrink-0">
          <h2 className="font-display text-3xl font-bold text-caldelo-ink leading-tight mb-6">
            Trusted by busy parents like you.
          </h2>

          {/* Avatar cluster */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex -space-x-2">
              {[
                { initial: 'S', bg: 'bg-caldelo-green'  },
                { initial: 'T', bg: 'bg-caldelo-blue'   },
                { initial: 'E', bg: 'bg-caldelo-coral'  },
                { initial: 'A', bg: 'bg-purple-400'     },
                { initial: 'R', bg: 'bg-amber-400'      },
              ].map(({ initial, bg }) => (
                <div key={initial}
                  className={`w-9 h-9 rounded-full border-2 border-caldelo-surface flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${bg}`}>
                  {initial}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#f59e0b">
                  <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-caldelo-ink">4.9/5</span>
          </div>
          <p className="text-sm text-caldelo-muted mb-8">From 120+ early families</p>

          <a href="#waitlist"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-caldelo-green hover:opacity-80 transition-opacity">
            Join them on the waitlist
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>

        {/* Right: cards */}
        <div className="flex-1 grid grid-cols-1 gap-4 md:grid-cols-1">
          {testimonials.map(({ quote, name, role, initial, color }) => (
            <div key={name}
              className="bg-caldelo-white rounded-card border border-caldelo-border p-5">
              <p className="text-caldelo-secondary text-sm leading-relaxed mb-4">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${color}`}>
                  {initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-caldelo-ink leading-tight">{name}</p>
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
