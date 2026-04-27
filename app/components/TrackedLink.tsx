'use client'

import type { CSSProperties, ReactNode } from 'react'
import { trackEvent } from '../lib/analytics'

interface Props {
  href: string
  className?: string
  style?: CSSProperties
  buttonText: string
  children: ReactNode
}

export default function TrackedLink({ href, className, style, buttonText, children }: Props) {
  function handleClick() {
    trackEvent('homepage_cta_click', {
      page_path: window.location.pathname,
      button_text: buttonText,
      link_destination: href,
    })
  }

  return (
    <a href={href} className={className} style={style} onClick={handleClick}>
      {children}
    </a>
  )
}
