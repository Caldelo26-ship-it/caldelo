const items = [
  {
    tag: 'Due today',
    tagColor: 'bg-caldelo-coral/15 text-caldelo-coral',
    dot: 'bg-caldelo-coral',
    title: 'PE kit',
    detail: "Jamie needs it first thing. Don't forget the trainers.",
  },
  {
    tag: 'Needed tomorrow',
    tagColor: 'bg-amber-100 text-amber-700',
    dot: 'bg-amber-400',
    title: 'Nursery invoice',
    detail: 'Payment due by 9am Friday. Set aside 10 minutes tonight.',
  },
  {
    tag: 'Coming up this week',
    tagColor: 'bg-caldelo-blue/15 text-caldelo-blue',
    dot: 'bg-caldelo-blue',
    title: 'Swimming lesson',
    detail: "Thursday 5pm. Who's doing transport?",
  },
]

export function PrioritySection() {
  return (
    <section className="bg-caldelo-white border-t border-caldelo-border py-[80px] md:py-[120px] px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">

        <div className="text-center mb-16">
          <p className="text-[11px] font-bold tracking-widest uppercase text-caldelo-muted mb-4">
            Smart reminders
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-caldelo-ink leading-tight mb-4">
            What needs attention,<br className="hidden md:block" /> without the noise.
          </h2>
          <p className="text-caldelo-secondary text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Caldelo surfaces what matters at the right moment — calmly, clearly, only when it counts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(({ tag, tagColor, dot, title, detail }) => (
            <div key={title}
              className="bg-caldelo-surface rounded-[20px] border border-caldelo-border px-8 py-8">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-2 h-2 rounded-full ${dot}`} />
                <span className={`text-[10px] font-bold tracking-wide uppercase rounded-full px-3 py-1 ${tagColor}`}>
                  {tag}
                </span>
              </div>
              <p className="font-display text-xl font-bold text-caldelo-ink mb-2">{title}</p>
              <p className="text-sm text-caldelo-secondary leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
