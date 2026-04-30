export function Footer() {
  return (
    <footer className="bg-[#1c1917] py-6 px-5">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">

        <span className="font-display font-bold text-caldelo-white text-base tracking-tight flex-shrink-0">
          Caldelo
        </span>

        {/* Social icons */}
        <div className="flex items-center gap-5">
          <a href="#" aria-label="Instagram"
            className="text-caldelo-secondary hover:text-caldelo-white transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook"
            className="text-caldelo-secondary hover:text-caldelo-white transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter / X"
            className="text-caldelo-secondary hover:text-caldelo-white transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        {/* Legal links */}
        <div className="flex gap-6 flex-shrink-0">
          <a href="/privacy"
            className="text-caldelo-secondary text-xs hover:text-caldelo-muted transition-colors">
            Privacy
          </a>
          <a href="/terms"
            className="text-caldelo-secondary text-xs hover:text-caldelo-muted transition-colors">
            Terms
          </a>
        </div>

      </div>
    </footer>
  )
}
