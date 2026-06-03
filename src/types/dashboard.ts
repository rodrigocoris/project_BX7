export type DashboardView =
  | 'resumen'
  | 'catalogo'
  | 'inventario'
  | 'empresas'
  | 'marcas'
  | 'proveedores'
  | 'ventas'
  | 'clientes'
  | 'predicciones'
  | 'reportes'
  | 'configuracion'
  | 'soporte'

export function viewFromHash(hash: string): DashboardView | null {
  const id = hash.replace(/^#/, '').toLowerCase()

  const map: Record<string, DashboardView> = {
    resumen: 'resumen',
    catalogo: 'catalogo',
    productos: 'catalogo',
    inventario: 'inventario',
    bx7group: 'empresas',
    empresas: 'empresas',
    'bx7-wheels': 'empresas',
    teix: 'marcas',
    marcas: 'marcas',
    proveedores: 'proveedores',
    ventas: 'ventas',
    clientes: 'clientes',
    informacion: 'clientes',
    predicciones: 'predicciones',
    reportes: 'reportes',
    configuracion: 'configuracion',
    soporte: 'soporte',
  }

  return map[id] ?? null
}

export function hashFromView(view: DashboardView): string {
  const map: Record<DashboardView, string> = {
    resumen: 'resumen',
    catalogo: 'catalogo',
    inventario: 'inventario',
    empresas: 'bx7group',
    marcas: 'teix',
    proveedores: 'proveedores',
    ventas: 'ventas',
    clientes: 'clientes',
    predicciones: 'predicciones',
    reportes: 'reportes',
    configuracion: 'configuracion',
    soporte: 'soporte',
  }

  return `#${map[view]}`
}
