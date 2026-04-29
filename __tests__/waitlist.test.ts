import { describe, it, expect } from 'vitest'
import { isValidEmail } from '../lib/waitlist'

describe('isValidEmail', () => {
  it('accepts a standard email address', () => {
    expect(isValidEmail('user@example.com')).toBe(true)
  })

  it('accepts email with subdomain', () => {
    expect(isValidEmail('user@mail.example.co.uk')).toBe(true)
  })

  it('rejects email with no @ symbol', () => {
    expect(isValidEmail('notanemail')).toBe(false)
  })

  it('rejects email with no domain after @', () => {
    expect(isValidEmail('user@')).toBe(false)
  })

  it('rejects email with no local part', () => {
    expect(isValidEmail('@example.com')).toBe(false)
  })

  it('rejects an empty string', () => {
    expect(isValidEmail('')).toBe(false)
  })

  it('rejects a whitespace-only string', () => {
    expect(isValidEmail('   ')).toBe(false)
  })
})
