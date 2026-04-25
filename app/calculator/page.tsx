import styles from './calculator.module.css'
import CalculatorClient from './CalculatorClient'

export default function Calculator() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>Cal<span>delo</span></a>
        <a href="/" className={styles.back}>← Back to home</a>
      </nav>
      <CalculatorClient />
    </main>
  )
}
