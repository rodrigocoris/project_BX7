import {
  BarChart3,
  BookOpen,
  Building2,
  Factory,
  Headphones,
  LayoutGrid,
  Package,
  Settings,
  ShoppingCart,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import type { DashboardView } from '../types/dashboard'
import { Bx7Brand } from './Bx7Brand'

type SidebarProps = {
  activeView: DashboardView
  onNavigate: (view: DashboardView) => void
}

const navigation: { label: string; view: DashboardView; icon: typeof LayoutGrid }[] = [
  { label: 'Resumen', view: 'resumen', icon: LayoutGrid },
  { label: 'Catálogo', view: 'catalogo', icon: BookOpen },
  { label: 'Empresas', view: 'empresas', icon: Building2 },
  { label: 'Marcas', view: 'marcas', icon: Star },
  { label: 'Proveedores', view: 'proveedores', icon: Factory },
  { label: 'Inventario', view: 'inventario', icon: Package },
  { label: 'Ventas', view: 'ventas', icon: ShoppingCart },
  { label: 'Clientes', view: 'clientes', icon: Users },
  { label: 'Predicciones IA', view: 'predicciones', icon: Sparkles },
  { label: 'Reportes', view: 'reportes', icon: BarChart3 },
  { label: 'Configuración', view: 'configuracion', icon: Settings },
]

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Bx7Brand showText={false} compact className="sidebar-banner" />
      </div>

      <nav className="sidebar-nav" aria-label="Menú principal">
        {navigation.map((item) => {
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
