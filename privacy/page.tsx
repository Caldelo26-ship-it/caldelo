import styles from './privacy.module.css'

export default function PrivacyPolicy() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>Cal<span>delo</span></a>
      </nav>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>Legal</div>
          <h1>Privacy Policy</h1>
          <p className={styles.meta}>Last updated: April 2026 | Caldelo, England & Wales</p>
        </div>

        <div className={styles.content}>
          <div className={styles.highlight}>
            <strong>The short version:</strong> We collect only what we need to find you better deals. We never sell your data. We never share it with anyone except the providers you choose to switch to. You are always in control.
          </div>

          <h2>1. Who we are</h2>
          <p>Caldelo (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a free comparison service for UK households, operating at caldelo.co.uk. We help you find better deals on energy, EV charging, broadband and mobile services.</p>
          <p>For the purposes of UK GDPR and the Data Protection Act 2018, Caldelo is the Data Controller of your personal data.</p>
          <p>Contact us at: <a href="mailto:privacy@caldelo.co.uk">privacy@caldelo.co.uk</a></p>

          <h2>2. What data we collect</h2>
          <p>We collect only the information necessary to provide our comparison service:</p>
          <ul>
            <li><strong>Contact information</strong> — name, email address</li>
            <li><strong>Household information</strong> — postcode, property type, number of occupants</li>
            <li><strong>Usage information</strong> — which services you compare, which deals you view</li>
            <li><strong>Technical data</strong> — IP address, browser type, device type, pages visited</li>
            <li><strong>Communications</strong> — any messages you send us</li>
          </ul>
          <p>We do <strong>not</strong> collect payment card details, bank account numbers, or any sensitive financial information.</p>

          <h2>3. How we collect your data</h2>
          <ul>
            <li>When you use our savings comparison tools</li>
            <li>When you sign up for alerts or updates</li>
            <li>When you contact us directly</li>
            <li>Automatically through cookies when you browse caldelo.co.uk</li>
          </ul>

          <h2>4. Why we use your data (legal basis)</h2>
          <ul>
            <li><strong>Contract performance</strong> — to provide the comparison service you requested</li>
            <li><strong>Legitimate interests</strong> — to improve our service and prevent fraud</li>
            <li><strong>Consent</strong> — for marketing communications (withdraw any time)</li>
            <li><strong>Legal obligation</strong> — where required by law</li>
          </ul>

          <h2>5. How we use your data</h2>
          <ul>
            <li>Find and display relevant deals for your household</li>
            <li>Process your requests to switch provider</li>
            <li>Send deal alerts and savings updates (with your consent only)</li>
            <li>Improve and personalise your experience</li>
            <li>Comply with legal and regulatory obligations</li>
            <li>Detect and prevent fraud</li>
          </ul>

          <h2>6. Who we share your data with</h2>
          <p>We do <strong>not</strong> sell your personal data. Ever.</p>
          <ul>
            <li><strong>Energy and service providers</strong> — only when you choose to switch, and only the information needed to process your application</li>
            <li><strong>Technology partners</strong> — who help us operate our website, contractually bound to protect your data</li>
            <li><strong>Analytics providers</strong> — anonymised, aggregated data only</li>
            <li><strong>Legal authorities</strong> — where required by law</li>
          </ul>

          <h2>7. Affiliate relationships</h2>
          <p>Caldelo earns a commission from providers when you switch through our service. This is how we keep Caldelo free to use. This does not affect which deals we show you — we always show the most relevant deals based on your inputs.</p>

          <h2>8. Cookies</h2>
          <ul>
            <li><strong>Essential cookies</strong> — required for the website to function</li>
            <li><strong>Analytics cookies</strong> — help us understand usage patterns (anonymised)</li>
            <li><strong>Preference cookies</strong> — remember your settings</li>
          </ul>

          <h2>9. How long we keep your data</h2>
          <ul>
            <li>Account and comparison data — up to 3 years from your last interaction</li>
            <li>Marketing preferences — until you withdraw consent</li>
            <li>Legal and compliance records — up to 7 years as required by law</li>
          </ul>

          <h2>10. Your rights under UK GDPR</h2>
          <ul>
            <li><strong>Right to access</strong> — request a copy of the data we hold</li>
            <li><strong>Right to rectification</strong> — ask us to correct inaccurate data</li>
            <li><strong>Right to erasure</strong> — ask us to delete your data</li>
            <li><strong>Right to restrict processing</strong> — limit how we use your data</li>
            <li><strong>Right to data portability</strong> — receive your data in a portable format</li>
            <li><strong>Right to object</strong> — object to processing for certain purposes</li>
            <li><strong>Right to withdraw consent</strong> — withdraw marketing consent at any time</li>
          </ul>
          <p>Contact us at <a href="mailto:privacy@caldelo.co.uk">privacy@caldelo.co.uk</a>. We will respond within 30 days.</p>

          <h2>11. Data security</h2>
          <p>We use SSL encryption, secure servers, and access controls to protect your data. In the event of a data breach, we will notify the ICO within 72 hours and inform affected users without undue delay.</p>

          <h2>12. Children&apos;s privacy</h2>
          <p>Our service is for adults aged 18 and over. We do not knowingly collect data from children. Contact us if you believe a child has provided us with data and we will delete it promptly.</p>

          <h2>13. Changes to this policy</h2>
          <p>We may update this policy from time to time. We will notify you of significant changes by email or by displaying a notice on our website.</p>

          <h2>14. How to complain</h2>
          <p>If you are unhappy with how we have handled your data, you can contact the ICO:</p>
          <div className={styles.contactBox}>
            <strong>Information Commissioner&apos;s Office (ICO)</strong><br />
            Website: ico.org.uk<br />
            Telephone: 0303 123 1113
          </div>
          <p>We would appreciate the opportunity to resolve your concerns directly first — please email <a href="mailto:privacy@caldelo.co.uk">privacy@caldelo.co.uk</a></p>

          <h2>15. Contact us</h2>
          <div className={styles.contactBox}>
            <strong>Caldelo</strong><br />
            Email: <a href="mailto:privacy@caldelo.co.uk">privacy@caldelo.co.uk</a><br />
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
