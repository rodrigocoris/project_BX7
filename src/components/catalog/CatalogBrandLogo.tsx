import { BX7_LOGO_SRC } from '../../constants/brandAssets'
import { DobinsonsMark, EibachMark, FoxMark, KcHilitesMark } from '../resumen/DistributedBrandMarks'

type CatalogBrandLogoProps = {
  logoType: 'bx7' | 'teix' | 'fox' | 'dobinsons' | 'kc' | 'eibach'
  name: string
}

export function CatalogBrandLogo({ logoType, name }: CatalogBrandLogoProps) {
  if (logoType === 'bx7') {
    return (
      <span className="catalog-brand-logo">
        <img src={BX7_LOGO_SRC} alt={name} className="catalog-brand-logo__img catalog-brand-logo__img--bx7" />
      </span>
    )
  }

  if (logoType === 'teix') {
    return (
      <span className="catalog-brand-logo">
        <img src="/brands/teix-logo.svg" alt={name} className="catalog-brand-logo__img" />
      </span>
    )
  }

  const mark =
    logoType === 'fox' ? (
      <FoxMark />
    ) : logoType === 'dobinsons' ? (
      <DobinsonsMark />
    ) : logoType === 'kc' ? (
      <KcHilitesMark />
    ) : (
      <EibachMark />
    )

  return <span className="catalog-brand-logo catalog-brand-logo--mark">{mark}</span>
}
