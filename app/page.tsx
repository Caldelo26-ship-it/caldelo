import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { Problem } from '@/components/problem'
import { Features } from '@/components/features'
import { SecondCta } from '@/components/second-cta'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Features />
        <SecondCta />
      </main>
      <Footer />
    </>
  )
}
