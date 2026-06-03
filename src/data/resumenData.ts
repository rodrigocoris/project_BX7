export const resumenKpis = [
  {
    id: 'ventas',
    label: 'Ventas del mes',
    value: '$24,850,000',
    delta: '+15.6% vs mes anterior',
    tone: 'green',
    icon: 'dollar',
  },
  {
    id: 'ordenes',
    label: 'Órdenes activas',
    value: '156',
    delta: '+8.2% vs mes anterior',
    tone: 'orange',
    icon: 'orders',
  },
  {
    id: 'stock',
    label: 'Productos en stock',
    value: '2,847',
    delta: '+12.4% vs mes anterior',
    tone: 'blue',
    icon: 'cube',
  },
  {
    id: 'clientes',
    label: 'Clientes activos',
    value: '342',
    delta: '+9.1% vs mes anterior',
    tone: 'purple',
    icon: 'users',
  },
] as const

export const resumenChartData = [
  { day: '01 May', ventas: 12.2, ordenes: 8.4 },
  { day: '05 May', ventas: 14.8, ordenes: 9.1 },
  { day: '10 May', ventas: 16.5, ordenes: 10.2 },
  { day: '15 May', ventas: 18.2, ordenes: 11.5 },
  { day: '20 May', ventas: 21.4, ordenes: 12.8 },
  { day: '25 May', ventas: 24.1, ordenes: 14.2 },
  { day: '31 May', ventas: 26.8, ordenes: 15.6 },
]

export const resumenTopBrands = [
  { id: 'fox' as const, name: 'FOX', revenue: '$8,250,000', growth: '+18.5%', progress: 92 },
  { id: 'bx7-wheels' as const, name: 'BX7 Wheels', revenue: '$6,120,000', growth: '+14.2%', progress: 78 },
  { id: 'dobinsons' as const, name: 'Dobinsons', revenue: '$4,890,000', growth: '+11.8%', progress: 65 },
  { id: 'kc-hilites' as const, name: 'KC Hilites', revenue: '$3,640,000', growth: '+9.4%', progress: 52 },
  { id: 'eibach' as const, name: 'Eibach', revenue: '$2,980,000', growth: '+7.6%', progress: 44 },
] as const

export const resumenActivities = [
  { id: '1', title: 'Nueva orden de compra', detail: 'OC-2026-0847 · Atlas Distribución', time: 'Hace 15 min', tone: 'orange', icon: 'cart' },
  { id: '2', title: 'Producto agregado al inventario', detail: 'Rin Offroad BX7 17" · SKU RIN-EX', time: 'Hace 42 min', tone: 'blue', icon: 'box' },
  { id: '3', title: 'Nueva venta mayorista', detail: 'Cliente Norte Parts · $128,400', time: 'Hace 1 h', tone: 'purple', icon: 'sale' },
  { id: '4', title: 'Alerta de stock bajo', detail: 'Hebilla Smart Lock · 19 uds.', time: 'Hace 2 h', tone: 'red', icon: 'alert' },
  { id: '5', title: 'Reporte generado', detail: 'Reporte ejecutivo · Mayo 2026', time: 'Hace 3 h', tone: 'yellow', icon: 'report' },
] as const

export const quickAccessLinks = [
  { label: 'Catálogo de productos', icon: 'catalog' as const },
  { label: 'Lista de precios', icon: 'prices' as const },
  { label: 'Clientes mayoristas', icon: 'clients' as const },
  { label: 'Órdenes de compra', icon: 'orders' as const },
  { label: 'Inventario general', icon: 'inventory' as const },
  { label: 'Reportes ejecutivos', icon: 'reports' as const },
] as const

export const businessUnits = [
  { label: 'Distribución', description: 'Marcas internacionales', icon: 'globe' as const },
  { label: 'Desarrollo', description: 'Nuevos productos', icon: 'rocket' as const },
  { label: 'Importación', description: 'Gestión de importaciones', icon: 'import' as const },
  { label: 'Marketing', description: 'Marca y estrategia', icon: 'megaphone' as const },
] as const

export const resumenSubNavItems = [
  'Empresas',
  'Catálogo',
  'Marcas',
  'Proveedores',
  'Inventario',
  'Ventas',
  'Reportes',
  'IA BX7',
] as const
