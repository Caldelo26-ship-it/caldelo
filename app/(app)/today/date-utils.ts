/**
 * Formats a Date as "Tuesday, 30 April" — day name, comma, day number, month name.
 * Uses en-GB locale so month/day names are English.
 */
export function formatDateString(date: Date): string {
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' })
  const day = date.getDate()
  const month = date.toLocaleDateString('en-GB', { month: 'long' })
  return `${weekday}, ${day} ${month}`
}
