import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Briefcase,
  Building2,
  ChevronDown,
  Download,
  FileText,
  Globe,
  Megaphone,
  Package,
  Rocket,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  Users,
  Zap,
} from 'lucide-react'
import { businessUnits, quickAccessLinks, resumenSubNavItems } from '../../data/resumenData'
import { DistributedBrandsList } from './DistributedBrandsList'
import { OwnBrandsList } from './OwnBrandsLogos'

const quickAccessIcons = [Boxes, FileText, Users, ShoppingCart, Package, BarChart3] as const

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
              <Building2 size={16} />
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
              <Star size={16} className="resumen-mega__head-star" strokeWidth={2} />
              <span>MARCAS PROPIAS</span>
            </div>
            <OwnBrandsList />
            <button type="button" className="resumen-mega__link">
              Gestionar marcas propias <ArrowRight size={14} />
            </button>
          </div>

          <div className="resumen-mega__col resumen-mega__col--distributed">
            <div className="resumen-mega__head">
              <Truck size={16} className="resumen-mega__head-truck" strokeWidth={2} />
              <span>MARCAS DISTRIBUIDAS</span>
            </div>
            <DistributedBrandsList />
            <button type="button" className="resumen-mega__link">
              Ver todas las marcas <ArrowRight size={14} />
            </button>
          </div>

          <div className="resumen-mega__col">
            <div className="resumen-mega__head">
              <Briefcase size={16} />
              <span>UNIDADES DE NEGOCIO</span>
            </div>
            <ul className="resumen-mega__units">
              {businessUnits.map((unit) => {
                const Icon =
                  unit.icon === 'globe' ? Globe : unit.icon === 'rocket' ? Rocket : unit.icon === 'import' ? Download : Megaphone
                return (
                  <li key={unit.label}>
                    <Icon size={15} />
                    {unit.label}
                  </li>
                )
              })}
            </ul>
            <button type="button" className="resumen-mega__link">
              Ver estructura completa <ArrowRight size={14} />
            </button>
          </div>

          <div className="resumen-mega__col">
            <div className="resumen-mega__head">
              <Zap size={16} />
              <span>ACCESOS RÁPIDOS</span>
            </div>
            <ul className="resumen-mega__quick">
              {quickAccessLinks.map((link, index) => {
                const Icon = quickAccessIcons[index]
                return (
                  <li key={link}>
                    <Icon size={15} />
                    {link}
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
