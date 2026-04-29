'use client'

import { useState } from 'react'

interface WaitlistFormProps {
  variant?: 'hero' | 'cta'
}

export function WaitlistForm({ variant = 'hero' }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setEmail('')
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const isHero = variant === 'hero'

  if (status === 'success') {
    return (
      <p className={`text-sm font-medium min-h-[44px] flex items-center ${isHero ? 'text-caldelo-green' : 'text-white'}`}>
        ✓ You&apos;re on the list. We&apos;ll be in touch.
      </p>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          aria-label="Email address"
          className={
            isHero
              ? 'flex-1 min-w-0 h-11 px-4 rounded-input bg-caldelo-surface border border-caldelo-border text-caldelo-ink placeholder:text-caldelo-muted text-sm focus:outline-none focus:ring-2 focus:ring-caldelo-green focus:border-transparent'
              : 'flex-1 min-w-0 h-11 px-4 rounded-input bg-white/20 border border-white/30 text-white placeholder:text-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent'
          }
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          aria-busy={status === 'loading'}
          className={
            isHero
              ? 'h-11 px-5 rounded-input bg-caldelo-green text-white text-sm font-semibold whitespace-nowrap hover:opacity-90 transition-opacity disabled:opacity-60'
              : 'h-11 px-5 rounded-input bg-white text-caldelo-green text-sm font-semibold whitespace-nowrap hover:opacity-90 transition-opacity disabled:opacity-60'
          }
        >
          {status === 'loading' ? 'Joining…' : isHero ? 'Get early access' : 'Join'}
        </button>
      </form>
      {status === 'error' && (
        <p className={`text-xs mt-2 ${isHero ? 'text-caldelo-coral' : 'text-white/75'}`}>
          Something went wrong — please try again.
        </p>
      )}
    </>
  )
}
