import { useState, useEffect, useRef, useCallback } from 'react'
import { X, ChevronDown, Sparkles, TrendingUp, AlertTriangle, Package, BarChart3, Zap } from 'lucide-react'
import { products, salesData, forecastData } from '../data/mockData'
import { resumenTopBrands } from '../data/resumenData'
import '../styles/ai-assistant.css'

// ─── Types ─────────────────────────────────────────────────────────────────────

type RecType = 'restock' | 'trending' | 'insight' | 'alert' | 'opportunity'

interface Rec {
  id: string
  type: RecType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  color: string
  badge: string
  title: string
  body: string
  metric?: string
  metricDelta?: string
  metricPositive?: boolean
}

// ─── Recommendation engine ─────────────────────────────────────────────────────

function buildRecommendations(): Rec[] {
  const recs: Rec[] = []

  // 1. Critical stock alerts
  const criticalStock = products.filter((p) => p.stock <= p.minStock)
  criticalStock.forEach((p) => {
    recs.push({
      id: `restock-${p.id}`,
      type: 'restock',
      icon: AlertTriangle,
      color: '#ef4444',
      badge: 'Stock crítico',
      title: `Reponer "${p.name}"`,
      body: `Solo quedan ${p.stock} unidades (mínimo requerido: ${p.minStock}). Si no haces el pedido hoy podrías tener quiebre de stock antes del fin de semana. Revisa a tu proveedor principal para agilizar el proceso.`,
      metric: `${p.stock} uds`,
      metricDelta: `${p.stock - p.minStock} del mínimo`,
      metricPositive: false,
    })
  })

  // 2. Trending up products
  const trending = products.filter((p) => p.trend === 'Subiendo')
  trending.forEach((p) => {
    recs.push({
      id: `trend-${p.id}`,
      type: 'trending',
      icon: TrendingUp,
      color: '#22c55e',
      badge: 'Tendencia al alza',
      title: `${p.name} está despegando`,
      body: `La demanda de "${p.name}" sube de forma sostenida. Con ${p.stock} unidades disponibles al precio de $${p.price}, es el momento ideal para aumentar la orden de compra y aprovechar el impulso.`,
      metric: `$${p.price}`,
      metricDelta: 'Demanda subiendo',
      metricPositive: true,
    })
  })

  // 3. Top brand insight
  const topBrand = resumenTopBrands[0]
  recs.push({
    id: 'top-brand',
    type: 'insight',
    icon: BarChart3,
    color: '#ff8c00',
    badge: 'Marca líder',
    title: `${topBrand.name} domina tus ventas`,
    body: `${topBrand.name} generó ${topBrand.revenue} con un crecimiento de ${topBrand.growth}. Ampliar el catálogo con 3-5 SKUs adicionales de esta marca podría sumar entre 15-20% más de ingresos este trimestre.`,
    metric: topBrand.revenue,
    metricDelta: topBrand.growth,
    metricPositive: true,
  })

  // 4. Revenue momentum
  const last = salesData[salesData.length - 1]
  const prev = salesData[salesData.length - 2]
  const pct = (((last.ingresos - prev.ingresos) / prev.ingresos) * 100).toFixed(1)
  recs.push({
    id: 'revenue-momentum',
    type: 'opportunity',
    icon: Zap,
    color: '#a855f7',
    badge: 'Oportunidad',
    title: 'Ventas en máximos históricos',
    body: `Este mes alcanzaste MX$${last.ingresos.toLocaleString()} — un ${pct}% más que el mes anterior. El modelo de demanda sugiere que Agosto puede superar ese récord si repones las líneas FOX Suspension y KC HiLiTES antes del día 20.`,
    metric: `MX$${last.ingresos.toLocaleString()}`,
    metricDelta: `+${pct}% vs mes anterior`,
    metricPositive: true,
  })

  // 5. Forecast deficit
  const deficit = forecastData.find((f) => f.demanda > f.stock)
  if (deficit) {
    recs.push({
      id: 'forecast-deficit',
      type: 'alert',
      icon: Package,
      color: '#f59e0b',
      badge: 'Alerta forecast',
      title: `Déficit proyectado en ${deficit.month}`,
      body: `La demanda prevista (${deficit.demanda} uds) superará tu stock disponible (${deficit.stock} uds) en ${deficit.month}. Adelanta órdenes de compra al menos 3 semanas antes de que inicie el periodo para evitar pérdida de ventas.`,
      metric: `${deficit.demanda - deficit.stock} uds`,
      metricDelta: 'Déficit proyectado',
      metricPositive: false,
    })
  }

  // 6. BX7 Wheels brand push
  const bx7 = resumenTopBrands.find((b) => b.name === 'BX7 Wheels')
  if (bx7) {
    recs.push({
      id: 'bx7-wheels-push',
      type: 'insight',
      icon: TrendingUp,
      color: '#ff5a1f',
      badge: 'Marca propia',
      title: 'BX7 Wheels tiene potencial sin explotar',
      body: `Tu marca insignia creció ${bx7.growth} con ${bx7.revenue} este mes. Lanzar 2-3 nuevos SKUs en la categoría rines offroad 18" podría incrementar las ventas de marca propia otro 20-25% según el patrón de demanda del mercado.`,
      metric: bx7.revenue,
      metricDelta: bx7.growth,
      metricPositive: true,
    })
  }

  // 7. Down-trending products to liquidate
  const dropping = products.filter((p) => p.trend === 'Bajando' && p.stock > p.minStock)
  dropping.forEach((p) => {
    recs.push({
      id: `liquidate-${p.id}`,
      type: 'alert',
      icon: AlertTriangle,
      color: '#f59e0b',
      badge: 'Revisar estrategia',
      title: `"${p.name}" baja en demanda`,
      body: `La demanda de "${p.name}" está cayendo con ${p.stock} unidades en stock. Considera una promoción de liquidación o ajuste de precio antes de que el inventario se acumule y genere costo de almacenaje adicional.`,
      metric: `${p.stock} uds`,
      metricDelta: 'Tendencia bajando',
      metricPositive: false,
    })
  })

  return recs
}

const ALL_RECS = buildRecommendations()

// ─── Typewriter hook ───────────────────────────────────────────────────────────

function useTypewriter(text: string, active: boolean, speed = 16) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (!active) { setDisplayed(''); return }
    setDisplayed('')
    let i = 0
    const t = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, ++i)) }
      else clearInterval(t)
    }, speed)
    return () => clearInterval(t)
  }, [text, active, speed])
  return displayed
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function AiAssistant() {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [idx, setIdx] = useState(0)
  const [typing, setTyping] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const rec = ALL_RECS[idx]
  const typedBody = useTypewriter(rec.body, typing)
  const Icon = rec.icon

  const goTo = useCallback((next: number) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setTyping(false)
    setTimeout(() => { setIdx(next); setTyping(true) }, 100)
  }, [])

  // Auto-rotate every 13 s
  useEffect(() => {
    if (!open || minimized) return
    timerRef.current = setTimeout(() => goTo((idx + 1) % ALL_RECS.length), 13000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [open, minimized, idx, goTo])

  useEffect(() => {
    if (open && !minimized) setTimeout(() => setTyping(true), 500)
    else setTyping(false)
  }, [open, minimized])

  return (
    <>
      {/* ─── FAB launcher — robot completo ──────────────────────────────────── */}
      {!open && (
        <button
          type="button"
          className="ai-fab"
          onClick={() => setOpen(true)}
          aria-label="Abrir Asistente IA BX7"
        >
          <img src="/bx7-assistant.png" alt="Asistente BX7" className="ai-fab__img" />
          <span className="ai-fab__notify">
            <Sparkles size={10} />
            {ALL_RECS.length}
          </span>
        </button>
      )}

      {/* ─── Panel ─────────────────────────────────────────────────────────── */}
      {open && (
        <div className={`ai-panel${minimized ? ' ai-panel--min' : ''}`} role="dialog" aria-label="Asistente IA BX7">
          {/* Header */}
          <div className="ai-panel__hd">
            <div className="ai-panel__avatar-wrap">
              <img src="/bx7-assistant.png" alt="" className="ai-panel__hd-img" aria-hidden="true" />
              <span className="ai-panel__live" />
            </div>
            <div className="ai-panel__hd-copy">
              <strong>Asistente BX7 IA</strong>
              <span>Analizando tu negocio en tiempo real</span>
            </div>
            <div className="ai-panel__hd-btns">
              <button type="button" className="ai-panel__hd-btn" onClick={() => setMinimized((m) => !m)} aria-label={minimized ? 'Expandir' : 'Minimizar'}>
                <ChevronDown size={15} className={minimized ? 'ai-rotate' : ''} />
              </button>
              <button type="button" className="ai-panel__hd-btn" onClick={() => { setOpen(false); setTyping(false) }} aria-label="Cerrar">
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Body */}
          {!minimized && (
            <div className="ai-panel__bd">
              {/* Rec card */}
              <div className="ai-rec" style={{ '--rc': rec.color } as React.CSSProperties}>
                <div className="ai-rec__top">
                  <span className="ai-rec__badge" style={{ color: rec.color, background: `${rec.color}20` }}>
                    <Icon size={11} />
                    {rec.badge}
                  </span>
                  <span className="ai-rec__count">{idx + 1}/{ALL_RECS.length}</span>
                </div>
                <h4 className="ai-rec__title">{rec.title}</h4>
                <p className="ai-rec__body">
                  {typedBody}
                  {typedBody.length < rec.body.length && <span className="ai-cursor">▋</span>}
                </p>
                {rec.metric && (
                  <div className="ai-rec__metric">
                    <span className="ai-rec__mval">{rec.metric}</span>
                    <span className="ai-rec__mdelta" style={{ color: rec.metricPositive ? '#4ade80' : '#f87171' }}>
                      {rec.metricDelta}
                    </span>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="ai-panel__nav">
                <button type="button" className="ai-panel__nav-btn" onClick={() => goTo((idx - 1 + ALL_RECS.length) % ALL_RECS.length)}>‹</button>
                <div className="ai-panel__pips">
                  {ALL_RECS.map((_, i) => (
                    <button key={i} type="button" className={`ai-pip${i === idx ? ' ai-pip--on' : ''}`} onClick={() => goTo(i)} aria-label={`Recomendación ${i + 1}`} />
                  ))}
                </div>
                <button type="button" className="ai-panel__nav-btn" onClick={() => goTo((idx + 1) % ALL_RECS.length)}>›</button>
              </div>

              <p className="ai-panel__hint">
                <Sparkles size={10} style={{ color: '#ff8c00' }} />
                Generado en tiempo real con tus datos de inventario, ventas y marcas
              </p>
            </div>
          )}
        </div>
      )}
    </>
  )
}
