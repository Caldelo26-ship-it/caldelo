import { describe, it, expect } from 'vitest'
import { formatDateString } from '../app/(app)/today/date-utils'

describe('formatDateString', () => {
  it('formats a Wednesday in January with no leading zero', () => {
    // 2026-01-07 is a Wednesday
    expect(formatDateString(new Date('2026-01-07T12:00:00'))).toBe('Wednesday, 7 January')
  })

  it('formats a Tuesday in April', () => {
    // 2026-04-28 is a Tuesday
    expect(formatDateString(new Date('2026-04-28T12:00:00'))).toBe('Tuesday, 28 April')
  })

  it('formats a single-digit day without a leading zero', () => {
    // 2026-03-01 is a Sunday
    expect(formatDateString(new Date('2026-03-01T12:00:00'))).toBe('Sunday, 1 March')
  })
})
