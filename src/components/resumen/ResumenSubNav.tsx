import { ChevronDown, Sparkles } from 'lucide-react'
import { mainNavigation } from '../../data/mainNavigation'
import type { DashboardView } from '../../types/dashboard'
import '../../styles/resumen.css'

type ResumenSubNavProps = {
  activeView: DashboardView
  onNavigate: (view: DashboardView) => void
}

export function ResumenSubNav({ activeView, onNavigate }: ResumenSubNavProps) {
  return (
    <div className="resumen-subnav-wrap">
      <div className="resumen-subnav" role="tablist" aria-label="Navegación principal">
        {mainNavigation.map((item) => {
          const isActive = activeView === item.view

          return (
            <button
              key={item.view}
              type="button"
              className={`resumen-subnav__item${isActive ? ' resumen-subnav__item--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onNavigate(item.view)}
            >
              {item.view === 'predicciones' ? <Sparkles size={14} className="resumen-subnav__sparkle" /> : null}
              {item.label}
              <ChevronDown size={14} className="resumen-subnav__chevron" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
