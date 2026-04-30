export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-caldelo-white/95 backdrop-blur-sm border-b border-caldelo-border">
      <nav className="max-w-[1200px] mx-auto px-6 md:px-8 h-16 flex items-center justify-between gap-8">

        <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-caldelo-green flex-shrink-0">
            <path d="M12 22V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 11C12 6 16 2 21 2C21 7 17 11 12 11Z"
              fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
            <path d="M12 11C12 6 8 2 3 2C3 7 7 11 12 11Z"
              fill="currentColor" fillOpacity="0.55" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
          </svg>
          <span className="font-display font-bold text-xl text-caldelo-ink tracking-tight">Caldelo</span>
        </a>

        <div className="hidden lg:flex items-center gap-8 flex-1">
          <a href="#how-it-works" className="text-sm text-caldelo-secondary hover:text-caldelo-ink transition-colors">How it works</a>
          <a href="#features"     className="text-sm text-caldelo-secondary hover:text-caldelo-ink transition-colors">Features</a>
          <a href="#families"     className="text-sm text-caldelo-secondary hover:text-caldelo-ink transition-colors">For families</a>
          <a href="#waitlist"     className="text-sm text-caldelo-secondary hover:text-caldelo-ink transition-colors">Pricing</a>
          <a href="#faq"          className="text-sm text-caldelo-secondary hover:text-caldelo-ink transition-colors">FAQs</a>
        </div>

        <a href="#waitlist"
          className="h-11 px-6 rounded-pill bg-caldelo-green text-white text-sm font-semibold flex items-center hover:opacity-90 transition-opacity flex-shrink-0">
          Get early access
        </a>

      </nav>
    </header>
  )
}
