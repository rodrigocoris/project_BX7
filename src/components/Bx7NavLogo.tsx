import { BX7_LOGO_SRC } from '../constants/brandAssets'

type Bx7NavLogoProps = {
  onClick?: () => void
}

export function Bx7NavLogo({ onClick }: Bx7NavLogoProps) {
  if (onClick) {
    return (
      <button type="button" className="top-nav__logo top-nav__logo-btn" onClick={onClick} aria-label="Ir a inicio">
        <img src={BX7_LOGO_SRC} alt="BX7" />
      </button>
    )
  }

  return (
    <div className="top-nav__logo">
      <img src={BX7_LOGO_SRC} alt="BX7" />
    </div>
  )
}
