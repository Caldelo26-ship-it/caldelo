'use client'

import type { ReactNode } from 'react'

type BottomSheetProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? 'Options'}
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-[20px] z-50 max-h-[85vh] overflow-y-auto transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="w-10 h-1 rounded-full bg-caldelo-border mx-auto mt-3 mb-1" aria-hidden="true" />
        {title && (
          <div className="px-5 pb-3 border-b border-caldelo-border mb-1">
            <h2 className="font-display text-lg font-bold text-caldelo-ink">{title}</h2>
          </div>
        )}
        <div className="px-5 pb-8">
          {children}
        </div>
      </div>
    </>
  )
}
