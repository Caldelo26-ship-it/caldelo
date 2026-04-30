import type { ReactNode } from 'react'

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-caldelo-white flex flex-col items-center justify-start px-4 py-12">
      {children}
    </div>
  )
}
