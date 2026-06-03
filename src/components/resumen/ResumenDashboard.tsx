import {
  AlertTriangle,
  BarChart3,
  Box,
  ChevronDown,
  ClipboardList,
  DollarSign,
  FileText,
  ShoppingCart,
  Users,
} from 'lucide-react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { resumenActivities, resumenChartData, resumenKpis, resumenTopBrands } from '../../data/resumenData'
import { BrandMark } from './DistributedBrandMarks'

function KpiIcon({ icon, tone }: { icon: string; tone: string }) {
  const className = `resumen-kpi__icon resumen-kpi__icon--${tone}`

  return (
    <span className={className} aria-hidden="true">
      {icon === 'dollar' && <DollarSign size={20} />}
      {icon === 'orders' && <ClipboardList size={20} />}
      {icon === 'cube' && <Box size={20} />}
      {icon === 'users' && <Users size={20} />}
    </span>
  )
}

function ActivityIcon({ icon, tone }: { icon: string; tone: string }) {
  const className = `resumen-activity__icon resumen-activity__icon--${tone}`

  return (
    <span className={className} aria-hidden="true">
      {icon === 'cart' && <ShoppingCart size={16} />}
      {icon === 'box' && <Box size={16} />}
      {icon === 'sale' && <Users size={16} />}
      {icon === 'alert' && <AlertTriangle size={16} />}
      {icon === 'report' && <FileText size={16} />}
      {icon !== 'cart' && icon !== 'box' && icon !== 'sale' && icon !== 'alert' && icon !== 'report' && (
        <BarChart3 size={16} />
      )}
    </span>
  )
}

export function ResumenDashboard() {
  return (
    <div className="resumen-dashboard">
      <section className="resumen-panel resumen-kpis-section" aria-labelledby="resumen-general-title">
        <div className="resumen-panel__head">
          <h3 id="resumen-general-title">Resumen General</h3>
          <button type="button" className="resumen-filter">
            Este mes
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="resumen-kpis">
          {resumenKpis.map((kpi) => (
            <article key={kpi.id} className="resumen-kpi">
              <KpiIcon icon={kpi.icon} tone={kpi.tone} />
              <div className="resumen-kpi__body">
                <span className="resumen-kpi__label">{kpi.label}</span>
                <strong className="resumen-kpi__value">{kpi.value}</strong>
                <span className="resumen-kpi__delta resumen-kpi__delta--up">{kpi.delta}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="resumen-panel resumen-chart-panel" aria-labelledby="resumen-chart-title">
          <div className="resumen-panel__head">
            <h3 id="resumen-chart-title">Ventas y Tendencias</h3>
          </div>

          <div className="resumen-chart-legend">
            <span className="resumen-chart-legend__item">
              <i className="resumen-chart-legend__line resumen-chart-legend__line--solid" />
              Ventas
            </span>
            <span className="resumen-chart-legend__item">
              <i className="resumen-chart-legend__line resumen-chart-legend__line--dashed" />
              Órdenes
            </span>
          </div>

          <div className="resumen-chart-box">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={resumenChartData}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.45)" tick={{ fontSize: 11 }} />
                <YAxis
                  stroke="rgba(255,255,255,0.45)"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) => `$${value}M`}
                  domain={[0, 30]}
                  ticks={[0, 10, 20, 30]}
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(10, 10, 10, 0.96)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                  }}
                />
                <Line type="monotone" dataKey="ventas" stroke="#ff7a00" strokeWidth={2.5} dot={false} />
                <Line
                  type="monotone"
                  dataKey="ordenes"
                  stroke="#ff9f43"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
      </section>

      <div className="resumen-bottom-grid">
        <section className="resumen-panel resumen-brands-panel" aria-labelledby="resumen-brands-title">
            <div className="resumen-panel__head">
              <h3 id="resumen-brands-title">Marcas Principales</h3>
              <button type="button" className="resumen-panel__link">
                Ver todas
              </button>
            </div>

            <ul className="resumen-brands-list">
              {resumenTopBrands.map((brand) => (
                <li key={brand.name} className="resumen-brand-row">
                  <BrandMark id={brand.id} />
                  <div className="resumen-brand-row__info">
                    <strong>{brand.name}</strong>
                    <span>{brand.revenue}</span>
                    <div className="resumen-brand-row__bar">
                      <span style={{ width: `${brand.progress}%` }} />
                    </div>
                  </div>
                  <span className="resumen-brand-row__growth">{brand.growth}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="resumen-panel resumen-activity-panel" aria-labelledby="resumen-activity-title">
            <div className="resumen-panel__head">
              <h3 id="resumen-activity-title">Actividad Reciente</h3>
              <button type="button" className="resumen-panel__link">
                Ver todas
              </button>
            </div>

            <ul className="resumen-activity-list">
              {resumenActivities.map((item) => (
                <li key={item.id} className="resumen-activity-item">
                  <ActivityIcon icon={item.icon} tone={item.tone} />
                  <div className="resumen-activity-item__copy">
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <time>{item.time}</time>
                </li>
              ))}
            </ul>
        </section>
      </div>
    </div>
  )
}
