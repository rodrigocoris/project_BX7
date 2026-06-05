import { useId } from 'react'
import { BX7_LOGO_SRC } from '../../constants/brandAssets'

/** Logos vectoriales compartidos (Marcas distribuidas y Marcas principales). */

export function FoxMark() {
  return (
    <span className="distributed-brand-logo distributed-brand-logo--fox" aria-hidden="true">
      <svg viewBox="0 0 40 40" role="presentation" focusable="false">
        <rect width="40" height="40" rx="8" fill="#141414" />
        <text x="6" y="26" fill="#ffffff" fontFamily="Arial Black, Impact, sans-serif" fontSize="14" fontWeight="900" letterSpacing="0.02em">
          FOX
        </text>
        <path
          d="M28 10c3 2 5 5 5 8-1-2-3-4-6-5-2 1-4 3-4 5 0-3 2-6 5-8Z"
          fill="#ff4d43"
          opacity="0.95"
        />
      </svg>
    </span>
  )
}

export function DobinsonsMark() {
  const gradientId = useId()

  return (
    <span className="distributed-brand-logo distributed-brand-logo--dobinsons" aria-hidden="true">
      <svg viewBox="0 0 40 40" role="presentation" focusable="false">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="8" fill="#141414" />
        <text
          x="4"
          y="24"
          fill={`url(#${gradientId})`}
          fontFamily="Arial, sans-serif"
          fontSize="7.5"
          fontWeight="800"
          letterSpacing="0.02em"
        >
          Dobinsons
        </text>
      </svg>
    </span>
  )
}

export function KcHilitesMark() {
  return (
    <span className="distributed-brand-logo distributed-brand-logo--kc" aria-hidden="true">
      <svg viewBox="0 0 40 40" role="presentation" focusable="false">
        <rect width="40" height="40" rx="8" fill="#141414" />
        <circle cx="20" cy="20" r="14" fill="#facc15" />
        <text x="20" y="25" textAnchor="middle" fill="#000000" fontFamily="Arial Black, sans-serif" fontSize="12" fontWeight="900">
          KC
        </text>
      </svg>
    </span>
  )
}

export function EibachMark() {
  return (
    <span className="distributed-brand-logo distributed-brand-logo--eibach" aria-hidden="true">
      <svg viewBox="0 0 40 40" role="presentation" focusable="false">
        <rect width="40" height="40" rx="8" fill="#141414" />
        <rect x="4" y="12" width="32" height="16" rx="2" fill="#e30613" />
        <text x="20" y="24" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="800" fontStyle="italic">
          Eibach
        </text>
      </svg>
    </span>
  )
}

export function MethodMark() {
  return (
    <span className="distributed-brand-logo distributed-brand-logo--method" aria-hidden="true">
      <svg viewBox="0 0 40 40" role="presentation" focusable="false">
        <rect width="40" height="40" rx="8" fill="#141414" />
        <text x="20" y="15" textAnchor="middle" fill="#ffffff" fontFamily="Arial Black, sans-serif" fontSize="5.5" fontWeight="900" letterSpacing="0.08em">
          METHOD
        </text>
        <text x="20" y="22" textAnchor="middle" fill="#ffffff" fontFamily="Arial Black, sans-serif" fontSize="4" fontWeight="800" letterSpacing="0.06em">
          RACE
        </text>
        <text x="20" y="28" textAnchor="middle" fill="#ffffff" fontFamily="Arial Black, sans-serif" fontSize="4" fontWeight="800" letterSpacing="0.06em">
          WHEELS
        </text>
      </svg>
    </span>
  )
}

export function VossenMark() {
  return (
    <span className="distributed-brand-logo distributed-brand-logo--vossen" aria-hidden="true">
      <svg viewBox="0 0 40 40" role="presentation" focusable="false">
        <rect width="40" height="40" rx="8" fill="#141414" />
        <text
          x="20"
          y="24"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="Arial, sans-serif"
          fontSize="8"
          fontWeight="300"
          letterSpacing="0.28em"
        >
          VOSSEN
        </text>
      </svg>
    </span>
  )
}

export function Bx7WheelsMark() {
  return (
    <span className="distributed-brand-logo distributed-brand-logo--bx7" aria-hidden="true">
      <img src={BX7_LOGO_SRC} alt="" />
    </span>
  )
}

export const brandMarks = {
  fox: FoxMark,
  dobinsons: DobinsonsMark,
  'kc-hilites': KcHilitesMark,
  eibach: EibachMark,
  method: MethodMark,
  vossen: VossenMark,
  'bx7-wheels': Bx7WheelsMark,
} as const

export type BrandMarkId = keyof typeof brandMarks

export function BrandMark({ id }: { id: BrandMarkId }) {
  const Mark = brandMarks[id]
  return <Mark />
}
