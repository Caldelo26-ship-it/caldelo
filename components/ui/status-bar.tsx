interface StatusBarProps {
  bg?: string
  dark?: boolean
}

export function StatusBar({ bg = 'bg-[#eef2ee]', dark = false }: StatusBarProps) {
  const color = dark ? 'text-white' : 'text-caldelo-ink'
  return (
    <div className={`${bg} flex items-center justify-between px-5 pt-4 pb-1`}>
      <span className={`text-[9px] font-bold tabular-nums ${color}`}>9:41</span>
      <div className={`flex items-center gap-1.5 ${color}`}>
        {/* Signal bars */}
        <svg width="13" height="9" viewBox="0 0 13 9" fill="currentColor">
          <rect x="0" y="5" width="2.5" height="4" rx="0.5"/>
          <rect x="3.5" y="3" width="2.5" height="6" rx="0.5"/>
          <rect x="7" y="1" width="2.5" height="8" rx="0.5"/>
          <rect x="10.5" y="0" width="2.5" height="9" rx="0.5" opacity="0.25"/>
        </svg>
        {/* WiFi */}
        <svg width="12" height="9" viewBox="0 0 12 9" fill="currentColor">
          <circle cx="6" cy="8" r="1.2"/>
          <path d="M3.2 5.5C4 4.7 4.9 4.2 6 4.2s2 .5 2.8 1.3" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
          <path d="M1 3.3C2.4 1.9 4.1 1 6 1s3.6.9 5 2.3" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.5"/>
        </svg>
        {/* Battery */}
        <svg width="19" height="10" viewBox="0 0 19 10" fill="currentColor">
          <rect x="0.5" y="1" width="15" height="8" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/>
          <rect x="2" y="2.5" width="9" height="5" rx="1"/>
          <path d="M16.5 3.8v2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
}
