type Bx7BrandProps = {
  subtitle?: string
  showText?: boolean
  compact?: boolean
  className?: string
}

export function Bx7Brand({ subtitle = 'Sistema operativo de marca', showText = true, compact = false, className = '' }: Bx7BrandProps) {
  return (
    <div className={`bx7-brand ${compact ? 'bx7-brand--compact' : ''} ${className}`.trim()}>
      <div className="bx7-brand__mark" aria-hidden="true">
        <svg viewBox="0 0 520 260" role="presentation" focusable="false">
          <defs>
            <linearGradient id="bx7RibbonRed" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff2a1a" />
              <stop offset="100%" stopColor="#ff7a00" />
            </linearGradient>
            <linearGradient id="bx7RibbonOrange" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff7a00" />
              <stop offset="100%" stopColor="#ffba00" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="520" height="260" rx="28" fill="#050505" />
          <path d="M118 68h64L115 118H51l67-50Z" fill="url(#bx7RibbonRed)" />
          <path d="M181 68h54l-67 50h-54l67-50Z" fill="url(#bx7RibbonOrange)" />
          <path d="M243 68h54l-67 50h-54l67-50Z" fill="#ffba00" />
          <g transform="translate(30 120) skewX(-13)">
            <text x="0" y="90" fill="#ffffff" fontFamily="Arial Black, Arial, sans-serif" fontSize="138" letterSpacing="-12">
              BX7
            </text>
          </g>
        </svg>
      </div>

      {showText ? (
        <div className="bx7-brand__text">
          <strong>BX7</strong>
          <span>{subtitle}</span>
        </div>
      ) : null}
    </div>
  )
}
