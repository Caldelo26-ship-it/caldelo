'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Step1HouseholdName from './steps/step-1-household'
import Step2Partner from './steps/step-2-partner'
import Step3Children from './steps/step-3-children'
import Step4Region from './steps/step-4-region'
import Step5Events from './steps/step-5-events'
import Step6Ownership from './steps/step-6-ownership'
import Step7Done from './steps/step-7-done'

export type OnboardingData = {
  householdId: string | null
  householdName: string
  partnerFirstName: string
  partnerSkipped: boolean
  children: string[]
  region: string
  selectedEvents: string[]
  ownership: Record<string, 'partner1' | 'partner2' | 'shared'>
}

export type StepProps = {
  data: OnboardingData
  onNext: (partial?: Partial<OnboardingData>) => void
  onBack: () => void
}

const TOTAL_STEPS = 7

const initialData: OnboardingData = {
  householdId: null,
  householdName: '',
  partnerFirstName: '',
  partnerSkipped: false,
  children: [],
  region: '',
  selectedEvents: [],
  ownership: {},
}

function Wordmark() {
  return (
    <div className="flex items-center gap-2.5 mb-8">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-caldelo-green">
        <path d="M12 22V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 11C12 6 16 2 21 2C21 7 17 11 12 11Z" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M12 11C12 6 8 2 3 2C3 7 7 11 12 11Z" fill="currentColor" fillOpacity="0.55" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
      <span className="font-display font-bold text-xl text-caldelo-ink tracking-tight">Caldelo</span>
    </div>
  )
}

function ProgressDots({ current }: { current: number }) {
  return (
    <div
      className="flex items-center gap-2 mb-8"
      role="status"
      aria-label={`Step ${current} of ${TOTAL_STEPS}`}
    >
      {Array.from({ length: TOTAL_STEPS }, (_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            i + 1 <= current ? 'bg-caldelo-green' : 'bg-caldelo-muted'
          }`}
        />
      ))}
    </div>
  )
}


export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(initialData)

  function onNext(partialData: Partial<OnboardingData> = {}) {
    setOnboardingData(prev => ({ ...prev, ...partialData }))
    setDirection('forward')
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1)
    } else {
      router.push('/today')
    }
  }

  function onBack() {
    setDirection('back')
    setStep(s => Math.max(1, s - 1))
  }

  const animationClass =
    direction === 'forward' ? 'step-animate-forward' : 'step-animate-back'

  function renderStep() {
    switch (step) {
      case 1:
        return <Step1HouseholdName data={onboardingData} onNext={onNext} onBack={onBack} />
      case 2:
        return <Step2Partner data={onboardingData} onNext={onNext} onBack={onBack} />
      case 3:
        return <Step3Children data={onboardingData} onNext={onNext} onBack={onBack} />
      case 4:
        return <Step4Region data={onboardingData} onNext={onNext} onBack={onBack} />
      case 5:
        return <Step5Events data={onboardingData} onNext={onNext} onBack={onBack} />
      case 6:
        return <Step6Ownership data={onboardingData} onNext={onNext} onBack={onBack} />
      case 7:
        return <Step7Done data={onboardingData} onNext={onNext} onBack={onBack} />
      default:
        return null
    }
  }

  return (
    <div className="max-w-[480px] w-full flex flex-col items-center">
      <Wordmark />
      <ProgressDots current={step} />

      <div
        key={step}
        className={`${animationClass} w-full`}
      >
        {renderStep()}
      </div>
    </div>
  )
}
