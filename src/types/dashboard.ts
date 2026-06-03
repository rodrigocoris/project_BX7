export type DashboardView =
  | 'resumen'
  | 'productos'
  | 'empresas'
  | 'marcas'
  | 'proveedores'
  | 'ventas'
  | 'clientes'
  | 'predicciones'
  | 'configuracion'
  | 'soporte'

export function viewFromHash(hash: string): DashboardView | null {
  const id = hash.replace(/^#/, '').toLowerCase()

  const map: Record<string, DashboardView> = {
    resumen: 'resumen',
    productos: 'productos',
    catalogo: 'productos',
    inventario: 'productos',
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
    reportes: 'predicciones',
    configuracion: 'configuracion',
    soporte: 'soporte',
  }

  return map[id] ?? null
}

export function hashFromView(view: DashboardView): string {
  const map: Record<DashboardView, string> = {
    resumen: 'resumen',
    productos: 'productos',
    empresas: 'bx7group',
    marcas: 'teix',
    proveedores: 'proveedores',
    ventas: 'ventas',
    clientes: 'clientes',
    predicciones: 'predicciones',
    configuracion: 'configuracion',
    soporte: 'soporte',
  }

  return `#${map[view]}`
}
