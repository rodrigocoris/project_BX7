import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  BookOpen,
  Building2,
  Factory,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import type { DashboardView } from '../types/dashboard'

export type MainNavItem = {
  label: string
  view: DashboardView
  icon: LucideIcon
}

export const mainNavigation: MainNavItem[] = [
  { label: 'Inicio', view: 'resumen', icon: Home },
  { label: 'Empresas', view: 'empresas', icon: Building2 },
  { label: 'Catálogo', view: 'catalogo', icon: BookOpen },
  { label: 'Marcas', view: 'marcas', icon: Star },
  { label: 'Proveedores', view: 'proveedores', icon: Factory },
  { label: 'Inventario', view: 'inventario', icon: Package },
  { label: 'Ventas', view: 'ventas', icon: ShoppingCart },
  { label: 'Clientes', view: 'clientes', icon: Users },
  { label: 'Predicciones IA', view: 'predicciones', icon: Sparkles },
  { label: 'Reportes', view: 'reportes', icon: BarChart3 },
  { label: 'Configuración', view: 'configuracion', icon: Settings },
]
