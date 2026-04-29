import type { Metadata, Viewport } from 'next'
import { Fraunces, DM_Sans } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Caldelo — Run family life like a team',
  description:
    "Caldelo gives busy parents shared clarity — who's doing what, what's coming up, and no more dropped balls.",
  openGraph: {
    title: 'Caldelo — Run family life like a team',
    description: 'Shared clarity for busy homes. Both partners, always on the same page.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="bg-caldelo-white font-sans text-caldelo-ink antialiased">
        {children}
      </body>
    </html>
  )
}
