type GtagFn = (...args: unknown[]) => void

export function trackEvent(name: string, params: Record<string, string>) {
  if (typeof window === 'undefined') return
  const w = window as Window & { gtag?: GtagFn }
  if (typeof w.gtag !== 'function') return
  w.gtag('event', name, params)
}

export function getBillBand(monthly: number): string {
  if (monthly < 100) return '0-99'
  if (monthly < 150) return '100-149'
  if (monthly < 200) return '150-199'
  if (monthly < 300) return '200-299'
  return '300+'
}

export function getSavingBand(saving: number): string {
  if (saving < 100) return '0-99'
  if (saving < 250) return '100-249'
  if (saving < 500) return '250-499'
  return '500+'
}
