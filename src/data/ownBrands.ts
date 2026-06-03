/** Logos locales en /public/brands; opcionalmente se intenta URL externa con fallback al SVG. */
export const ownBrands = [
  {
    id: 'bx7-wheels',
    name: 'BX7 Wheels',
    description: 'Rines de alto rendimiento',
    logoSrc: '/brands/bx7-wheels-logo.svg',
    logoAlt: 'Logo BX7 Wheels',
  },
  {
    id: 'teix',
    name: 'TEIX',
    description: 'Espaciadores y accesorios',
    logoSrc: '/brands/teix-logo.svg',
    logoAlt: 'Logo TEIX Off Road',
  },
  {
    id: 'futuras',
    name: 'Futuras Marcas',
    description: 'Próximos lanzamientos',
    isPlaceholder: true,
  },
] as const
