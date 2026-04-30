import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { CalendarSection } from '@/components/calendar-section'
import { Features } from '@/components/features'
import { Testimonials } from '@/components/testimonials'
import { SecondCta } from '@/components/second-cta'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CalendarSection />
        <Features />
        <Testimonials />
        <SecondCta />
      </main>
      <Footer />
    </>
  )
}
