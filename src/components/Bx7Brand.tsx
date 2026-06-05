import { BX7_LOGO_SRC } from '../constants/brandAssets'

type Bx7BrandProps = {
  subtitle?: string
  showText?: boolean
  compact?: boolean
  className?: string
}

export function Bx7Brand({ subtitle = 'Sistema operativo de marca', showText = true, compact = false, className = '' }: Bx7BrandProps) {
  return (
    <div className={`bx7-brand ${compact ? 'bx7-brand--compact' : ''} ${className}`.trim()}>
      <div className="bx7-brand__mark">
        <img src={BX7_LOGO_SRC} alt="BX7" />
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
