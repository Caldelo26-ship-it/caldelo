'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'

const GA_ID = 'G-36H6DDV1VT'

export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem('caldelo_cookie_consent') === 'accepted') {
        setConsented(true)
      }
    } catch {}

    // Load GA when user accepts during this session
    function onConsent(e: Event) {
      if ((e as CustomEvent).detail === 'accepted') setConsented(true)
    }
    window.addEventListener('caldelo_consent', onConsent)
    return () => window.removeEventListener('caldelo_consent', onConsent)
  }, [])

  if (!consented) return null

  return (
    <>
      <Script
        id="caldelo-ga-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="caldelo-ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true})`}
      </Script>
    </>
  )
}
