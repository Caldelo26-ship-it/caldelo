import type { Metadata } from 'next'
import styles from './energy.module.css'

export const metadata: Metadata = {
  title: 'Switch Energy Supplier & Save Up to £480/yr | Caldelo',
  description: 'Compare energy tariffs from every major UK supplier and find out how much you could save. No credit check, 100% free, results in 60 seconds. Average saving £480/yr.',
  alternates: { canonical: 'https://caldelo.co.uk/energy' },
  openGraph: {
    title: 'Switch Energy Supplier & Save Up to £480/yr | Caldelo',
    description: 'Compare UK energy tariffs in 60 seconds. No credit check, completely free.',
    url: 'https://caldelo.co.uk/energy',
    siteName: 'Caldelo',
    locale: 'en_GB',
    type: 'website',
  },
}

const steps = [
  {
    number: '1',
    color: 'var(--navy)',
    title: 'Tell us about your home',
    desc: 'Answer 3 quick questions about your current energy bill. Takes under 60 seconds and we never share your data.',
  },
  {
    number: '2',
    color: 'var(--teal)',
    title: 'We compare hundreds of tariffs',
    desc: 'Caldelo scans every major UK supplier and finds the tariffs that will save your household the most money right now.',
  },
  {
    number: '3',
    color: 'var(--green)',
    title: 'Switch with one click',
    desc: 'Choose the deal that works for you. Your new supplier handles the switch — no engineers, no downtime, no hassle.',
  },
]

const savings = [
  {
    type: '1–2 bed flat',
    icon: '🏠',
    bill: '£60–£90/month',
    saving: 'Up to £200/yr',
    highlight: false,
  },
  {
    type: '3 bed semi',
    icon: '🏡',
    bill: '£100–£150/month',
    saving: 'Up to £320/yr',
    highlight: true,
  },
  {
    type: '4–5 bed house',
    icon: '🏘️',
    bill: '£160–£250/month',
    saving: 'Up to £480/yr',
    highlight: false,
  },
]

const whyPoints = [
  { icon: '⚡', heading: 'Results in 60 seconds', body: 'No lengthy forms, no phone calls. Enter your monthly bill and see your best deal instantly.' },
  { icon: '🔒', heading: 'No credit check, ever', body: 'Comparing and switching energy never affects your credit file. We never run a credit check.' },
  { icon: '🇬🇧', heading: 'Every major UK supplier', body: 'We compare tariffs across all major suppliers — over 200 deals — so you see the full market.' },
  { icon: '✓', heading: '100% free to use', body: 'Caldelo earns a small referral fee from suppliers when you switch. You never pay a penny.' },
  { icon: '📋', heading: 'No paperwork or engineers', body: 'Your new supplier handles everything. The same pipes deliver your energy — switching changes nothing physical.' },
  { icon: '🛡️', heading: 'GDPR compliant', body: 'Your data is never sold. We only use the information you give us to find you better deals.' },
]

const reviews = [
  { text: "Switched through Caldelo in about 3 minutes. Already saving £38 a month on my energy bill. Wish I'd done it years ago.", name: 'Sarah J.', location: 'Manchester', initials: 'SJ', color: 'var(--teal)' },
  { text: "I was nervous about switching but the whole process was completely painless. No engineers, no downtime — just a lower bill the next month.", name: 'Mark T.', location: 'Bristol', initials: 'MT', color: 'var(--navy)' },
  { text: "Finally switched away from British Gas after 12 years. Saving £340 a year. Caldelo made the whole thing straightforward and honest.", name: 'Priya K.', location: 'London', initials: 'PK', color: 'var(--pink)' },
]

const faqs = [
  {
    q: 'How do I switch energy supplier in the UK?',
    a: "It's simpler than most people expect. Find a better tariff, agree to switch, and your new supplier contacts your current one and handles the changeover. Your supply is never interrupted — the same pipes and wires deliver your energy regardless of who you pay. The process typically takes 2–4 weeks.",
  },
  {
    q: 'Will switching energy supplier affect my credit score?',
    a: 'No. Switching energy supplier does not involve a credit check and has zero impact on your credit file. Caldelo itself never runs a credit check at any point.',
  },
  {
    q: 'How much can I save by switching energy supplier?',
    a: 'It depends on what you currently pay and your household size. UK households switching from a standard variable tariff to a competitive fixed deal typically save between £200 and £480 a year, based on current Ofgem-validated market data.',
  },
  {
    q: 'Is there a fee to switch or use Caldelo?',
    a: 'Caldelo is completely free to use. We earn a small referral commission from energy suppliers when you switch through our site. This does not affect the tariffs shown or the price you pay.',
  },
  {
    q: 'What is the Ofgem price cap and does it mean I have the best deal?',
    a: "The Ofgem price cap sets the maximum unit rates and standing charges that suppliers can charge on a standard variable tariff — it's reviewed quarterly. The cap protects against the very worst rates but does not mean you're getting the best deal. Fixed tariffs are often 10–15% cheaper.",
  },
  {
    q: 'Are there exit fees when I switch energy?',
    a: "If you're on a fixed-rate tariff you may face early exit fees, typically £25–£75 per fuel. If you're on a standard variable tariff (most people are), there are no exit fees at all. Check your current contract before switching — Caldelo will flag this during the comparison.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function EnergyPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* NAV */}
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>Cal<span>delo</span></a>
        <ul className={styles.navLinks}>
          <li><a href="#how-it-works">How it works</a></li>
          <li><a href="#savings">Savings</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="/calculator" className={styles.navCta}>Check my savings</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className={styles.hero} id="start">
        <div className={styles.heroInner}>
          <div>
            <div className={styles.heroBadge}>
              <span className={styles.badgeDot} />
              UK households save avg. £480/yr on energy
            </div>
            <h1 className={styles.heroH1}>
              Stop overpaying<br />on energy.<br />
              <span className={styles.highlight}>Switch and save.</span>
            </h1>
            <p className={styles.heroP}>
              Caldelo compares hundreds of UK energy tariffs and tells you exactly how much you could save — in 60 seconds. No credit check. No fees. No jargon.
            </p>
            <div className={styles.heroActions}>
              <a href="/calculator" className={styles.btnPrimary}>Check my savings →</a>
              <a href="#how-it-works" className={styles.btnSecondary}>How it works</a>
            </div>
            <div className={styles.heroTrust}>
              <span>🔒 No credit check</span>
              <span>✓ 100% free</span>
              <span>⚡ 60-second results</span>
            </div>
          </div>

          <div className={styles.heroCard}>
            <div className={styles.heroCardBadge}>⚡ Energy comparison</div>
            <h3 className={styles.heroCardHeading}>Typical annual saving</h3>
            <div className={styles.heroSavingAmount}>£480</div>
            <div className={styles.heroSavingLabel}>by switching from SVT to a fixed deal</div>
            <div className={styles.tariffTable}>
              <div className={styles.tariffRow}>
                <div>
                  <div className={styles.tariffName}>Standard variable tariff</div>
                  <div className={styles.tariffNote}>What most households pay</div>
                </div>
                <div className={styles.tariffRateHigh}>~28p/kWh</div>
              </div>
              <div className={`${styles.tariffRow} ${styles.tariffRowBest}`}>
                <div>
                  <div className={styles.tariffName}>Best fixed tariff today</div>
                  <div className={styles.tariffNote}>Caldelo comparison result</div>
                </div>
                <div className={styles.tariffRateLow}>~24p/kWh</div>
              </div>
            </div>
            <a href="/calculator" className={styles.heroCardCta}>See deals for my home →</a>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className={styles.trustBar}>
        <div className={styles.trustItem}>🔒 <strong>No credit check</strong> required</div>
        <div className={styles.trustItem}>⚡ <strong>Results in 60 seconds</strong></div>
        <div className={styles.trustItem}>🇬🇧 <strong>UK households</strong> only</div>
        <div className={styles.trustItem}>✓ <strong>100% free</strong> to use</div>
      </div>

      {/* HOW IT WORKS */}
      <section className={styles.howSection} id="how-it-works">
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>How it works</div>
          <h2>Switching energy — three simple steps</h2>
          <p className={styles.sectionSub}>No engineers. No downtime. No paperwork. Switching energy supplier is easier than most people think.</p>
          <div className={styles.stepsGrid}>
            {steps.map((step) => (
              <div key={step.number} className={styles.stepCard}>
                <div className={styles.stepNumber} style={{ background: step.color }}>{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.centreRow}>
            <a href="/calculator" className={styles.btnPrimary}>Check my savings →</a>
          </div>
        </div>
      </section>

      {/* SAVINGS EXAMPLES */}
      <section className={styles.savingsSection} id="savings">
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>Potential savings</div>
          <h2>How much could you save?</h2>
          <p className={styles.sectionSub}>Based on switching from a standard variable tariff to the best available fixed deal. Most households are overpaying right now.</p>
          <div className={styles.savingsGrid}>
            {savings.map((s) => (
              <div
                key={s.type}
                className={`${styles.savingCard} ${s.highlight ? styles.savingCardHighlight : ''}`}
              >
                {s.highlight && <div className={styles.popularBadge}>Most common</div>}
                <div className={styles.savingIcon}>{s.icon}</div>
                <div className={styles.savingType}>{s.type}</div>
                <div className={styles.savingBill}>Current bill {s.bill}</div>
                <div className={styles.savingAmount}>{s.saving}</div>
                <div className={styles.savingAmountLabel}>potential annual saving</div>
                <a
                  href="/calculator"
                  className={s.highlight ? styles.btnTeal : styles.btnOutline}
                >
                  Check my saving →
                </a>
              </div>
            ))}
          </div>
          <p className={styles.disclaimer}>
            Savings estimates are based on current UK market tariffs. Actual savings depend on your usage and location. <a href="/calculator" className={styles.disclaimerLink}>See your personal estimate →</a>
          </p>
        </div>
      </section>

      {/* OFGEM SECTION */}
      <section className={styles.ofgemSection}>
        <div className={styles.ofgemInner}>
          <div className={styles.ofgemContent}>
            <div className={styles.sectionLabel} style={{ color: 'var(--teal)' }}>Market context</div>
            <h2 className={styles.ofgemHeading}>What is the Ofgem price cap?</h2>
            <p className={styles.ofgemBody}>
              The Ofgem price cap sets the maximum unit rates and standing charges that suppliers can charge UK households on a standard variable tariff. It is reviewed every quarter.
            </p>
            <p className={styles.ofgemBody}>
              A typical UK household currently pays around <strong>£1,738 a year</strong> on a standard tariff. The price cap does not mean you are getting the best deal — fixed-rate tariffs are often 10–15% cheaper.
            </p>
            <p className={styles.ofgemBody}>
              Caldelo compares fixed and variable tariffs from every major supplier so you always see the full picture before you decide.
            </p>
          </div>
          <div className={styles.ofgemStats}>
            {[
              { number: '£1,738', label: 'typical annual bill on standard tariff (Q1 2026)' },
              { number: '~28p', label: 'per kWh for electricity at the price cap' },
              { number: '~7p', label: 'per kWh for gas at the price cap' },
              { number: 'Quarterly', label: 'how often Ofgem reviews the cap' },
            ].map((s) => (
              <div key={s.number} className={styles.ofgemStat}>
                <div className={styles.ofgemStatNum}>{s.number}</div>
                <div className={styles.ofgemStatLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CALDELO */}
      <section className={styles.whySection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>Why Caldelo</div>
          <h2>Why switch with Caldelo?</h2>
          <p className={styles.sectionSub}>Most UK households are on their supplier's standard tariff and overpaying by £200–£480 every year without realising it. Here is what switching with Caldelo actually means.</p>
          <div className={styles.whyGrid}>
            {whyPoints.map((w) => (
              <div key={w.heading} className={styles.whyCard}>
                <div className={styles.whyIcon}>{w.icon}</div>
                <h3 className={styles.whyHeading}>{w.heading}</h3>
                <p className={styles.whyBody}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className={styles.reviewsSection} id="reviews">
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>Reviews</div>
          <h2>What households are saying</h2>
          <p className={styles.sectionSub}>Real people. Real savings. Real energy bills.</p>
          <div className={styles.reviewsGrid}>
            {reviews.map((r) => (
              <div key={r.name} className={styles.reviewCard}>
                <div className={styles.stars}>★★★★★</div>
                <p className={styles.reviewText}>&ldquo;{r.text}&rdquo;</p>
                <div className={styles.reviewer}>
                  <div className={styles.reviewerAvatar} style={{ background: r.color }}>{r.initials}</div>
                  <div>
                    <div className={styles.reviewerName}>{r.name}</div>
                    <div className={styles.reviewerLoc}>{r.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection} id="faq">
        <div className={styles.faqInner}>
          <div className={styles.faqSide}>
            <div className={styles.sectionLabel}>FAQ</div>
            <h2>Common questions about switching energy</h2>
            <p className={styles.sectionSub}>Everything you need to know before you switch.</p>
            <a href="/calculator" className={styles.btnPrimary}>Check my savings →</a>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <div key={faq.q} className={styles.faqItem}>
                <div className={styles.faqQ}>{faq.q}</div>
                <div className={styles.faqA}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <div className={styles.sectionLabel} style={{ color: 'rgba(255,255,255,0.45)' }}>Ready to save?</div>
          <h2 className={styles.finalCtaH2}>Find your best energy deal in 60 seconds</h2>
          <p className={styles.finalCtaP}>
            Join thousands of UK households who have already switched and saved. No credit check, no fees — just a better deal.
          </p>
          <div className={styles.finalCtaActions}>
            <a href="/calculator" className={styles.btnTeal} style={{ fontSize: '1.05rem', padding: '1rem 2.25rem' }}>
              Check my savings →
            </a>
            <a href="/" className={styles.btnGhost}>Back to Caldelo</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>Cal<span>delo</span></div>
          <ul className={styles.footerLinks}>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/affiliates">Affiliates</a></li>
          </ul>
        </div>
        <div className={styles.footerCopy}>
          © 2026 Caldelo. Registered in England & Wales. Caldelo is a free comparison service. We may receive a commission from providers when you switch. Savings are estimates based on current market tariffs and may vary.
        </div>
      </footer>
    </main>
  )
}
