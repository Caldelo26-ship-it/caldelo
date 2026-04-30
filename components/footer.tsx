export function Footer() {
  return (
    <footer className="bg-[#1c1917] py-6 px-5">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="font-display font-bold text-caldelo-white text-base tracking-tight">
          Caldelo
        </span>
        <div className="flex gap-6">
          <a href="/privacy" className="text-caldelo-secondary text-xs hover:text-caldelo-muted transition-colors">
            Privacy
          </a>
          <a href="/terms" className="text-caldelo-secondary text-xs hover:text-caldelo-muted transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  )
}
