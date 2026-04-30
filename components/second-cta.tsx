import { WaitlistForm } from './waitlist-form'

export function SecondCta() {
  return (
    <section className="relative overflow-hidden py-20 px-5 md:py-28" style={{ backgroundColor: '#1e3a2a' }}>
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative max-w-md mx-auto text-center">
        <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-4">
          Launching soon · Built with working parents
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
          Be first when we launch.
        </h2>
        <p className="text-white/60 text-sm mb-8">
          Join 300+ families already on the list. Free. No spam. Ever.
        </p>
        <WaitlistForm variant="cta" />
      </div>
    </section>
  )
}
