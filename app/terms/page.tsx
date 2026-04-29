import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export const metadata = { title: 'Terms of Service — Caldelo' }

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="max-w-2xl mx-auto px-5 py-16">
        <h1 className="font-display text-3xl font-bold text-caldelo-ink mb-6">Terms of Service</h1>
        <p className="text-caldelo-secondary text-base leading-relaxed">
          Caldelo is currently in development. Full terms of service will be published before launch.
          Questions?{' '}
          <a href="mailto:hello@caldelo.com" className="text-caldelo-green underline">
            hello@caldelo.com
          </a>
        </p>
      </main>
      <Footer />
    </>
  )
}
