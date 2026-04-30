'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/browser'

type Status = 'idle' | 'loading' | 'sent' | 'error'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const supabase = createClient()

  async function handleMagicLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/callback`,
      },
    })

    if (error) {
      setErrorMessage(error.message)
      setStatus('error')
    } else {
      setStatus('sent')
    }
  }

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    })

    if (error) {
      console.error(error)
    }
  }

  if (status === 'sent') {
    return (
      <div className="w-full max-w-[400px] text-center">
        <Wordmark className="mb-10" />

        <div className="w-14 h-14 rounded-full bg-caldelo-green/15 flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="#4a7c59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h1 className="font-display text-2xl font-bold text-caldelo-ink mb-3">
          Check your inbox.
        </h1>
        <p className="text-caldelo-secondary text-base leading-relaxed mb-8">
          We&apos;ve sent a magic link to{' '}
          <span className="font-medium text-caldelo-ink">{email}</span>.
          <br />Click it to sign in — no password needed.
        </p>

        <button
          onClick={() => { setStatus('idle'); setEmail('') }}
          className="text-sm text-caldelo-secondary hover:text-caldelo-ink transition-colors underline underline-offset-2"
        >
          Use a different email
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[400px]">
      <Wordmark className="mb-10" />

      <h1 className="font-display text-4xl font-bold text-caldelo-ink mb-3 leading-tight">
        Welcome back.
      </h1>
      <p className="text-caldelo-secondary text-base mb-8">
        We&apos;ll send you a link — no password needed.
      </p>

      <form onSubmit={handleMagicLink} className="space-y-3 mb-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          aria-label="Email address"
          className="w-full h-[52px] px-4 rounded-[10px] bg-white text-caldelo-ink placeholder:text-caldelo-muted text-base transition-shadow focus:outline-none"
          style={{
            border: '1.5px solid #E5E3DC',
            boxShadow: 'none',
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = '1.5px solid #4A7C59'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74,124,89,0.12)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = '1.5px solid #E5E3DC'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          aria-busy={status === 'loading'}
          className="w-full h-[52px] rounded-[10px] bg-caldelo-green text-white text-base font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          style={{ backgroundColor: '#4A7C59' }}
        >
          {status === 'loading' ? 'Sending…' : 'Send magic link'}
        </button>
      </form>

      {status === 'error' && (
        <p className="text-sm text-caldelo-coral mb-4">
          {errorMessage || 'Something went wrong — please try again.'}
        </p>
      )}

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-caldelo-border" />
        <span className="text-[13px] text-caldelo-muted">or continue with</span>
        <div className="flex-1 h-px bg-caldelo-border" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={status === 'loading'}
        className="w-full h-[52px] rounded-[10px] bg-white border border-caldelo-border flex items-center justify-center gap-3 text-caldelo-ink text-sm font-medium hover:bg-caldelo-surface transition-colors disabled:opacity-60"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <p className="text-center text-[12px] text-caldelo-muted mt-8">
        By continuing, you agree to our{' '}
        <a href="/terms" className="underline underline-offset-2 hover:text-caldelo-secondary">
          Terms
        </a>{' '}
        and{' '}
        <a href="/privacy" className="underline underline-offset-2 hover:text-caldelo-secondary">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  )
}

function Wordmark({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 justify-center ${className}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-caldelo-green flex-shrink-0">
        <path d="M12 22V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 11C12 6 16 2 21 2C21 7 17 11 12 11Z"
          fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M12 11C12 6 8 2 3 2C3 7 7 11 12 11Z"
          fill="currentColor" fillOpacity="0.55" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
      <span className="font-display font-bold text-2xl text-caldelo-ink tracking-tight">Caldelo</span>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.71 17.64 9.2z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}
