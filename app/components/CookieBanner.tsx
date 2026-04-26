'use client'

import { useState, useEffect } from 'react'
import styles from './CookieBanner.module.css'

const GA_ID = 'G-XXXXXXXXXX' // Replace with your GA4 Measurement ID

function loadGA() {
  if (document.getElementById('caldelo-ga')) return

  const s1 = document.createElement('script')
  s1.id = 'caldelo-ga'
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  s1.async = true
  document.head.appendChild(s1)

  const s2 = document.createElement('script')
  s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true})`
  document.head.appendChild(s2)
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('caldelo_cookie_consent')
    if (!consent) {
      setVisible(true)
    } else if (consent === 'accepted') {
      loadGA()
    }
  }, [])

  function accept() {
    localStorage.setItem('caldelo_cookie_consent', 'accepted')
    loadGA()
    setVisible(false)
  }

  function reject() {
    localStorage.setItem('caldelo_cookie_consent', 'rejected')
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
