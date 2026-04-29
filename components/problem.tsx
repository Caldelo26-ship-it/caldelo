const quotes = [
  "Wait, who's doing pickup today?",
  'Forgotten PE kit. Again.',
  'One of us is quietly doing everything.',
]

export function Problem() {
  return (
    <section className="bg-caldelo-surface border-t border-caldelo-border py-14 px-5">
      <div className="max-w-5xl mx-auto">
        <p className="text-[10px] font-bold tracking-widest uppercase text-caldelo-muted mb-6">
          Sound familiar?
        </p>

        <div className="space-y-3 mb-8">
          {quotes.map((quote) => (
            <blockquote
              key={quote}
              className="bg-caldelo-white rounded-card px-5 py-4 text-sm text-caldelo-ink italic border-l-[3px] border-caldelo-border"
            >
              &ldquo;{quote}&rdquo;
            </blockquote>
          ))}
        </div>

        <p className="text-caldelo-secondary text-sm md:text-base leading-relaxed max-w-lg">
          Caldelo makes the invisible visible — and turns household chaos into shared ownership.
        </p>
      </div>
    </section>
  )
}
