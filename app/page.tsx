import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { PainSection } from '@/components/pain-section'
import { CalendarSection } from '@/components/calendar-section'
import { Features } from '@/components/features'
import { PrioritySection } from '@/components/priority-section'
import { Testimonials } from '@/components/testimonials'
import { SecondCta } from '@/components/second-cta'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PainSection />
        <CalendarSection />
        <Features />
        <PrioritySection />
        <Testimonials />
        <SecondCta />
      </main>
      <Footer />
    </>
  )
}
