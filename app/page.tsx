import styles from './page.module.css'

const categories = [
  { icon: '⚡', name: 'Energy', desc: 'Gas & electricity tariffs from all major UK suppliers compared in real time.', saving: 'Save up to £480/yr', bg: 'rgba(0,184,169,0.1)' },
  { icon: '🔌', name: 'EV Charging', desc: 'Home charger tariffs and public network costs — find the cheapest way to charge.', saving: 'Save up to £320/yr', bg: 'rgba(255,107,138,0.1)' },
  { icon: '📡', name: 'Broadband', desc: 'Full-fibre, cable and standard broadband deals matched to your postcode.', saving: 'Save up to £240/yr', bg: 'rgba(0,200,83,0.1)' },
  { icon: '📱', name: 'Mobile & TV', desc: 'SIM-only deals, TV packages and bundles that beat your current contract.', saving: 'Save up to £180/yr', bg: 'rgba(255,107,138,0.1)' },
]
const steps = [
  { number: '1', color: 'var(--navy)', title: 'Tell us about your home', desc: 'Answer a few quick questions — takes under 60 seconds and we never share your data.' },
  { number: '2', color: 'var(--teal)', title: 'We find your best deals', desc: 'Caldelo scans hundreds of tariffs across energy, EV, broadband and mobile instantly.' },
  { number: '3', color: 'var(--green)', title: 'Switch and start saving', desc: 'Choose the deals that work for you and switch with one click. No hidden fees.' },
]
const reviews = [
  { text: "Switched my energy tariff through Caldelo and I'm already saving over £40 a month. Took less than 60 seconds.", name: 'Sarah J.', location: 'Manchester', initials: 'SJ', color: 'var(--teal)' },
  { text: "Finally found a site that makes switching simple. Found a better EV tariff I didn't even know existed.", name: 'Mark T.', location: 'Bristol', initials: 'MT', color: 'var(--navy)' },
  { text: 'Saved £380 on broadband and mobile combined. Caldelo is now the first place I go when any contract renews.', name: 'Priya K.', location: 'London', initials: 'PK', color: 'var(--pink)' },
]
const faqs = [
  { q: 'Is Caldelo free to use?', a: 'Yes — completely free. We earn a small referral fee from providers when you switch, so you never pay a penny.' },
  { q: 'Will this affect my credit score?', a: 'No. We never run a credit check. Comparing deals on Caldelo has zero impact on your credit file.' },
  { q: 'How accurate are the savings shown?', a: 'Savings are based on current market tariffs and your household inputs. Actual savings may vary slightly.' },
  { q: 'Is my data safe?', a: 'Absolutely. We are GDPR compliant, never sell your data, and only use your information to find you better deals.' },
]

export default function Home() {
  return (
    <main>
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>Cal<span>delo</span></a>
        <ul className={styles.navLinks}>
          <li><a href="#how-it-works">How it works</a></li>
          <li><a href="#categories">Savings</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="/calculator" className={styles.navCta}>Start saving</a></li>
        </ul>
      </nav>

      <section className={styles.hero} id="start">
        <div className={styles.heroInner}>
          <div>
            <div className={styles.heroBadge}><span className={styles.badgeDot} />UK households save avg. £847/yr</div>
            <h1 className={styles.heroH1}>Stop overpaying.<br />Start <span className={styles.highlight}>saving more</span><br />on every bill.</h1>
            <p className={styles.heroP}>Caldelo finds you better deals on energy, EV charging, broadband and mobile — in 60 seconds. No jargon, no hassle.</p>
            <div className={styles.heroActions}>
              <a href="/calculator" className={styles.btnPrimary}>See my savings →</a>
              <a href="#how-it-works" className={styles.btnSecondary}>How it works</a>
            </div>
          </div>
          <div className={styles.heroCard}>
            <div className={styles.heroCardHeader}>
              <h3>Your potential savings</h3>
              <span className={styles.savingsBadge}>↑ Updated today</span>
            </div>
            <div className={styles.savingsAmount}>£1,220</div>
            <div className={styles.savingsLabel}>estimated annual savings for your home</div>
            <div className={styles.savingsBreakdown}>
              {[
                { icon: '⚡', name: 'Energy', saving: '£480/yr', bg: 'rgba(0,184,169,0.1)' },
                { icon: '🔌', name: 'EV Charging', saving: '£320/yr', bg: 'rgba(255,107,138,0.1)' },
                { icon: '📡', name: 'Broadband', saving: '£240/yr', bg: 'rgba(0,200,83,0.1)' },
                { icon: '📱', name: 'Mobile & TV', saving: '£180/yr', bg: 'rgba(255,107,138,0.1)' },
              ].map((item) => (
                <div key={item.name} className={styles.breakdownItem}>
                  <div className={styles.breakdownLeft}>
                    <div className={styles.breakdownIcon} style={{ background: item.bg }}>{item.icon}</div>
                    <span className={styles.breakdownName}>{item.name}</span>
                  </div>
                  <span className={styles.breakdownSaving}>{item.saving}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={styles.trustBar}>
        <div className={styles.trustItem}>🔒 <strong>No credit check</strong> required</div>
        <div className={styles.trustItem}>⚡ <strong>Results in 60 seconds</strong></div>
        <div className={styles.trustItem}>🇬🇧 <strong>UK households</strong> only</div>
        <div className={styles.trustItem}>✓ <strong>100% free</strong> to use</div>
      </div>

      <section className={styles.howSection} id="how-it-works">
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>How it works</div>
          <h2>Three steps to saving more</h2>
          <p className={styles.sectionSub}>No lengthy forms. No cold calls. Just honest comparisons that put money back in your pocket.</p>
          <div className={styles.stepsGrid}>
            {steps.map((step) => (
              <div key={step.number} className={styles.stepCard}>
                <div className={styles.stepNumber} style={{ background: step.color }}>{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.categoriesSection} id="categories">
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>Savings categories</div>
          <h2>Every bill. One place.</h2>
          <p className={styles.sectionSub}>From energy to mobile — Caldelo covers all the bills that hit hardest.</p>
          <div className={styles.categoriesGrid}>
            {categories.map((cat) => (
              <a key={cat.name} href="/calculator" className={styles.categoryCard}>
                <div className={styles.catIcon} style={{ background: cat.bg }}>{cat.icon}</div>
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
                <div className={styles.catSaving}>{cat.saving}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.trustSection}>
        <div className={styles.trustInner}>
          <div className={styles.sectionLabel} style={{ color: 'var(--teal)' }}>Why Caldelo</div>
          <h2 style={{ color: 'white' }}>Built for UK households</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '3rem' }}>We are on your side — not the providers.</p>
          <div className={styles.trustStats}>
            {[
              { number: '£847', label: 'Average annual saving per household' },
              { number: '200+', label: 'Tariffs and providers compared' },
              { number: '60s', label: 'Average time to find your best deal' },
            ].map((stat) => (
              <div key={stat.number} className={styles.trustStat}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.reviewsSection} id="reviews">
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabel}>Reviews</div>
          <h2>What households are saying</h2>
          <p className={styles.sectionSub}>Real people. Real savings.</p>
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

      <section className={styles.faqSection} id="faq">
        <div className={styles.faqInner}>
          <div>
            <div className={styles.sectionLabel}>FAQ</div>
            <h2>Common questions</h2>
            <p className={styles.sectionSub}>Everything you need to know before you start.</p>
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

      <section className={styles.finalCta}>
        <h2>Ready to stop overpaying?</h2>
        <p>Join thousands of UK households saving money with Caldelo — it only takes 60 seconds.</p>
        <a href="/calculator" className={styles.btnPrimary} style={{ background: 'var(--teal)', fontSize: '1.05rem', padding: '1rem 2rem' }}>Start saving today →</a>
      </section>

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
        <div className={styles.footerCopy}>© 2026 Caldelo. Registered in England & Wales. Free comparison service. We may receive a commission from providers when you switch.</div>
      </footer>
    </main>
  )
}
