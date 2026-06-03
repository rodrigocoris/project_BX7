export function Bx7NavLogo() {
  return (
    <div className="top-nav__logo" aria-hidden="true">
      <svg viewBox="0 0 108 44" role="presentation" focusable="false">
        <defs>
          <linearGradient id="navRibbonRed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff2a1a" />
            <stop offset="100%" stopColor="#ff7a00" />
          </linearGradient>
          <linearGradient id="navRibbonOrange" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff7a00" />
            <stop offset="100%" stopColor="#ffba00" />
          </linearGradient>
        </defs>
        <path d="M6 3h12L4 14H0l6-11Z" fill="url(#navRibbonRed)" />
        <path d="M20 3h11L9 14H5l15-11Z" fill="url(#navRibbonOrange)" />
        <path d="M33 3h11L22 14H11l22-11Z" fill="#ffba00" />
        <g transform="translate(6 12) skewX(-14)">
          <text
            x="0"
            y="26"
            fill="#ffffff"
            fontFamily="'Arial Black', Arial, sans-serif"
            fontSize="28"
            fontStyle="italic"
            fontWeight="900"
            letterSpacing="-2"
          >
            BX7
          </text>
        </g>
      </svg>
    </div>
  )
}
