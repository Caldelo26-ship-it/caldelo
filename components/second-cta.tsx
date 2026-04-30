import { WaitlistForm } from './waitlist-form'

export function SecondCta() {
  return (
    <section className="relative overflow-hidden py-[80px] md:py-[120px] px-6 md:px-8" style={{ backgroundColor: '#1e3a2a' }}>
      <div className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative max-w-[560px] mx-auto text-center">
        <p className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-6">
          Launching soon · Built with working parents
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          Be first when we launch.
        </h2>
        <p className="text-white/60 text-base md:text-lg mb-10">
          Join 300+ families already on the list. Free. No spam. Ever.
        </p>
        <WaitlistForm variant="cta" />
      </div>
    </section>
  )
}
