import type { Activity, ForecastPoint, Product, SalesPoint, Supplier } from '../types'

export const demoCredentials = {
  email: 'admin@bx7.com',
  password: 'bx7-2026!',
}

export const metrics = [
  { label: 'Ventas del mes', value: 'MX$48,320', delta: '+18.2%' },
  { label: 'Productos activos', value: '1.284', delta: '+43 nuevos' },
  { label: 'Proveedores', value: '86', delta: '12 evaluados' },
  { label: 'Stock crítico', value: '19', delta: 'Revisión urgente' },
]

export const suppliers: Supplier[] = [
  { id: 1, name: 'Fabrilux S.L.', category: 'Accesorios', contact: 'María López', email: 'compras@fabrilux.com', status: 'Activo', score: 96 },
  { id: 2, name: 'North Parts', category: 'Repuestos', contact: 'Ivan Ruiz', email: 'ivan@northparts.es', status: 'Activo', score: 91 },
  { id: 3, name: 'TrendPack', category: 'Packaging', contact: 'Lucía Pérez', email: 'lucia@trendpack.com', status: 'En revisión', score: 77 },
  { id: 4, name: 'Atlas Distribución', category: 'Logística', contact: 'Carlos Méndez', email: 'carlos@atlasdist.com', status: 'Crítico', score: 52 },
]

export const products: Product[] = [
  { id: 1, name: 'Correa Pro Grip', sku: 'SP-1001', category: 'Bolsos', stock: 148, minStock: 60, price: 14.9, image: '', trend: 'Subiendo' },
  { id: 2, name: 'Organizador Compact', sku: 'SP-1042', category: 'Interior', stock: 36, minStock: 50, price: 18.5, image: '', trend: 'Bajando' },
  { id: 3, name: 'Set Travel Plus', sku: 'SP-1077', category: 'Viaje', stock: 210, minStock: 80, price: 32.0, image: '', trend: 'Estable' },
  { id: 4, name: 'Hebilla Smart Lock', sku: 'SP-1112', category: 'Herrajes', stock: 19, minStock: 40, price: 6.8, image: '', trend: 'Bajando' },
  { id: 5, name: 'Kit Premium Pack', sku: 'SP-1188', category: 'Premium', stock: 64, minStock: 50, price: 44.9, image: '', trend: 'Subiendo' },
]

export const salesData: SalesPoint[] = [
  { month: 'Ene', ingresos: 28000, pedidos: 132 },
  { month: 'Feb', ingresos: 31000, pedidos: 141 },
  { month: 'Mar', ingresos: 35200, pedidos: 164 },
  { month: 'Abr', ingresos: 40200, pedidos: 182 },
  { month: 'May', ingresos: 46300, pedidos: 215 },
  { month: 'Jun', ingresos: 48320, pedidos: 228 },
]

export const forecastData: ForecastPoint[] = [
  { month: 'Jul', demanda: 520, stock: 620 },
  { month: 'Ago', demanda: 610, stock: 575 },
  { month: 'Sep', demanda: 680, stock: 540 },
  { month: 'Oct', demanda: 730, stock: 490 },
]

export const activities: Activity[] = [
  { title: 'Pedido confirmado', detail: 'Atlas Distribución aprobó el reposición urgente de herrajes.', time: 'Hace 12 min' },
  { title: 'Predicción actualizada', detail: 'El modelo detectó subida de demanda en la línea Premium.', time: 'Hace 1 h' },
  { title: 'Nuevo proveedor', detail: 'Se incorporó TrendPack al flujo de validación.', time: 'Hace 3 h' },
]