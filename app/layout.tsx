import type { Metadata } from 'next'
import './globals.css'
import CookieBanner from './components/CookieBanner'

export const metadata: Metadata = {
  title: 'Caldelo — Save More on Every Bill',
  description: 'Caldelo helps UK households find better deals on energy, EV charging, broadband and mobile. See how much you could save in 60 seconds.',
  metadataBase: new URL('https://caldelo.co.uk'),
  openGraph: {
    title: 'Caldelo — Save More on Every Bill',
    description: 'Find better deals on energy, EV charging, broadband and mobile for UK households.',
    url: 'https://caldelo.co.uk',
    siteName: 'Caldelo',
    locale: 'en_GB',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F2D5E" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Caldelo" />
      </head>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
