const quotes = [
  "Wait — who's doing pickup today?",
  "I thought you had that covered.",
  "We forgot. Again.",
  "Fine, I'll just handle it.",
]

export function PainSection() {
  return (
    <section className="bg-caldelo-tint border-t border-caldelo-border py-[80px] md:py-[120px] px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">

        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-[11px] font-bold tracking-widest uppercase text-caldelo-muted mb-6">
            Sound familiar?
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-caldelo-ink leading-tight">
            Does this sound familiar?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
          {quotes.map((q) => (
            <div key={q}
              className="bg-caldelo-white rounded-[14px] border border-caldelo-border px-6 py-5">
              <p className="text-caldelo-secondary text-base leading-relaxed">&ldquo;{q}&rdquo;</p>
            </div>
          ))}
        </div>

        <p className="text-center text-caldelo-ink text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto">
          Caldelo makes the invisible visible —{' '}
          <span className="text-caldelo-green">turning family chaos into shared clarity.</span>
        </p>

      </div>
    </section>
  )
}
