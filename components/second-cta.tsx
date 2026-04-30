import { WaitlistForm } from './waitlist-form'

export function SecondCta() {
  return (
    <section className="bg-caldelo-green py-20 px-5 md:py-28">
      <div className="max-w-md mx-auto text-center">
        <h2 className="font-display text-3xl font-bold text-white mb-3">
          Be first when we launch.
        </h2>
        <p className="text-white/75 text-sm mb-8">
          Join the waitlist. Free. No spam. Ever.
        </p>
        <WaitlistForm variant="cta" />
      </div>
    </section>
  )
}
