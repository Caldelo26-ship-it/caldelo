const quotes = [
  "Wait, who's doing pickup today?",
  'Forgotten PE kit. Again.',
  'One of us is quietly doing everything.',
]

const stars = Array.from({ length: 5 })

export function Problem() {
  return (
    <section className="bg-caldelo-surface border-t border-caldelo-border py-20 px-5 md:py-28">
      <div className="max-w-5xl mx-auto">
        <p className="text-[10px] font-bold tracking-widest uppercase text-caldelo-muted mb-10">
          Sound familiar?
        </p>

        <div className="flex flex-col gap-10 md:flex-row md:gap-16 md:items-center">

          {/* Left: quote cards */}
          <div className="flex-1 space-y-4">
            {quotes.map((quote) => (
              <blockquote
                key={quote}
                className="bg-caldelo-white rounded-card px-6 py-5 text-sm text-caldelo-ink italic border-l-[3px] border-caldelo-green shadow-sm"
              >
                &ldquo;{quote}&rdquo;
              </blockquote>
            ))}
          </div>

          {/* Right: bridge + social proof */}
          <div className="flex-1">
            <p className="text-caldelo-secondary text-base leading-relaxed mb-8">
              Caldelo makes the invisible visible — and turns household chaos into shared ownership.
            </p>
            <div className="flex gap-1 mb-3">
              {stars.map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24"
                  className="fill-caldelo-green flex-shrink-0">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-caldelo-secondary text-sm font-medium">Parents love Caldelo</p>
          </div>

        </div>
      </div>
    </section>
  )
}
