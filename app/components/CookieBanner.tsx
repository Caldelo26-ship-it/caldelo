'use client'

import { useState, useEffect } from 'react'
import styles from './CookieBanner.module.css'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem('caldelo_cookie_consent')) {
        setVisible(true)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  function accept() {
    try { localStorage.setItem('caldelo_cookie_consent', 'accepted') } catch {}
    window.dispatchEvent(new CustomEvent('caldelo_consent', { detail: 'accepted' }))
    setVisible(false)
  }

  function reject() {
    try { localStorage.setItem('caldelo_cookie_consent', 'rejected') } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <div className={styles.inner}>
        <div className={styles.text}>
          <strong>Cookies &amp; privacy</strong>
          <p>
            We use Google Analytics to understand how visitors use Caldelo. No personal data is sold or shared.
            {' '}<a href="/privacy" className={styles.link}>Privacy Policy</a>.
          </p>
        </div>
        <div className={styles.actions}>
          <button className={styles.reject} onClick={reject}>Reject</button>
          <button className={styles.accept} onClick={accept}>Accept</button>
        </div>
      </div>
    </div>
  )
}
