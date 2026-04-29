export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-caldelo-white/95 backdrop-blur-sm border-b border-caldelo-border">
      <nav className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
        <span className="font-display font-bold text-lg text-caldelo-ink tracking-tight">
          Caldelo
        </span>
        <a
          href="#waitlist"
          className="h-9 px-5 rounded-pill bg-caldelo-green text-white text-sm font-semibold flex items-center hover:opacity-90 transition-opacity"
        >
          Join waitlist
        </a>
      </nav>
    </header>
  )
}
