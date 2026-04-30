export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-caldelo-white/95 backdrop-blur-sm border-b border-caldelo-border">
      <nav className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
        <span className="font-display font-bold text-lg text-caldelo-ink tracking-tight">
          Caldelo
        </span>
        <div className="hidden md:flex items-center gap-7">
          <a href="#how-it-works" className="text-sm text-caldelo-secondary hover:text-caldelo-ink transition-colors">
            How it works
          </a>
          <a href="#waitlist" className="text-sm text-caldelo-secondary hover:text-caldelo-ink transition-colors">
            Pricing
          </a>
        </div>
        <a
          href="#waitlist"
          className="h-10 px-6 rounded-pill bg-caldelo-green text-white text-sm font-semibold flex items-center hover:opacity-90 transition-opacity"
        >
          Join waitlist
        </a>
      </nav>
    </header>
  )
}
