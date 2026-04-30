import { PhoneShell } from './phone-shell'

interface FeatureBlockProps {
  label: string
  description: string
  accentClass: string
  icon: React.ReactNode
  phone: React.ReactNode
  reverse?: boolean
}

export function FeatureBlock({
  label,
  description,
  accentClass,
  icon,
  phone,
  reverse = false,
}: FeatureBlockProps) {
  return (
    <div
      className={`flex flex-col gap-8 md:items-center ${
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-5 ${accentClass}`}>
          {icon}
        </div>
        <h3 className="font-display text-2xl font-bold text-caldelo-ink mb-2">{label}</h3>
        <p className="text-caldelo-secondary text-base leading-relaxed">{description}</p>
      </div>

      <div className="flex justify-center flex-shrink-0">
        <PhoneShell className="w-[180px]">
          {phone}
        </PhoneShell>
      </div>
    </div>
  )
}
