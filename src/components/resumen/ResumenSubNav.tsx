import { useState, useEffect, useRef } from 'react'
import {
  ChevronDown,
  Sparkles,
  Building2,
  Star,
  Globe,
  Rocket,
  Import,
  Megaphone,
  BookOpen,
  Tag,
  Users,
  ClipboardList,
  Package,
  BarChart3,
  CircleDot,
  Circle,
  Layers,
  Lightbulb,
  Wrench,
} from 'lucide-react'
import { mainNavigation } from '../../data/mainNavigation'
import { distributedBrands } from '../../data/distributedBrands'
import { businessUnits, quickAccessLinks } from '../../data/resumenData'
import { BrandMark } from './DistributedBrandMarks'
import { Bx7WheelsMark, TeixMark, FuturasMarcasMark } from './OwnBrandMarks'
import type { DashboardView } from '../../types/dashboard'
import '../../styles/resumen.css'

type ResumenSubNavProps = {
  activeView: DashboardView
  onNavigate: (view: DashboardView, category?: string) => void
}

const businessUnitIcons = {
  globe: Globe,
  rocket: Rocket,
  import: Import,
  megaphone: Megaphone,
} as const

const quickAccessIcons = {
  catalog: BookOpen,
  prices: Tag,
  clients: Users,
  orders: ClipboardList,
  inventory: Package,
  reports: BarChart3,
} as const

export function ResumenSubNav({ activeView, onNavigate }: ResumenSubNavProps) {
  const [empresasOpen, setEmpresasOpen] = useState(false)
  const [catalogoOpen, setCatalogoOpen] = useState(false)
  
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const catalogButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!empresasOpen && !catalogoOpen) return

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      const clickedInsideDropdown = dropdownRef.current?.contains(target)
      const clickedEmpresasBtn = buttonRef.current?.contains(target)
      const clickedCatalogoBtn = catalogButtonRef.current?.contains(target)

      if (!clickedInsideDropdown && !clickedEmpresasBtn && !clickedCatalogoBtn) {
        setEmpresasOpen(false)
        setCatalogoOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [empresasOpen, catalogoOpen])

  return (
    <div className="resumen-subnav-wrap">
      <div className="resumen-subnav" role="tablist" aria-label="Navegación principal">
        {mainNavigation
          .filter((item) => item.view !== 'resumen' && item.view !== 'configuracion')
          .map((item) => {
            const isActive = activeView === item.view || 
              (item.view === 'empresas' && empresasOpen) ||
              (item.view === 'catalogo' && catalogoOpen)

            return (
              <button
                key={item.view}
                ref={
                  item.view === 'empresas'
                    ? buttonRef
                    : item.view === 'catalogo'
                    ? catalogButtonRef
                    : undefined
                }
                type="button"
                className={`resumen-subnav__item${isActive ? ' resumen-subnav__item--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={(event) => {
                  if (item.view === 'empresas') {
                    event.stopPropagation()
                    setCatalogoOpen(false)
                    setEmpresasOpen((prev) => !prev)
                  } else if (item.view === 'catalogo') {
                    event.stopPropagation()
                    setEmpresasOpen(false)
                    setCatalogoOpen((prev) => !prev)
                  } else {
                    setEmpresasOpen(false)
                    setCatalogoOpen(false)
                    onNavigate(item.view)
                  }
                }}
              >
                {item.view === 'predicciones' ? <Sparkles size={14} className="resumen-subnav__sparkle" /> : null}
                {item.label}
                <ChevronDown size={14} className="resumen-subnav__chevron" />
              </button>
            )
          })}
      </div>

      {empresasOpen && (
        <div className="resumen-mega" ref={dropdownRef}>
          {/* Column 1: GRUPO EMPRESARIAL */}
          <div className="resumen-mega__col">
            <div className="resumen-mega__head">
              <Building2 size={14} className="resumen-mega__head-icon" />
              GRUPO EMPRESARIAL
            </div>
            <div style={{ marginTop: '8px', display: 'grid', gap: '4px' }}>
              <h4 className="resumen-mega__title">BX7 Group</h4>
              <p className="resumen-mega__desc">Información corporativa</p>
            </div>
            <button
              type="button"
              className="resumen-mega__link"
              onClick={() => {
                setEmpresasOpen(false)
                onNavigate('empresas')
              }}
            >
              Ver dashboard &rarr;
            </button>
          </div>

          {/* Column 2: MARCAS PROPIAS */}
          <div className="resumen-mega__col resumen-mega__col--own-brands">
            <div className="resumen-mega__head">
              <Star size={14} className="resumen-mega__head-icon" />
              MARCAS PROPIAS
            </div>
            <ul className="own-brands-list" style={{ marginTop: '8px' }}>
              <li className="own-brands-list__item">
                <Bx7WheelsMark />
                <div className="own-brands-list__copy">
                  <strong>BX7 Wheels</strong>
                  <span>Rines de alto rendimiento</span>
                </div>
              </li>
              <li className="own-brands-list__item">
                <TeixMark />
                <div className="own-brands-list__copy">
                  <strong>TEIX</strong>
                  <span>Espaciadores y accesorios</span>
                </div>
              </li>
              <li className="own-brands-list__item">
                <FuturasMarcasMark />
                <div className="own-brands-list__copy">
                  <strong>Futuras Marcas</strong>
                  <span>Próximos lanzamientos</span>
                </div>
              </li>
            </ul>
            <button
              type="button"
              className="resumen-mega__link"
              onClick={() => {
                setEmpresasOpen(false)
                onNavigate('marcas')
              }}
            >
              Gestionar marcas propias &rarr;
            </button>
          </div>

          {/* Column 3: MARCAS DISTRIBUIDAS */}
          <div className="resumen-mega__col resumen-mega__col--distributed">
            <div className="resumen-mega__head">
              <Building2 size={14} className="resumen-mega__head-icon" />
              MARCAS DISTRIBUIDAS
            </div>
            <ul className="distributed-brands-list" style={{ marginTop: '8px' }}>
              {distributedBrands.map((brand) => (
                <li key={brand.id} className="distributed-brands-list__item">
                  <BrandMark id={brand.id} />
                  <span className="distributed-brands-list__name">{brand.name}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="resumen-mega__link"
              onClick={() => {
                setEmpresasOpen(false)
                onNavigate('marcas')
              }}
            >
              Ver todas las marcas &rarr;
            </button>
          </div>

          {/* Column 4: UNIDADES DE NEGOCIO */}
          <div className="resumen-mega__col">
            <div className="resumen-mega__head">
              <Building2 size={14} className="resumen-mega__head-icon" />
              UNIDADES DE NEGOCIO
            </div>
            <ul className="resumen-mega__units" style={{ marginTop: '8px' }}>
              {businessUnits.map((unit) => {
                const Icon = businessUnitIcons[unit.icon]
                return (
                  <li key={unit.label}>
                    <Icon size={16} className="resumen-mega__row-icon" />
                    <div className="resumen-mega__row-copy">
                      <strong>{unit.label}</strong>
                      <span>{unit.description}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
            <button
              type="button"
              className="resumen-mega__link"
              onClick={() => {
                setEmpresasOpen(false)
                onNavigate('empresas')
              }}
            >
              Ver estructura completa &rarr;
            </button>
          </div>

          {/* Column 5: ACCESOS RÁPIDOS */}
          <div className="resumen-mega__col">
            <div className="resumen-mega__head">
              <Rocket size={14} className="resumen-mega__head-icon" />
              ACCESOS RÁPIDOS
            </div>
            <ul className="resumen-mega__quick" style={{ marginTop: '8px' }}>
              {quickAccessLinks.map((link) => {
                const Icon = quickAccessIcons[link.icon]

                let destination: DashboardView = 'resumen'
                if (link.label === 'Catálogo de productos') destination = 'catalogo'
                else if (link.label === 'Lista de precios') destination = 'catalogo'
                else if (link.label === 'Clientes mayoristas') destination = 'clientes'
                else if (link.label === 'Órdenes de compra') destination = 'ventas'
                else if (link.label === 'Inventario general') destination = 'inventario'
                else if (link.label === 'Reportes ejecutivos') destination = 'reportes'

                return (
                  <li key={link.label}>
                    <button
                      type="button"
                      style={{
                        background: 'none',
                        border: 0,
                        padding: 0,
                        margin: 0,
                        color: 'inherit',
                        font: 'inherit',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        width: '100%',
                      }}
                      onClick={() => {
                        setEmpresasOpen(false)
                        onNavigate(destination)
                      }}
                    >
                      <Icon size={16} className="resumen-mega__row-icon" />
                      <span className="resumen-mega__row-label">{link.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <button
              type="button"
              className="resumen-mega__link"
              onClick={() => {
                setEmpresasOpen(false)
                onNavigate('resumen')
              }}
            >
              Ver todos los accesos &rarr;
            </button>
          </div>
        </div>
      )}

      {catalogoOpen && (
        <div className="resumen-mega" ref={dropdownRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {/* Column 1: Performance */}
          <div className="resumen-mega__col">
            <div className="resumen-mega__head">
              <CircleDot size={14} className="resumen-mega__head-icon" />
              DESEMPEÑO Y RINES
            </div>
            <ul className="resumen-mega__units" style={{ marginTop: '8px', display: 'grid', gap: '8px' }}>
              <li>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 0,
                    padding: 0,
                    margin: 0,
                    color: 'inherit',
                    font: 'inherit',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                  }}
                  onClick={() => {
                    setCatalogoOpen(false)
                    onNavigate('catalogo', 'Rines')
                  }}
                >
                  <CircleDot size={16} className="resumen-mega__row-icon" />
                  <div className="resumen-mega__row-copy">
                    <strong>Rines</strong>
                    <span>Rines de alto rendimiento</span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 0,
                    padding: 0,
                    margin: 0,
                    color: 'inherit',
                    font: 'inherit',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                  }}
                  onClick={() => {
                    setCatalogoOpen(false)
                    onNavigate('catalogo', 'Suspensión')
                  }}
                >
                  <Layers size={16} className="resumen-mega__row-icon" />
                  <div className="resumen-mega__row-copy">
                    <strong>Suspensión</strong>
                    <span>Sistemas y amortiguación</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Lighting & Spacers */}
          <div className="resumen-mega__col">
            <div className="resumen-mega__head">
              <Lightbulb size={14} className="resumen-mega__head-icon" />
              ILUMINACIÓN Y SEPARADORES
            </div>
            <ul className="resumen-mega__units" style={{ marginTop: '8px', display: 'grid', gap: '8px' }}>
              <li>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 0,
                    padding: 0,
                    margin: 0,
                    color: 'inherit',
                    font: 'inherit',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                  }}
                  onClick={() => {
                    setCatalogoOpen(false)
                    onNavigate('catalogo', 'Iluminación')
                  }}
                >
                  <Lightbulb size={16} className="resumen-mega__row-icon" />
                  <div className="resumen-mega__row-copy">
                    <strong>Iluminación</strong>
                    <span>Luces y sistemas LED</span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 0,
                    padding: 0,
                    margin: 0,
                    color: 'inherit',
                    font: 'inherit',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                  }}
                  onClick={() => {
                    setCatalogoOpen(false)
                    onNavigate('catalogo', 'Espaciadores')
                  }}
                >
                  <Circle size={16} className="resumen-mega__row-icon" />
                  <div className="resumen-mega__row-copy">
                    <strong>Espaciadores</strong>
                    <span>Separadores de rueda</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Accessories & Tools */}
          <div className="resumen-mega__col">
            <div className="resumen-mega__head">
              <Package size={14} className="resumen-mega__head-icon" />
              ACCESORIOS Y HERRAMIENTAS
            </div>
            <ul className="resumen-mega__units" style={{ marginTop: '8px', display: 'grid', gap: '8px' }}>
              <li>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 0,
                    padding: 0,
                    margin: 0,
                    color: 'inherit',
                    font: 'inherit',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                  }}
                  onClick={() => {
                    setCatalogoOpen(false)
                    onNavigate('catalogo', 'Accesorios')
                  }}
                >
                  <Package size={16} className="resumen-mega__row-icon" />
                  <div className="resumen-mega__row-copy">
                    <strong>Accesorios</strong>
                    <span>Accesorios y adicionales</span>
                  </div>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 0,
                    padding: 0,
                    margin: 0,
                    color: 'inherit',
                    font: 'inherit',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                  }}
                  onClick={() => {
                    setCatalogoOpen(false)
                    onNavigate('catalogo', 'Herramientas')
                  }}
                >
                  <Wrench size={16} className="resumen-mega__row-icon" />
                  <div className="resumen-mega__row-copy">
                    <strong>Herramientas</strong>
                    <span>Herramientas especializadas</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Full Catalog */}
          <div className="resumen-mega__col">
            <div className="resumen-mega__head">
              <BookOpen size={14} className="resumen-mega__head-icon" />
              CATÁLOGO COMPLETO
            </div>
            <div style={{ marginTop: '8px', display: 'grid', gap: '4px' }}>
              <h4 className="resumen-mega__title">Explorar Todo</h4>
              <p className="resumen-mega__desc">Ver todas las categorías y marcas del catálogo</p>
            </div>
            <button
              type="button"
              className="resumen-mega__link"
              onClick={() => {
                setCatalogoOpen(false)
                onNavigate('catalogo')
              }}
            >
              Ver catálogo completo &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
