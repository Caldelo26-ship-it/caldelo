'use client'

import { useState, useEffect } from 'react'
import styles from './calculator.module.css'
import { trackEvent, getBillBand, getSavingBand } from '../lib/analytics'

// Based on Ofgem Q2 2026 price cap data
// Average UK dual-fuel bill: £1,641/year (£136.75/month)
// Best fixed tariffs typically 10-15% below price cap
const ENERGY_SAVING_PCT = 0.13
const MIN_SAVING = 80
const MAX_SAVING = 600

function calcSaving(monthlyBill: number): number {
  const annual = monthlyBill * 12
  const saving = Math.round(annual * ENERGY_SAVING_PCT)
  return Math.min(Math.max(saving, MIN_SAVING), MAX_SAVING)
}

export default function CalculatorClient() {
  const [bill, setBill] = useState('')
  const [step, setStep] = useState<'input' | 'result' | 'reminder'>('input')
  const [email, setEmail] = useState('')
  const [service, setService] = useState<'broadband' | 'mobile' | ''>('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const saving = bill ? calcSaving(parseFloat(bill)) : 0
  const annual = bill ? Math.round(parseFloat(bill) * 12) : 0

  useEffect(() => {
    trackEvent('calculator_page_view', { page_path: window.location.pathname })
  }, [])

  useEffect(() => {
    if (step === 'result') {
      trackEvent('results_page_view', {
        estimated_saving_band: getSavingBand(saving),
      })
    }
  }, [step, saving])

  function handleCalculate() {
    const val = parseFloat(bill)
    if (!bill || isNaN(val) || val < 1) {
      setError('Please enter a valid monthly bill amount')
      return
    }
    if (val > 1000) {
      setError('Please check your amount — this seems high')
      return
    }
    setError('')
    trackEvent('calculator_submit', {
      page_path: window.location.pathname,
      entered_bill_band: getBillBand(val),
    })
    setStep('result')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleCalculate()
  }

  function handleReminder(s: 'broadband' | 'mobile') {
    setService(s)
    setStep('reminder')
  }

  function handleSubmit() {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <div className={styles.wrapper}>

      {/* STEP 1 — INPUT */}
      {step === 'input' && (
        <div className={styles.card}>
          <div className={styles.stepBadge}>⚡ Energy savings</div>
          <h1 className={styles.title}>How much is your monthly energy bill?</h1>
          <p className={styles.sub}>Enter your monthly Direct Debit amount to see your estimated annual saving instantly.</p>

          <div className={styles.inputWrap}>
            <span className={styles.pound}>£</span>
            <input
              className={styles.input}
              type="number"
              inputMode="numeric"
              placeholder="136"
              value={bill}
              onChange={e => { setBill(e.target.value); setError('') }}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <span className={styles.perMonth}>/month</span>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.btnPrimary} onClick={handleCalculate}>
            Calculate My Savings →
          </button>

          <div className={styles.trustRow}>
            <span>✓ Free estimate</span>
            <span>✓ No email required</span>
            <span>✓ Based on UK market data</span>
          </div>

          <p className={styles.hint}>
            Not sure? The UK average is <strong>£137/month</strong> based on Ofgem Q2 2026 data.
          </p>
        </div>
      )}

      {/* STEP 2 — RESULT */}
      {step === 'result' && (
        <div className={styles.card}>
          <div className={styles.stepBadge}>✓ Your result</div>
          <p className={styles.resultLabel}>Based on your bill of <strong>£{parseFloat(bill).toFixed(0)}/month</strong> (£{annual}/year)</p>

          <div className={styles.savingBox}>
            <div className={styles.savingAmount}>£{saving}</div>
            <div className={styles.savingText}>estimated annual saving on energy</div>
          </div>

          <p className={styles.disclaimer}>Estimate based on your monthly bill and current UK market averages. Actual savings may vary.</p>

          <div className={styles.breakdown}>
            <div className={styles.breakdownRow}>
              <span>Your current annual spend</span>
              <span className={styles.current}>£{annual}</span>
            </div>
            <div className={styles.breakdownRow}>
              <span>Best available tariff</span>
              <span className={styles.best}>£{annual - saving}</span>
            </div>
            <div className={`${styles.breakdownRow} ${styles.savingRow}`}>
              <span>Your potential saving</span>
              <span className={styles.savingHighlight}>£{saving}/yr</span>
            </div>
          </div>

          <a
            href="/energy"
            className={styles.btnPrimary}
            onClick={() => trackEvent('results_cta_click', {
              button_text: 'See Cheaper Energy Deals',
              link_destination: '/energy',
              page_path: window.location.pathname,
            })}
          >
            See Cheaper Energy Deals →
          </a>

          <div className={styles.divider}>
            <span>What about your other bills?</span>
          </div>

          <p className={styles.contractNote}>
            Switching broadband or mobile mid-contract can mean exit fees of <strong>£100–£300</strong>. We&apos;ll never push you to switch before you&apos;re ready.
          </p>

          <div className={styles.reminderCards}>
            <button className={styles.reminderCard} onClick={() => handleReminder('broadband')}>
              <div className={styles.reminderIcon}>📡</div>
              <div>
                <div className={styles.reminderTitle}>Broadband</div>
                <div className={styles.reminderSub}>Remind me when my contract ends</div>
              </div>
              <span className={styles.reminderArrow}>→</span>
            </button>
            <button className={styles.reminderCard} onClick={() => handleReminder('mobile')}>
              <div className={styles.reminderIcon}>📱</div>
              <div>
                <div className={styles.reminderTitle}>Mobile</div>
                <div className={styles.reminderSub}>Remind me when my contract ends</div>
              </div>
              <span className={styles.reminderArrow}>→</span>
            </button>
          </div>

          <button className={styles.btnSecondary} onClick={() => { setStep('input'); setBill('') }}>
            ← Recalculate
          </button>
        </div>
      )}

      {/* STEP 3 — REMINDER */}
      {step === 'reminder' && !submitted && (
        <div className={styles.card}>
          <div className={styles.stepBadge}>
            {service === 'broadband' ? '📡 Broadband reminder' : '📱 Mobile reminder'}
          </div>
          <h2 className={styles.title}>
            We&apos;ll find you the best {service} deal when you&apos;re ready
          </h2>
          <p className={styles.sub}>
            Enter your email and we&apos;ll remind you when it&apos;s the right time to switch — no spam, no pressure, just the best deal when it matters.
          </p>

          <div className={styles.inputWrap} style={{ marginBottom: '1rem' }}>
            <input
              className={styles.input}
              style={{ paddingLeft: '1rem' }}
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              autoFocus
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.btnPrimary} onClick={handleSubmit}>
            Set my reminder →
          </button>

          <p className={styles.hint}>
            We&apos;ll only email you when it matters. Unsubscribe anytime.
          </p>

          <button className={styles.btnSecondary} onClick={() => setStep('result')}>
            ← Back to my results
          </button>
        </div>
      )}

      {/* CONFIRMATION */}
      {step === 'reminder' && submitted && (
        <div className={styles.card} style={{ textAlign: 'center' }}>
          <div className={styles.successIcon}>🎉</div>
          <h2 className={styles.title}>You&apos;re all set!</h2>
          <p className={styles.sub}>
            We&apos;ll remind you when it&apos;s the right time to switch your {service}. In the meantime, don&apos;t forget you could save <strong>£{saving}/year</strong> on your energy right now.
          </p>
          <a href="/energy" className={styles.btnPrimary}>
            See energy deals →
          </a>
          <button className={styles.btnSecondary} onClick={() => setStep('result')}>
            ← Back to my results
          </button>
        </div>
      )}

    </div>
  )
}
