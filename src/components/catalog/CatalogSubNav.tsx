import { ChevronDown, Sparkles } from 'lucide-react'
import { catalogSubNavItems } from '../../data/catalogData'

type CatalogSubNavProps = {
  onNavigate?: (section: string) => void
}

export function CatalogSubNav({ onNavigate }: CatalogSubNavProps) {
  const activeItem = 'Catálogo'

  return (
    <div className="catalog-subnav-wrap">
      <div className="catalog-subnav" role="tablist" aria-label="Navegación de catálogo">
        {catalogSubNavItems.map((item) => (
          <button
            key={item}
            type="button"
            className={`catalog-subnav__item${activeItem === item ? ' catalog-subnav__item--active' : ''}`}
            onClick={() => onNavigate?.(item)}
          >
            {item === 'IA BX7' ? <Sparkles size={14} className="catalog-subnav__sparkle" /> : null}
            {item}
            <ChevronDown size={14} className="catalog-subnav__chevron" />
          </button>
        ))}
      </div>
    </div>
  )
}
