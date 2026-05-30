import { motion } from 'framer-motion'

type MetricCardProps = {
  label: string
  value: string
  delta: string
  index: number
  variant: 'sales' | 'products' | 'suppliers' | 'stock'
}

function MetricSymbol({ variant }: Pick<MetricCardProps, 'variant'>) {
  if (variant === 'sales') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 17V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 17v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 17V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 17v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 17V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (variant === 'products') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7l8-4 8 4-8 4-8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
        <path d="M4 7v10l8 4 8-4V7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
        <path d="M12 11v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (variant === 'suppliers') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 18a4 4 0 0 1 8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 12a3 3 0 1 0 0.001-6.001A3 3 0 0 0 9 12Z" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M15 18a4 4 0 0 1 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 12a2.5 2.5 0 1 0 0.001-5.001A2.5 2.5 0 0 0 17 12Z" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l9 4.5v5c0 5.2-3.6 8.9-9 9.5-5.4-.6-9-4.3-9-9.5v-5L12 3Z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 8v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 17h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function MetricCard({ label, value, delta, index, variant }: MetricCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="metric-card"
    >
      <div className="metric-icon" aria-hidden="true">
        <MetricSymbol variant={variant} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{delta}</p>
    </motion.article>
  )
}