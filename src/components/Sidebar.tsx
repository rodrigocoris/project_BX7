import { Headphones, X } from 'lucide-react'
import { mainNavigation } from '../data/mainNavigation'
import type { DashboardView } from '../types/dashboard'
import { Bx7Brand } from './Bx7Brand'

type SidebarProps = {
  activeView: DashboardView
  isOpen: boolean
  onNavigate: (view: DashboardView) => void
  onClose: () => void
}

export function Sidebar({ activeView, isOpen, onNavigate, onClose }: SidebarProps) {
  return (
    <aside id="app-sidebar" className={`sidebar${isOpen ? ' sidebar--open' : ''}`} aria-hidden={!isOpen}>
      <div className="sidebar-brand">
        <button
          type="button"
          className="sidebar-brand__home"
          onClick={() => onNavigate('resumen')}
          aria-label="Ir a inicio"
        >
          <Bx7Brand showText={false} compact className="sidebar-banner" />
        </button>
        <button
          type="button"
          className="sidebar__close"
          onClick={onClose}
          aria-label="Cerrar menú lateral"
        >
          <X size={20} strokeWidth={2.25} />
        </button>
      </div>

      <nav className="sidebar-nav" aria-label="Menú principal">
        {mainNavigation.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.view

          return (
            <button
              key={item.view}
              type="button"
              className={`sidebar-link${isActive ? ' sidebar-link--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onNavigate(item.view)}
            >
              <Icon size={18} strokeWidth={isActive ? 2.25 : 2} />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <button
          type="button"
          className={`sidebar-support${activeView === 'soporte' ? ' sidebar-support--active' : ''}`}
          onClick={() => onNavigate('soporte')}
        >
          <span className="sidebar-support__icon" aria-hidden="true">
            <Headphones size={20} />
          </span>
          <span className="sidebar-support__copy">
            <strong>¿Necesitas ayuda?</strong>
            <span>Centro de soporte</span>
          </span>
        </button>
      </div>
    </aside>
  )
}
