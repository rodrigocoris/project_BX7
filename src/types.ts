export type SessionUser = {
  name: string
  email: string
  role: string
}

export type Supplier = {
  id: number
  name: string
  category: string
  contact: string
  email: string
  status: 'Activo' | 'En revisión' | 'Crítico'
  score: number
}

export type Product = {
  id: number
  name: string
  sku: string
  category: string
  stock: number
  minStock: number
  price: number
  image?: string
  trend: 'Subiendo' | 'Estable' | 'Bajando'
}

export type SalesPoint = {
  month: string
  ingresos: number
  pedidos: number
}

export type ForecastPoint = {
  month: string
  demanda: number
  stock: number
}

export type Activity = {
  title: string
  detail: string
  time: string
}