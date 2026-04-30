import type { CSSProperties } from 'react'

interface PhoneFrameProps {
  children: React.ReactNode
  className?: string
  style?: CSSProperties
}

export function PhoneFrame({ children, className = '', style }: PhoneFrameProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex-shrink-0 ${className}`}
      style={{
        width: 260,
        height: 520,
        borderRadius: 44,
        border: '3px solid #1a1a1a',
        boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
        background: '#1a1a1a',
        position: 'relative',
        ...style,
      }}
    >
      {/* Inner screen */}
      <div
        style={{
          position: 'absolute',
          inset: 10,
          borderRadius: 36,
          background: 'white',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>

      {/* Top notch */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 80,
          height: 24,
          background: '#1a1a1a',
          borderRadius: 12,
          zIndex: 10,
        }}
      />

      {/* Right side — volume buttons */}
      <div style={{ position: 'absolute', right: -5, top: 110, width: 4, height: 36, background: '#2a2a2a', borderRadius: 2 }} />
      <div style={{ position: 'absolute', right: -5, top: 158, width: 4, height: 36, background: '#2a2a2a', borderRadius: 2 }} />

      {/* Left side — silent/power button */}
      <div style={{ position: 'absolute', left: -5, top: 120, width: 4, height: 48, background: '#2a2a2a', borderRadius: 2 }} />
    </div>
  )
}
