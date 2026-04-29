import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export const metadata = { title: 'Privacy Policy — Caldelo' }

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="max-w-2xl mx-auto px-5 py-16">
        <h1 className="font-display text-3xl font-bold text-caldelo-ink mb-6">Privacy Policy</h1>
        <p className="text-caldelo-secondary text-base leading-relaxed">
          Caldelo is currently in development. A full privacy policy will be published before launch.
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
