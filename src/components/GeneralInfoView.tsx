import { motion } from 'framer-motion'
import { Building2, ShieldCheck, BarChart3 } from 'lucide-react'
import type { SessionUser } from '../types'

type GeneralInfoViewProps = {
  user: SessionUser
}

export function GeneralInfoView({ user }: GeneralInfoViewProps) {
  return (
    <section className="dashboard-view" id="resumen" aria-labelledby="general-info-title">
      <motion.article
        className="panel general-info-panel"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="panel-head">
          <div>
            <p className="eyebrow">BX7 ERP</p>
            <h2 id="general-info-title">Información general</h2>
          </div>
          <Building2 size={18} />
        </div>

        <p className="panel-copy general-info-lead">
          Bienvenido a BX7 ERP, el panel central para la operación diaria de SP Accesorios y las marcas del grupo BX7.
        </p>

        <div className="general-info-body">
          <p>
            Desde este sistema puedes consultar el estado general del negocio, coordinar inventario, pedidos, proveedores
            y catálogo de productos — incluyendo rines y soluciones off-road — sin salir de una misma interfaz.
          </p>
          <p>
            Utiliza el menú lateral para acceder a cada módulo: catálogo, empresas, marcas, proveedores, inventario,
            ventas, clientes, predicciones y reportes. Cada opción carga su contenido aquí mismo, en esta ventana.
          </p>
          <p>
            La sección <strong>Resumen</strong> está pensada como punto de partida: aquí encontrarás únicamente esta
            información general sobre la plataforma y cómo orientarte dentro del ERP.
          </p>
        </div>

        <div className="quick-stats">
          <div>
            <ShieldCheck size={16} />
            Sesión: {user.name} · {user.role}
          </div>
          <div>
            <BarChart3 size={16} />
            Módulos operativos BX7 disponibles
          </div>
        </div>
      </motion.article>
    </section>
  )
}
