import '../../styles/resumen.css'
import { ResumenDashboard } from './ResumenDashboard'
import { ResumenSubNav } from './ResumenSubNav'

type ResumenViewProps = {
  onSectionNavigate?: (section: string) => void
}

export function ResumenView({ onSectionNavigate }: ResumenViewProps) {
  return (
    <section className="resumen-view dashboard-view" id="resumen">
      <ResumenSubNav onNavigate={onSectionNavigate} />
      <ResumenDashboard />
    </section>
  )
}
