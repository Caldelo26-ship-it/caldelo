'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { BottomSheet } from '@/components/ui/BottomSheet'

function TodayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <rect x="8" y="14" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}

function BalanceIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="3" x2="12" y2="21"/>
      <path d="M5 7l7-4 7 4"/>
      <path d="M6 10l-3 5h6l-3-5z"/>
      <path d="M18 10l-3 5h6l-3-5z"/>
      <line x1="5" y1="21" x2="19" y2="21"/>
    </svg>
  )
}

function RemindersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  )
}

const NAV_TABS = [
  { href: '/today', label: 'Today', icon: <TodayIcon /> },
  { href: '/calendar', label: 'Calendar', icon: <CalendarIcon /> },
  { href: '/balance', label: 'Balance', icon: <BalanceIcon /> },
  { href: '/reminders', label: 'Reminders', icon: <RemindersIcon /> },
]

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false)

  return (
    <>
      <div className="pb-[calc(56px+env(safe-area-inset-bottom))]">
        {children}
      </div>

      {/* Bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-caldelo-border flex items-end justify-around"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        aria-label="Main navigation"
      >
        {NAV_TABS.map(tab => {
          const isActive = pathname.startsWith(tab.href)
          return (
            <a
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-0.5 h-14 px-4 min-w-[64px] transition-colors ${isActive ? 'text-caldelo-green' : 'text-caldelo-muted'}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.icon}
              <span className="text-[11px] font-medium">{tab.label}</span>
            </a>
          )
        })}
      </nav>

      {/* FAB */}
      <button
        onClick={() => setIsQuickAddOpen(true)}
        aria-label="Quick add"
        className="fixed z-40 w-14 h-14 rounded-full bg-caldelo-green shadow-lg flex items-center justify-center"
        style={{ bottom: 'calc(56px + env(safe-area-inset-bottom) + 12px)', right: '20px' }}
      >
        <PlusIcon />
      </button>

      {/* Quick add sheet (stub) */}
      <BottomSheet isOpen={isQuickAddOpen} onClose={() => setIsQuickAddOpen(false)} title="Quick Add">
        <p className="text-caldelo-secondary text-sm py-4">Quick add coming in Sprint 4C.</p>
      </BottomSheet>
    </>
  )
}
