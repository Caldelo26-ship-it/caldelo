const quotes = [
  "Wait — who's doing pickup today?",
  "I thought you had that covered.",
  "We forgot. Again.",
  "Fine, I'll just handle it.",
]

export function PainSection() {
  return (
    <section className="bg-caldelo-surface border-t border-caldelo-border py-16 px-5 md:py-24">
      <div className="max-w-3xl mx-auto text-center">

        <p className="text-[10px] font-bold tracking-widest uppercase text-caldelo-muted mb-8">
          Sound familiar?
        </p>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-caldelo-ink leading-tight mb-10">
          Does this sound familiar?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-left">
          {quotes.map((q) => (
            <div key={q}
              className="bg-caldelo-white rounded-card border border-caldelo-border px-5 py-4">
              <p className="text-caldelo-secondary text-sm leading-relaxed">&ldquo;{q}&rdquo;</p>
            </div>
          ))}
        </div>

        <p className="text-caldelo-ink text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto">
          Caldelo makes the invisible visible —{' '}
          <span className="text-caldelo-green">turning family chaos into shared clarity.</span>
        </p>

      </div>
    </section>
  )
}
