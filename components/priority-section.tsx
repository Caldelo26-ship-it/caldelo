const items = [
  {
    tag: 'Due today',
    tagColor: 'bg-caldelo-coral/15 text-caldelo-coral',
    title: 'PE kit',
    detail: "Jamie needs it first thing. Don't forget the trainers.",
  },
  {
    tag: 'Needed tomorrow',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'Nursery invoice',
    detail: 'Payment due by 9am Friday. Set aside 10 minutes tonight.',
  },
  {
    tag: 'Coming up this week',
    tagColor: 'bg-caldelo-blue/15 text-caldelo-blue',
    title: 'Swimming lesson',
    detail: "Thursday 5pm. Who's doing transport?",
  },
]

export function PrioritySection() {
  return (
    <section className="bg-caldelo-white border-t border-caldelo-border py-16 px-5 md:py-24">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-[10px] font-bold tracking-widest uppercase text-caldelo-muted mb-3">
            Smart reminders
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-caldelo-ink leading-tight mb-3">
            What needs attention, without the noise.
          </h2>
          <p className="text-caldelo-secondary text-base max-w-md mx-auto">
            Caldelo surfaces what matters at the right moment — calmly, clearly, and only when it counts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map(({ tag, tagColor, title, detail }) => (
            <div key={title}
              className="bg-caldelo-surface rounded-card border border-caldelo-border px-5 py-5">
              <span className={`inline-block text-[10px] font-bold tracking-wide uppercase rounded-full px-2.5 py-1 mb-3 ${tagColor}`}>
                {tag}
              </span>
              <p className="text-sm font-semibold text-caldelo-ink mb-1">{title}</p>
              <p className="text-xs text-caldelo-secondary leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
