import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { Problem } from '@/components/problem'
import { Features } from '@/components/features'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Features />
      </main>
    </>
  )
}
