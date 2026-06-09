import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { AlertTriangle, ArrowUpRight, CalendarDays, Coins, LineChart, Package, PanelLeft, ShieldCheck, Truck, Edit2, Copy, Trash2, BarChart3, Boxes, Building2, User, ShieldPlus, CircleHelp } from 'lucide-react'
import { CatalogView } from './components/catalog/CatalogView'
import { EmpresasView } from './components/empresas/EmpresasView'
import { ResumenView } from './components/resumen/ResumenView'
import { ResumenSubNav } from './components/resumen/ResumenSubNav'
import { LoginScreen } from './components/LoginScreen'
import { MetricCard } from './components/MetricCard'
import { Sidebar } from './components/Sidebar'
import { TopNav } from './components/TopNav'
import type { DashboardView } from './types/dashboard'
import { hashFromView, viewFromHash } from './types/dashboard'
import { activities, demoCredentials, forecastData, metrics, products as seedProducts, salesData, suppliers as seedSuppliers } from './data/mockData'
import type { Product, SessionUser, Supplier } from './types'
import { readStorage, writeStorage } from './utils/storage'

const sessionKey = 'bx7-session'
const suppliersKey = 'bx7-suppliers'
const productsKey = 'bx7-products'

const demoUser: SessionUser = {
  name: 'Admin BX7',
  email: demoCredentials.email,
  role: 'Administrador general',
}

const metricVariants = ['sales', 'products', 'suppliers', 'stock'] as const

type ProductDraft = {
  name: string
  sku: string
  category: string
  stock: string
  minStock: string
  price: string
  image?: string
  trend: Product['trend']
}

const productCategoryOptions = ['Accesorios', 'Repuestos', 'Packaging', 'Logística', 'Bolsos', 'Interior', 'Viaje', 'Herrajes', 'Premium']

const defaultProductDraft: ProductDraft = {
  name: '',
  sku: '',
  category: 'Accesorios',
  stock: '',
  minStock: '',
  price: '',
  image: '',
  trend: 'Estable',
}

function normalizeProducts(list: Product[]) {
  const seenIds = new Set<number>()
  const seenSkus = new Set<string>()

  return list.filter((product) => {
    if (seenIds.has(product.id) || seenSkus.has(product.sku)) {
      return false
    }

    seenIds.add(product.id)
    seenSkus.add(product.sku)
    return true
  })
}

export default function App() {
  const formatCurrencyMXN = (amount: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount)

  const [user, setUser] = useState<SessionUser | null>(() => readStorage<SessionUser | null>(sessionKey, null))
  const [suppliers, setSuppliers] = useState<Supplier[]>(() => readStorage(suppliersKey, seedSuppliers))
  const [products, setProducts] = useState<Product[]>(() => normalizeProducts(readStorage(productsKey, seedProducts)))
  const [loginError, setLoginError] = useState('')
  const [searchSupplier, setSearchSupplier] = useState('')
  const [searchProduct, setSearchProduct] = useState('')
  const [navSearch, setNavSearch] = useState('')
  const [productView, setProductView] = useState<'list' | 'create'>('list')
  const [productDraft, setProductDraft] = useState<ProductDraft>(defaultProductDraft)
  const [showProductModal, setShowProductModal] = useState(false)
  const [editingProductId, setEditingProductId] = useState<number | null>(null)
  const [activeView, setActiveView] = useState<DashboardView>(
    () => viewFromHash(window.location.hash) ?? 'resumen',
  )
  const [sidebarOpen, setSidebarOpen] = useState(() => window.matchMedia('(min-width: 1201px)').matches)
  const dashboardHeaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    writeStorage(sessionKey, user)
  }, [user])

  useEffect(() => {
    function handleHashChange() {
      const view = viewFromHash(window.location.hash)
      if (view) setActiveView(view)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('sidebar-drawer-open', sidebarOpen && window.matchMedia('(max-width: 1200px)').matches)
    return () => document.body.classList.remove('sidebar-drawer-open')
  }, [sidebarOpen])

  useEffect(() => {
    if (!sidebarOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [sidebarOpen])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1200px)')

    function handleViewportChange(event: MediaQueryListEvent) {
      setSidebarOpen(!event.matches)
    }

    media.addEventListener('change', handleViewportChange)
    return () => media.removeEventListener('change', handleViewportChange)
  }, [])


  useEffect(() => {
    writeStorage(suppliersKey, suppliers)
  }, [suppliers])

  useEffect(() => {
    writeStorage(productsKey, products)
  }, [products])

  // On first run, if example rim product not present, add a sample product that uses example image
  useEffect(() => {
    const hasRin = products.some((p) => p.sku === 'RIN-EX')
    if (!hasRin) {
      const sample: Product = {
        id: products.reduce((highestId, product) => Math.max(highestId, product.id), 0) + 1,
        name: 'Rin Offroad BX7 17"',
        sku: 'RIN-EX',
        category: 'Rines',
        stock: 20,
        minStock: 5,
        price: 1820.0,
        image: '/930.jpg',
        trend: 'Subiendo',
      }

      setProducts((current) => [sample, ...current])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stockAlerts = useMemo(
    () => products.filter((product) => product.stock <= product.minStock),
    [products],
  )

  const filteredSuppliers = useMemo(
    () => suppliers.filter((supplier) => supplier.name.toLowerCase().includes(searchSupplier.toLowerCase())),
    [searchSupplier, suppliers],
  )

  const filteredProducts = useMemo(
    () => products.filter((product) => product.name.toLowerCase().includes(searchProduct.toLowerCase())),
    [products, searchProduct],
  )

  const tableProducts = useMemo(() => {
    if (activeView !== 'inventario') return filteredProducts

    return [...filteredProducts].sort((a, b) => {
      const aCritical = a.stock <= a.minStock
      const bCritical = b.stock <= b.minStock
      if (aCritical !== bCritical) return aCritical ? -1 : 1
      return a.stock - b.stock
    })
  }, [activeView, filteredProducts])

  const productStats = useMemo(
    () => ({
      total: products.length,
      lowStock: products.filter((product) => product.stock <= product.minStock).length,
    }),
    [products],
  )

  function handleLogin(email: string, password: string) {
    const validLogin = email.toLowerCase() === demoCredentials.email && password === demoCredentials.password

    if (!validLogin) {
      setLoginError('Credenciales incorrectas. Usa la cuenta de demo.')
      return
    }

    setLoginError('')
    setUser(demoUser)
  }

  function handleLogout() {
    setUser(null)
  }

  function updateSupplierStatus(id: number, status: Supplier['status']) {
    setSuppliers((current) => current.map((supplier) => (supplier.id === id ? { ...supplier, status } : supplier)))
  }

  function restockProduct(id: number) {
    setProducts((current) =>
      current.map((product) =>
        product.id === id ? { ...product, stock: product.stock + Math.max(product.minStock, 10) } : product,
      ),
    )
  }

  function updateProductDraft(field: keyof ProductDraft, value: string) {
    setProductDraft((current) => ({ ...current, [field]: value } as ProductDraft))
  }

  function resetProductDraft() {
    setProductDraft(defaultProductDraft)
  }

  function handleCreateProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const name = productDraft.name.trim()
    const sku = productDraft.sku.trim()
    const category = productDraft.category.trim()
    const stock = Number.parseInt(productDraft.stock, 10)
    const minStock = Number.parseInt(productDraft.minStock, 10)
    const price = Number.parseFloat(productDraft.price)

    if (!name || !sku || !category || Number.isNaN(stock) || Number.isNaN(minStock) || Number.isNaN(price)) {
      return
    }

    if (editingProductId != null) {
      // Update existing product
      setProducts((current) =>
        current.map((p) => (p.id === editingProductId ? { ...p, name, sku, category, stock, minStock, price, image: productDraft.image || '/930.jpg', trend: productDraft.trend } : p)),
      )
      setEditingProductId(null)
    } else {
      const nextProduct: Product = {
        id: products.reduce((highestId, product) => Math.max(highestId, product.id), 0) + 1,
        name,
        sku,
        category,
        stock,
        minStock,
        price,
        image: productDraft.image || '/930.jpg',
        trend: productDraft.trend,
      }

      setProducts((current) => [nextProduct, ...current])
    }

    setSearchProduct('')
    setProductView('list')
    setShowProductModal(false)
    resetProductDraft()
  }

  function handleEditProduct(id: number) {
    const prod = products.find((p) => p.id === id)
    if (!prod) return
    setProductDraft({
      name: prod.name,
      sku: prod.sku,
      category: prod.category,
      stock: String(prod.stock),
      minStock: String(prod.minStock),
      price: String(prod.price),
      image: prod.image || '',
      trend: prod.trend,
    })
    setEditingProductId(id)
    setShowProductModal(true)
  }

  function handleDuplicateProduct(id: number) {
    const prod = products.find((p) => p.id === id)
    if (!prod) return
    const copy: Product = {
      id: products.reduce((highestId, product) => Math.max(highestId, product.id), 0) + 1,
      name: prod.name + ' (copia)',
      sku: prod.sku + '-C',
      category: prod.category,
      stock: prod.stock,
      minStock: prod.minStock,
      price: prod.price,
      image: prod.image || '/930.jpg',
      trend: prod.trend,
    }
    setProducts((current) => [copy, ...current])
  }

  function handleDeleteProduct(id: number) {
    const toDelete = products.find((p) => p.id === id)
    if (!toDelete) return
    const ok = window.confirm(`Eliminar ${toDelete.name}? Esta acción no se puede deshacer.`)
    if (!ok) return
    setProducts((current) => current.filter((p) => p.id !== id))
  }

  function getSupplierStatusClass(status: Supplier['status']) {
    if (status === 'Activo') return 'status-select status-active'
    if (status === 'En revisión') return 'status-select status-review'
    return 'status-select status-critical'
  }

  function getProductRowClass(product: Product) {
    return product.stock <= product.minStock ? 'stock-critical' : ''
  }

  function handleNavigate(view: DashboardView) {
    setActiveView(view)
    try {
      window.history.replaceState(null, '', hashFromView(view))
    } catch {
      window.location.hash = hashFromView(view)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (window.matchMedia('(max-width: 1200px)').matches) {
      setSidebarOpen(false)
    }
  }

  function toggleSidebar() {
    setSidebarOpen((current) => !current)
  }

  function closeSidebar() {
    setSidebarOpen(false)
  }

  if (!user) {
    return <LoginScreen onLogin={handleLogin} error={loginError} />
  }

  return (
    <div className={`app-shell${sidebarOpen ? ' app-shell--sidebar-open' : ' app-shell--sidebar-closed'}`}>
      <button
        type="button"
        className="sidebar-backdrop"
        aria-label="Cerrar menú lateral"
        aria-hidden={!sidebarOpen}
        tabIndex={sidebarOpen ? 0 : -1}
        onClick={closeSidebar}
      />

      <main className="dashboard">
        <div ref={dashboardHeaderRef} className="dashboard-header">
          <TopNav
            user={user}
            searchValue={navSearch}
            onSearchChange={setNavSearch}
            onLogout={handleLogout}
            sidebarOpen={sidebarOpen}
            onMenuToggle={toggleSidebar}
            onHomeClick={() => handleNavigate('resumen')}
            layoutRootRef={dashboardHeaderRef}
          />

          <ResumenSubNav activeView={activeView} onNavigate={handleNavigate} />
        </div>

        {activeView === 'resumen' ? <ResumenView /> : null}

        {activeView === 'clientes' ? (
        <section className="content-grid two-cols dashboard-view" id="informacion">
          <motion.article className="panel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="panel-head">
              <div>
                <p className="eyebrow">BX7 información</p>
                <h2>Resumen operativo BX7</h2>
              </div>
              <Building2 size={18} />
            </div>

            <p className="panel-copy">
              Controla inventario, pedidos, proveedores y rines off-road desde un solo panel diseñado para operación diaria.
            </p>

            <div className="quick-stats">
              <div>
                <ShieldCheck size={16} />
                Inventario y trazabilidad
              </div>
              <div>
                <BarChart3 size={16} />
                Métricas clave en tiempo real
              </div>
            </div>
          </motion.article>

          <div id="configuracion" className="nav-anchor" aria-hidden="true" />
          <motion.article className="panel" id="soporte" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.06 }}>
            <div className="panel-head">
              <div>
                <p className="eyebrow">BX7 soporte</p>
                <h2>Ayuda y contacto</h2>
              </div>
              <CircleHelp size={18} />
            </div>

            <p className="panel-copy">
              Si necesitas ayuda operativa o soporte técnico, este espacio queda listo para centralizar solicitudes y seguimiento.
            </p>

            <div className="quick-stats">
              <div>
                <User size={16} />
                {user.name} · {user.role}
              </div>
              <div>
                <ShieldPlus size={16} />
                Acceso administrativo activo
              </div>
            </div>
          </motion.article>
        </section>
        ) : null}

        {activeView === 'empresas' ? <EmpresasView /> : null}

        {activeView === 'marcas' ? <EmpresasView variant="marcas" /> : null}

        {activeView === 'soporte' || activeView === 'configuracion' ? (
        <section className="dashboard-view" id="soporte">
          <motion.article className="panel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.06 }}>
            <div className="panel-head">
              <div>
                <p className="eyebrow">BX7 soporte</p>
                <h2>{activeView === 'configuracion' ? 'Configuración' : 'Ayuda y contacto'}</h2>
              </div>
              <CircleHelp size={18} />
            </div>

            <p className="panel-copy">
              {activeView === 'configuracion'
                ? 'Ajustes generales del ERP, preferencias de cuenta y parámetros operativos del sistema.'
                : 'Si necesitas ayuda operativa o soporte técnico, este espacio queda listo para centralizar solicitudes y seguimiento.'}
            </p>

            <div className="quick-stats">
              <div>
                <User size={16} />
                {user.name} · {user.role}
              </div>
              <div>
                <ShieldPlus size={16} />
                Acceso administrativo activo
              </div>
            </div>
          </motion.article>
        </section>
        ) : null}

        {activeView === 'ventas' ? (
        <>
        <section className="hero-card dashboard-view" id="ventas">
          <div className="hero-stats">
            <article className="metric-card metric-card--small metric-card--sales">
              <div className="metric-icon" aria-hidden="true">
                <ShieldCheck size={18} />
              </div>
              <span>Capacidad operativa</span>
              <strong>98%</strong>
            </article>

            <article className="metric-card metric-card--small metric-card--stock">
              <div className="metric-icon" aria-hidden="true">
                <AlertTriangle size={18} />
              </div>
              <span>Riesgo de rotura</span>
              <strong>Moderado</strong>
            </article>

            <article className="metric-card metric-card--small metric-card--products">
              <div className="metric-icon" aria-hidden="true">
                <CalendarDays size={18} />
              </div>
              <span>Tiempo medio pedido</span>
              <strong>1.8 días</strong>
            </article>
          </div>
        </section>

        <section className="metrics-grid">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              index={index}
              label={metric.label}
              value={metric.value}
              delta={metric.delta}
              variant={metricVariants[index]}
            />
          ))}
        </section>

        <section className="content-grid">
          <motion.article className="panel chart-panel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="panel-head">
              <div>
                <p className="eyebrow">BX7 ventas y pedidos</p>
                <h2>Ritmo comercial BX7</h2>
              </div>
              <span className="badge badge-positive">
                <ArrowUpRight size={14} />
                Tendencia positiva
              </span>
            </div>

            <div className="chart-box">
              <ResponsiveContainer width="100%" height={290}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff5a1f" stopOpacity={0.46} />
                      <stop offset="95%" stopColor="#ffb000" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.52)" />
                  <YAxis stroke="rgba(255,255,255,0.52)" />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(8, 8, 8, 0.96)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 16,
                    }}
                  />
                  <Area type="monotone" dataKey="ingresos" stroke="#ffb000" strokeWidth={3} fill="url(#salesGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.article>

          <motion.article className="panel side-panel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.06 }}>
            <div className="panel-head">
              <div>
                <p className="eyebrow">BX7 alertas</p>
                <h2>Acciones urgentes BX7</h2>
              </div>
              <AlertTriangle size={18} />
            </div>

            <div className="alert-list">
              {stockAlerts.map((product) => (
                <div className="alert-item" key={`${product.id}-${product.sku}`}>
                  <div>
                    <strong>{product.name}</strong>
                    <span>Stock {product.stock} / mínimo {product.minStock}</span>
                  </div>
                  <button type="button" onClick={() => restockProduct(product.id)}>
                    Reponer
                  </button>
                </div>
              ))}
            </div>

            <div className="quick-stats">
              <div>
                <CalendarDays size={16} />
                Próxima revisión: 02 Jun
              </div>
              <div>
                <ShieldCheck size={16} />
                3 proveedores validados
              </div>
            </div>
          </motion.article>
        </section>
        </>
        ) : null}

        {activeView === 'proveedores' ? (
        <section className="content-stack dashboard-view" id="proveedores">
          <motion.article className="panel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="panel-head">
              <div>
                <p className="eyebrow">BX7 proveedores</p>
                <h2>Red de suministro BX7</h2>
              </div>
              <input value={searchSupplier} onChange={(event) => setSearchSupplier(event.target.value)} placeholder="Buscar proveedor" />
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Proveedor</th>
                    <th>Categoría</th>
                    <th>Estado</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier) => (
                    <tr key={`${supplier.id}-${supplier.name}`}>
                      <td>
                        <strong>{supplier.name}</strong>
                        <span>{supplier.contact}</span>
                      </td>
                      <td>{supplier.category}</td>
                      <td>
                        <select
                          className={getSupplierStatusClass(supplier.status)}
                          value={supplier.status}
                          onChange={(event) => updateSupplierStatus(supplier.id, event.target.value as Supplier['status'])}
                        >
                          <option value="Activo">Activo</option>
                          <option value="En revisión">En revisión</option>
                          <option value="Crítico">Crítico</option>
                        </select>
                      </td>
                      <td>{supplier.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.article>
        </section>
        ) : null}

        {activeView === 'catalogo' ? <CatalogView /> : null}

        {activeView === 'inventario' ? (
        <section className="content-stack dashboard-view" id="inventario">
          <motion.article className="panel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="panel-head">
              <div>
                <p className="eyebrow">BX7 inventario</p>
                <h2>Control de inventario</h2>
              </div>
              <AlertTriangle size={18} />
            </div>

            {stockAlerts.length > 0 ? (
              <div className="alert-list inventory-alert-list">
                {stockAlerts.map((product) => (
                  <div className="alert-item" key={`alert-${product.id}-${product.sku}`}>
                    <div>
                      <strong>{product.name}</strong>
                      <span>Stock {product.stock} / mínimo {product.minStock}</span>
                    </div>
                    <button type="button" onClick={() => restockProduct(product.id)}>
                      Reponer
                    </button>
                  </div>
                ))}
              </div>
            ) : null}

            {productView === 'list' ? (
              <div className="product-list-view">
                <div className="products-header">
                  <div className="products-stats">
                    <div className="product-stat">
                      <span className="stat-label">Productos</span>
                      <strong className="stat-value">{productStats.total}</strong>
                    </div>

                    <div className="product-stat">
                      <span className="stat-label">Bajo stock</span>
                      <strong className="stat-value">{productStats.lowStock}</strong>
                    </div>

                    <div className="product-stat">
                      <span className="stat-label">Resultados</span>
                      <strong className="stat-value">{filteredProducts.length}</strong>
                    </div>
                  </div>

                  <div className="products-actions">
                    <div className="products-tabs">
                      <button type="button" className="tab-button tab-button--active" onClick={() => setProductView('list')}>Lista</button>
                    </div>
                  </div>
                </div>

                {showProductModal && (
                  <div className="modal-backdrop" onClick={() => setShowProductModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                      <form className="product-form" onSubmit={handleCreateProduct}>
                        <div className="product-form-headline">
                          <strong>Alta rápida</strong>
                          <span>Formulario corto y directo para registrar un producto sin saturar la vista.</span>
                        </div>

                        <div className="form-grid">
                          <label>
                            Nombre
                            <input value={productDraft.name} onChange={(event) => updateProductDraft('name', event.target.value)} placeholder="Nombre del producto" required />
                          </label>

                          <label>
                            SKU
                            <input value={productDraft.sku} onChange={(event) => updateProductDraft('sku', event.target.value)} placeholder="SP-2001" required />
                          </label>

                          <label>
                            Categoría
                            <select value={productDraft.category} onChange={(event) => updateProductDraft('category', event.target.value)}>
                              {productCategoryOptions.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          </label>

                          <label>
                            Estado de rotación
                            <select value={productDraft.trend} onChange={(event) => updateProductDraft('trend', event.target.value)}>
                              <option value="Subiendo">Subiendo</option>
                              <option value="Estable">Estable</option>
                              <option value="Bajando">Bajando</option>
                            </select>
                          </label>

                          <label>
                            Stock inicial
                            <input value={productDraft.stock} onChange={(event) => updateProductDraft('stock', event.target.value)} type="number" min="0" placeholder="0" required />
                          </label>

                          <label>
                            Stock mínimo
                            <input value={productDraft.minStock} onChange={(event) => updateProductDraft('minStock', event.target.value)} type="number" min="0" placeholder="20" required />
                          </label>

                          <label>
                            Precio
                            <input value={productDraft.price} onChange={(event) => updateProductDraft('price', event.target.value)} type="number" min="0" step="0.01" placeholder="19.90" required />
                          </label>

                          <label>
                            Imagen (URL o subir)
                            <input
                              type="text"
                              value={productDraft.image || ''}
                              onChange={(e) => updateProductDraft('image', e.target.value)}
                              placeholder="https://... o dejar vacío para usar imagen ejemplo"
                            />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (!file) return
                                const reader = new FileReader()
                                reader.onload = () => {
                                  updateProductDraft('image', String(reader.result))
                                }
                                reader.readAsDataURL(file)
                              }}
                            />
                            <button type="button" className="ghost-button" onClick={() => updateProductDraft('image', '/930.jpg')}>Usar imagen de ejemplo</button>
                          </label>
                        </div>

                        <div className="form-actions">
                          <button type="submit" className="primary-button">{editingProductId ? 'Guardar cambios' : 'Guardar producto'}</button>
                          <button type="button" className="ghost-button" onClick={() => { resetProductDraft(); setShowProductModal(false); setEditingProductId(null); }}>Cancelar</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableProducts.map((product) => (
                        <tr key={`${product.id}-${product.sku}`} className={getProductRowClass(product)}>
                          <td>
                            <div className="product-cell">
                              <img src={product.image || '/930.jpg'} alt={product.name} className="product-thumb" />
                              <div className="product-cell__copy">
                                <strong>{product.name}</strong>
                                <span>{product.sku} · {product.category}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <strong>{product.stock}</strong>
                            <span>Mín. {product.minStock}</span>
                          </td>
                          <td>{formatCurrencyMXN(product.price)}</td>
                          <td>
                            <div className="table-actions">
                              <button type="button" className="icon-button" title="Editar" onClick={() => handleEditProduct(product.id)}>
                                <Edit2 size={16} />
                              </button>

                              <button type="button" className="icon-button" title="Duplicar" onClick={() => handleDuplicateProduct(product.id)}>
                                <Copy size={16} />
                              </button>

                              <button type="button" className="icon-button" title="Eliminar" onClick={() => handleDeleteProduct(product.id)}>
                                <Trash2 size={16} />
                              </button>

                              <button type="button" className="ghost-button" onClick={() => restockProduct(product.id)}>
                                Reponer
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="product-form-layout">
                <form className="product-form" onSubmit={handleCreateProduct}>
                  <div className="product-form-headline">
                    <strong>Alta rápida</strong>
                    <span>Formulario corto y directo para registrar un producto sin saturar la vista.</span>
                  </div>

                  <div className="form-grid">
                    <label>
                      Nombre
                      <input value={productDraft.name} onChange={(event) => updateProductDraft('name', event.target.value)} placeholder="Nombre del producto" required />
                    </label>

                    <label>
                      SKU
                      <input value={productDraft.sku} onChange={(event) => updateProductDraft('sku', event.target.value)} placeholder="SP-2001" required />
                    </label>

                    <label>
                      Categoría
                      <select value={productDraft.category} onChange={(event) => updateProductDraft('category', event.target.value)}>
                        {productCategoryOptions.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Estado de rotación
                      <select value={productDraft.trend} onChange={(event) => updateProductDraft('trend', event.target.value)}>
                        <option value="Subiendo">Subiendo</option>
                        <option value="Estable">Estable</option>
                        <option value="Bajando">Bajando</option>
                      </select>
                    </label>

                    <label>
                      Stock inicial
                      <input value={productDraft.stock} onChange={(event) => updateProductDraft('stock', event.target.value)} type="number" min="0" placeholder="0" required />
                    </label>

                    <label>
                      Stock mínimo
                      <input value={productDraft.minStock} onChange={(event) => updateProductDraft('minStock', event.target.value)} type="number" min="0" placeholder="20" required />
                    </label>

                    <label>
                      Precio
                      <input value={productDraft.price} onChange={(event) => updateProductDraft('price', event.target.value)} type="number" min="0" step="0.01" placeholder="19.90" required />
                    </label>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="primary-button">
                      Guardar producto
                    </button>
                    <button
                      type="button"
                      className="ghost-button"
                      onClick={() => {
                        resetProductDraft()
                        setProductView('list')
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>

                <aside className="product-preview-card">
                  <p className="eyebrow">Vista rápida</p>
                  {productDraft.image ? (
                    <img src={productDraft.image} alt={productDraft.name || 'Preview'} style={{width: '100%', borderRadius: 8, marginBottom: 8, objectFit: 'cover'}} />
                  ) : null}
                  <strong>{productDraft.name || 'Nuevo producto'}</strong>
                  <span>{productDraft.sku || 'SKU pendiente'}</span>

                    <div className="preview-grid">
                    <div>
                      <span>Categoría</span>
                      <strong>{productDraft.category}</strong>
                    </div>
                    <div>
                      <span>Rotación</span>
                      <strong>{productDraft.trend}</strong>
                    </div>
                    <div>
                      <span>Stock</span>
                      <strong>{productDraft.stock || '0'}</strong>
                    </div>
                    <div>
                      <span>Precio</span>
                      <strong>{productDraft.price ? formatCurrencyMXN(Number(productDraft.price)) : formatCurrencyMXN(0)}</strong>
                    </div>
                  </div>

                  <p>La idea es registrar rápido y seguir viendo la lista sin cambiar de pantalla demasiado.</p>
                </aside>
              </div>
            )}
          </motion.article>
        </section>
        ) : null}

        {activeView === 'reportes' ? (
        <section className="content-grid dashboard-view" id="reportes">
          <section className="metrics-grid">
            {metrics.map((metric, index) => (
              <MetricCard
                key={metric.label}
                index={index}
                label={metric.label}
                value={metric.value}
                delta={metric.delta}
                variant={metricVariants[index]}
              />
            ))}
          </section>

          <motion.article className="panel chart-panel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="panel-head">
              <div>
                <p className="eyebrow">BX7 reportes</p>
                <h2>Resumen comercial</h2>
              </div>
              <BarChart3 size={18} />
            </div>

            <div className="chart-box">
              <ResponsiveContainer width="100%" height={290}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="reportGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff5a1f" stopOpacity={0.46} />
                      <stop offset="95%" stopColor="#ffb000" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.52)" />
                  <YAxis stroke="rgba(255,255,255,0.52)" />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(8, 8, 8, 0.96)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 16,
                    }}
                  />
                  <Area type="monotone" dataKey="ingresos" stroke="#ffb000" strokeWidth={3} fill="url(#reportGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.article>

          <motion.article className="panel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.06 }}>
            <div className="panel-head">
              <div>
                <p className="eyebrow">BX7 actividad</p>
                <h2>Eventos recientes</h2>
              </div>
              <PanelLeft size={18} />
            </div>

            <div className="activity-list">
              {activities.map((activity) => (
                <div key={activity.title} className="activity-item">
                  <div>
                    <strong>{activity.title}</strong>
                    <span>{activity.detail}</span>
                  </div>
                  <small>{activity.time}</small>
                </div>
              ))}
            </div>
          </motion.article>
        </section>
        ) : null}

        {activeView === 'predicciones' ? (
        <section className="content-grid two-cols dashboard-view" id="predicciones">
          <motion.article className="panel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="panel-head">
              <div>
                <p className="eyebrow">BX7 predicciones</p>
                <h2>Demanda estimada BX7</h2>
              </div>
              <LineChart size={18} />
            </div>

            <div className="forecast-list">
              {forecastData.map((point) => (
                <div key={point.month} className="forecast-item">
                  <div>
                    <strong>{point.month}</strong>
                    <span>Demanda proyectada</span>
                  </div>
                  <div>
                    <strong>{point.demanda}</strong>
                    <span>Stock previsto {point.stock}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article className="panel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.06 }}>
            <div className="panel-head">
              <div>
                <p className="eyebrow">BX7 actividad</p>
                <h2>Últimos eventos BX7</h2>
              </div>
              <PanelLeft size={18} />
            </div>

            <div className="activity-list">
              {activities.map((activity) => (
                <div key={activity.title} className="activity-item">
                  <div>
                    <strong>{activity.title}</strong>
                    <span>{activity.detail}</span>
                  </div>
                  <small>{activity.time}</small>
                </div>
              ))}
            </div>

            <div className="inventory-summary">
              <div>
                <Package size={16} />
                {products.length} referencias activas
              </div>
              <div>
                <Coins size={16} />
                Facturación estimada {formatCurrencyMXN(128000)}
              </div>
              <div>
                <Truck size={16} />
                14 envíos en tránsito
              </div>
            </div>
          </motion.article>
        </section>
        ) : null}
      </main>

      <Sidebar activeView={activeView} isOpen={sidebarOpen} onNavigate={handleNavigate} onClose={closeSidebar} />
    </div>
  )
}