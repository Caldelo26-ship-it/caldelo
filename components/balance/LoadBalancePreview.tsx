'use client'

import Link from 'next/link'
import type { LoadBalanceProps } from './LoadBalanceDashboard'
import { LoadBalanceDashboard } from './LoadBalanceDashboard'

export function LoadBalancePreview(props: LoadBalanceProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Blurred actual content so user can almost see it */}
      <div
        style={{ filter: 'blur(5px)', pointerEvents: 'none', userSelect: 'none' }}
        aria-hidden="true"
      >
        <LoadBalanceDashboard {...props} />
      </div>

      {/* Upgrade overlay */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="bg-caldelo-white rounded-card shadow-xl px-6 py-8 max-w-xs w-full text-center">
          <p className="font-display text-xl font-bold text-caldelo-ink leading-snug mb-2">
            See who&apos;s carrying the load this week.
          </p>
          <p className="text-sm text-caldelo-secondary leading-relaxed mb-6">
            A clearer picture of how you&apos;re sharing family life.
          </p>
          <Link
            href="/upgrade"
            className="flex items-center justify-center w-full h-12 rounded-pill bg-caldelo-green text-white text-sm font-semibold"
          >
            Unlock Load Balance — £4.99/month
          </Link>
        </div>
      </div>
    </div>
  )
}
