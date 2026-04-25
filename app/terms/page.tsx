import styles from './terms.module.css'

export default function Terms() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>Cal<span>delo</span></a>
      </nav>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>Legal</div>
          <h1>Terms & Conditions</h1>
          <p className={styles.meta}>Last updated: April 2026 | Caldelo, England & Wales</p>
        </div>

        <div className={styles.content}>
          <div className={styles.highlight}>
            <strong>The short version:</strong> Caldelo is a free comparison service. We help you find better deals — we are not a financial adviser, energy supplier, or broadband provider. Always check the full details of any deal before switching.
          </div>

          <h2>1. About Caldelo</h2>
          <p>Caldelo (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a free price comparison website operated at caldelo.co.uk, registered in England and Wales.</p>
          <p>We help UK households compare deals on energy, EV charging, broadband and mobile services. By using our website, you agree to these Terms and Conditions.</p>

          <h2>2. Our service</h2>
          <p>Caldelo provides a free comparison service. We are an introducer — we connect you with providers but we are not responsible for the products or services those providers offer.</p>
          <p>We are <strong>not</strong>:</p>
          <ul>
            <li>A financial adviser or regulated financial service</li>
            <li>An energy supplier, broadband provider, or mobile network</li>
            <li>Responsible for the terms, pricing, or service quality of any third-party provider</li>
          </ul>

          <h2>3. How we make money</h2>
          <p>Caldelo is free to use. We earn a commission from providers when you switch through our service. This commission does not affect the price you pay — providers offer the same rates whether you come through Caldelo or directly.</p>
          <p>Our editorial independence is protected — commission relationships do not influence which deals we display or recommend.</p>

          <h2>4. Accuracy of information</h2>
          <p>We work hard to keep our comparison data accurate and up to date. However:</p>
          <ul>
            <li>Tariffs and deals change frequently — always verify the current price directly with the provider before switching</li>
            <li>Savings estimates are indicative and based on the information you provide — actual savings may vary</li>
            <li>We cannot guarantee that all deals shown are available in your area or to your household</li>
          </ul>
          <p>Caldelo is not liable for any decisions made based on the information displayed on our website.</p>

          <h2>5. Eligibility</h2>
          <p>To use Caldelo you must be:</p>
          <ul>
            <li>Aged 18 or over</li>
            <li>A resident of the United Kingdom</li>
            <li>The bill payer or account holder for the service you wish to compare</li>
          </ul>

          <h2>6. Your responsibilities</h2>
          <p>When using Caldelo you agree to:</p>
          <ul>
            <li>Provide accurate information when using our comparison tools</li>
            <li>Not use our service for any fraudulent, unlawful, or abusive purpose</li>
            <li>Not attempt to scrape, copy, or reproduce our comparison data</li>
            <li>Not interfere with the security or functionality of our website</li>
          </ul>

          <h2>7. Switching providers</h2>
          <p>When you choose to switch through Caldelo:</p>
          <ul>
            <li>We will pass your details to your chosen provider to process your application</li>
            <li>The provider&apos;s own terms and conditions will apply to your contract with them</li>
            <li>Any cooling-off rights are between you and the provider directly</li>
            <li>Caldelo is not a party to any contract between you and a provider</li>
          </ul>

          <h2>8. Not financial advice</h2>
          <p>Nothing on caldelo.co.uk constitutes financial, legal, or regulated advice. Our comparisons are for information purposes only. If you require financial advice, please consult a qualified, FCA-authorised adviser.</p>

          <h2>9. Intellectual property</h2>
          <p>All content on caldelo.co.uk — including text, graphics, logos, and code — is owned by or licensed to Caldelo and is protected by UK and international copyright law. You may not reproduce, distribute, or use our content without our written permission.</p>

          <h2>10. Third party links</h2>
          <p>Our website may contain links to third-party websites and providers. We are not responsible for the content, privacy practices, or services of those websites. Visiting third-party sites is at your own risk.</p>

          <h2>11. Limitation of liability</h2>
          <p>To the fullest extent permitted by law, Caldelo shall not be liable for:</p>
          <ul>
            <li>Any indirect, incidental, or consequential loss arising from use of our service</li>
            <li>Loss of savings, revenue, or profit based on our comparison data</li>
            <li>Any interruption, error, or unavailability of our website</li>
            <li>Actions taken by third-party providers you switch to through our service</li>
          </ul>
          <p>Our total liability to you shall not exceed £100 in any circumstances.</p>

          <h2>12. Disclaimer of warranties</h2>
          <p>Caldelo is provided &ldquo;as is&rdquo; without any warranty, express or implied. We do not warrant that our service will be uninterrupted, error-free, or free from viruses or other harmful components.</p>

          <h2>13. Privacy</h2>
          <p>Your use of Caldelo is also governed by our <a href="/privacy">Privacy Policy</a>, which is incorporated into these Terms by reference. Please read it carefully.</p>

          <h2>14. Changes to these terms</h2>
          <p>We may update these Terms from time to time. We will notify you of significant changes by displaying a notice on our website. Continued use of Caldelo after changes are posted constitutes your acceptance of the updated Terms.</p>

          <h2>15. Governing law</h2>
          <p>These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>

          <h2>16. Contact us</h2>
          <div className={styles.contactBox}>
            <strong>Caldelo</strong><br />
            Email: <a href="mailto:legal@caldelo.co.uk">legal@caldelo.co.uk</a><br />
            Website: caldelo.co.uk<br />
            Registered in England &amp; Wales
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <a href="/" className={styles.footerLogo}>Cal<span>delo</span></a>
          <ul className={styles.footerLinks}>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms &amp; Conditions</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className={styles.footerCopy}>© 2026 Caldelo. Registered in England &amp; Wales. Free comparison service.</div>
      </footer>
    </main>
  )
}
