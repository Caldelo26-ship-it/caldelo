interface PhoneShellProps {
  children: React.ReactNode
  className?: string
}

export function PhoneShell({ children, className = '' }: PhoneShellProps) {
  return (
    <div
      className={`bg-caldelo-ink rounded-phone p-[7px] shadow-2xl shadow-black/20 ${className}`}
      aria-hidden="true"
    >
      <div className="bg-caldelo-white rounded-phone-inner overflow-hidden">
        {children}
      </div>
    </div>
  )
}
