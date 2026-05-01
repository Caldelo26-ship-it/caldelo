'use client'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

type YearPickerProps = {
  isOpen: boolean
  currentYear: number
  currentMonth: number
  onSelect: (year: number, month: number) => void
  onClose: () => void
}

export function YearPicker({ isOpen, currentYear, currentMonth, onSelect, onClose }: YearPickerProps) {
  if (!isOpen) return null

  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i)

  return (
    <div
      className="fixed inset-0 bg-caldelo-white flex flex-col"
      style={{ zIndex: 60 }}
    >
      <div className="flex items-center justify-between px-5 pb-4 border-b border-caldelo-border" style={{ paddingTop: 'max(16px, env(safe-area-inset-top))' }}>
        <h2 className="font-display text-xl font-bold text-caldelo-ink">Go to</h2>
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center text-caldelo-secondary"
          aria-label="Close year picker"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {years.map((year) => (
          <div key={year} className="mb-6">
            <p className="text-sm font-semibold text-caldelo-secondary mb-2">{year}</p>
            <div className="grid grid-cols-4 gap-2">
              {MONTHS.map((label, idx) => {
                const isSelected = year === currentYear && idx === currentMonth
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelect(year, idx)}
                    className={`h-10 rounded-input text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-caldelo-green text-white'
                        : 'text-caldelo-ink hover:bg-caldelo-surface'
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
