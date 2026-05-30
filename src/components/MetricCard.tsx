import { motion } from 'framer-motion'

type MetricCardProps = {
  label: string
  value: string
  delta: string
  index: number
}

export function MetricCard({ label, value, delta, index }: MetricCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="metric-card"
    >
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{delta}</p>
    </motion.article>
  )
}