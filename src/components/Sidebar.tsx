import { BarChart3, Boxes, Building2, LogOut, Sparkles, UserCog } from 'lucide-react'
import type { SessionUser } from '../types'
import { Bx7Brand } from './Bx7Brand'

type SidebarProps = {
  user: SessionUser
  onLogout: () => void
}

const navigation = [
  { label: 'Resumen', href: '#resumen', icon: BarChart3 },
  { label: 'Proveedores', href: '#proveedores', icon: Building2 },
  { label: 'Productos', href: '#productos', icon: Boxes },
  { label: 'Predicciones', href: '#predicciones', icon: Sparkles },
]

export function Sidebar({ user, onLogout }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Bx7Brand showText={false} compact />
        <div className="sidebar-brand-copy">
          <strong>BX7</strong>
          <span>
            <UserCog size={14} />
            ERP admin
          </span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <a key={item.href} href={item.href} className="sidebar-link">
              <Icon size={16} />
              {item.label}
            </a>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <div>
          <strong>{user.name}</strong>
          <span>{user.role}</span>
        </div>
        <button type="button" className="logout-button" onClick={onLogout}>
          <LogOut size={16} />
          Salir
        </button>
      </div>
    </aside>
  )
}