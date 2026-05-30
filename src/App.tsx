import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { AlertTriangle, ArrowUpRight, CalendarDays, Coins, LineChart, Package, PanelLeft, ShieldCheck, Truck } from 'lucide-react'
import { LoginScreen } from './components/LoginScreen'
import { MetricCard } from './components/MetricCard'
import { Sidebar } from './components/Sidebar'
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

export default function App() {
  const [user, setUser] = useState<SessionUser | null>(() => readStorage<SessionUser | null>(sessionKey, null))
  const [suppliers, setSuppliers] = useState<Supplier[]>(() => readStorage(suppliersKey, seedSuppliers))
  const [products, setProducts] = useState<Product[]>(() => readStorage(productsKey, seedProducts))
  const [loginError, setLoginError] = useState('')
  const [searchSupplier, setSearchSupplier] = useState('')
  const [searchProduct, setSearchProduct] = useState('')

  useEffect(() => {
    writeStorage(sessionKey, user)
  }, [user])

  useEffect(() => {
    writeStorage(suppliersKey, suppliers)
  }, [suppliers])

  useEffect(() => {
    writeStorage(productsKey, products)
  }, [products])

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

  if (!user) {
    return <LoginScreen onLogin={handleLogin} error={loginError} />
  }

  return (
    <div className="app-shell">
      <Sidebar user={user} onLogout={handleLogout} />

      <main className="dashboard">
        <section className="hero-card" id="resumen">
          <div>
            <p className="eyebrow">BX7 ERP</p>
            <h1>Controla inventario, proveedores y demanda desde un solo panel.</h1>
            <p>
              Una base sólida para operar compras, ventas y planificación con una experiencia visual moderna y rápida.
            </p>
          </div>
          <div className="hero-stats">
            <div>
              <span>Capacidad operativa</span>
              <strong>98%</strong>
            </div>
            <div>
              <span>Riesgo de rotura</span>
              <strong>Moderado</strong>
            </div>
            <div>
              <span>Tiempo medio pedido</span>
              <strong>1.8 días</strong>
            </div>
          </div>
        </section>

        <section className="metrics-grid">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} index={index} label={metric.label} value={metric.value} delta={metric.delta} />
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
                <div className="alert-item" key={product.id}>
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

        <section className="content-grid two-cols" id="proveedores">
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
                    <tr key={supplier.id}>
                      <td>
                        <strong>{supplier.name}</strong>
                        <span>{supplier.contact}</span>
                      </td>
                      <td>{supplier.category}</td>
                      <td>
                        <select value={supplier.status} onChange={(event) => updateSupplierStatus(supplier.id, event.target.value as Supplier['status'])}>
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

          <motion.article className="panel" id="productos" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.06 }}>
            <div className="panel-head">
              <div>
                <p className="eyebrow">BX7 inventario</p>
                <h2>Productos y rotación BX7</h2>
              </div>
              <input value={searchProduct} onChange={(event) => setSearchProduct(event.target.value)} placeholder="Buscar producto" />
            </div>

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
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <strong>{product.name}</strong>
                        <span>{product.sku} · {product.category}</span>
                      </td>
                      <td>
                        <strong>{product.stock}</strong>
                        <span>Mín. {product.minStock}</span>
                      </td>
                      <td>€{product.price.toFixed(2)}</td>
                      <td>
                        <button type="button" className="ghost-button" onClick={() => restockProduct(product.id)}>
                          Reponer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.article>
        </section>

        <section className="content-grid two-cols" id="predicciones">
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
                Facturación estimada €128k
              </div>
              <div>
                <Truck size={16} />
                14 envíos en tránsito
              </div>
            </div>
          </motion.article>
        </section>
      </main>
    </div>
  )
}