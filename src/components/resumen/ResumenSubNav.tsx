import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  ChevronDown,
  FileBarChart,
  Globe,
  ListFilter,
  Megaphone,
  Rocket,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Upload,
  Users,
  Zap,
} from 'lucide-react'
import { businessUnits, quickAccessLinks, resumenSubNavItems } from '../../data/resumenData'
import { DistributedBrandsList } from './DistributedBrandsList'
import { OwnBrandsList } from './OwnBrandsLogos'

const unitIcons = {
  globe: Globe,
  rocket: Rocket,
  import: Upload,
  megaphone: Megaphone,
} as const

const quickAccessIcons = {
  catalog: BookOpen,
  prices: ListFilter,
  clients: Users,
  orders: ShoppingBag,
  inventory: Briefcase,
  reports: FileBarChart,
} as const

type ResumenSubNavProps = {
  onNavigate?: (section: string) => void
}

export function ResumenSubNav({ onNavigate }: ResumenSubNavProps) {
  const [activeItem, setActiveItem] = useState('Empresas')
  const [empresasOpen, setEmpresasOpen] = useState(true)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!empresasOpen) return

    function handlePointerDown(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Node)) return
      if (wrapRef.current?.contains(target)) return
      setEmpresasOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [empresasOpen])

  function handleNavClick(item: string) {
    setActiveItem(item)
    if (item === 'Empresas') {
      setEmpresasOpen((current) => !current)
      return
    }
    setEmpresasOpen(false)
    onNavigate?.(item)
  }

  return (
    <div className="resumen-subnav-wrap" ref={wrapRef}>
      <div className="resumen-subnav" role="tablist" aria-label="Navegación de resumen">
        {resumenSubNavItems.map((item) => (
          <button
            key={item}
            type="button"
            className={`resumen-subnav__item${activeItem === item ? ' resumen-subnav__item--active' : ''}`}
            aria-expanded={item === 'Empresas' ? empresasOpen : undefined}
            onClick={() => handleNavClick(item)}
          >
            {item === 'IA BX7' ? <Sparkles size={14} className="resumen-subnav__sparkle" /> : null}
            {item}
            <ChevronDown size={14} className="resumen-subnav__chevron" />
          </button>
        ))}
      </div>

      {empresasOpen && activeItem === 'Empresas' ? (
        <div className="resumen-mega" role="region" aria-label="Menú Empresas">
          <div className="resumen-mega__col">
            <div className="resumen-mega__head">
              <Building2 size={16} className="resumen-mega__head-icon" strokeWidth={2} />
              <span>GRUPO EMPRESARIAL</span>
            </div>
            <p className="resumen-mega__title">BX7 Group</p>
            <p className="resumen-mega__desc">Información corporativa</p>
            <button type="button" className="resumen-mega__link">
              Ver dashboard <ArrowRight size={14} />
            </button>
          </div>

          <div className="resumen-mega__col resumen-mega__col--own-brands">
            <div className="resumen-mega__head">
              <Star size={16} className="resumen-mega__head-icon" strokeWidth={2} />
              <span>MARCAS PROPIAS</span>
            </div>
            <OwnBrandsList />
            <button type="button" className="resumen-mega__link">
              Gestionar marcas propias <ArrowRight size={14} />
            </button>
          </div>

          <div className="resumen-mega__col resumen-mega__col--distributed">
            <div className="resumen-mega__head">
              <Truck size={16} className="resumen-mega__head-icon" strokeWidth={2} />
              <span>MARCAS DISTRIBUIDAS</span>
            </div>
            <DistributedBrandsList />
            <button type="button" className="resumen-mega__link">
              Ver todas las marcas <ArrowRight size={14} />
            </button>
          </div>

          <div className="resumen-mega__col resumen-mega__col--units">
            <div className="resumen-mega__head">
              <Briefcase size={16} className="resumen-mega__head-icon" strokeWidth={2} />
              <span>UNIDADES DE NEGOCIO</span>
            </div>
            <ul className="resumen-mega__units">
              {businessUnits.map((unit) => {
                const Icon = unitIcons[unit.icon]
                return (
                  <li key={unit.label}>
                    <Icon size={18} strokeWidth={2} className="resumen-mega__row-icon" aria-hidden="true" />
                    <div className="resumen-mega__row-copy">
                      <strong>{unit.label}</strong>
                      <span>{unit.description}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
            <button type="button" className="resumen-mega__link">
              Ver estructura completa <ArrowRight size={14} />
            </button>
          </div>

          <div className="resumen-mega__col resumen-mega__col--quick">
            <div className="resumen-mega__head">
              <Zap size={16} className="resumen-mega__head-icon" strokeWidth={2} />
              <span>ACCESOS RÁPIDOS</span>
            </div>
            <ul className="resumen-mega__quick">
              {quickAccessLinks.map((link) => {
                const Icon = quickAccessIcons[link.icon]
                return (
                  <li key={link.label}>
                    <Icon size={18} strokeWidth={2} className="resumen-mega__row-icon" aria-hidden="true" />
                    <span className="resumen-mega__row-label">{link.label}</span>
                  </li>
                )
              })}
            </ul>
            <button type="button" className="resumen-mega__link">
              Ver todos los accesos <ArrowRight size={14} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
