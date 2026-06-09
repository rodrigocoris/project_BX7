import { motion } from 'framer-motion'
import { Building2, Star, Truck } from 'lucide-react'
import { distributedBrands } from '../../data/distributedBrands'
import { ownBrands } from '../../data/ownBrands'
import { BrandMark } from '../resumen/DistributedBrandMarks'
import { Bx7WheelsMark, FuturasMarcasMark, TeixMark } from '../resumen/OwnBrandMarks'
import '../../styles/empresas.css'

const ownBrandMarks = {
  'bx7-wheels': Bx7WheelsMark,
  teix: TeixMark,
  futuras: FuturasMarcasMark,
} as const

type EmpresasViewProps = {
  variant?: 'empresas' | 'marcas'
}

export function EmpresasView({ variant = 'empresas' }: EmpresasViewProps) {
  const isMarcas = variant === 'marcas'
  const ownCount = ownBrands.length
  const distributedCount = distributedBrands.length
  const totalCount = ownCount + distributedCount

  return (
    <section className="empresas-view dashboard-view" id={isMarcas ? 'teix' : 'bx7group'}>
      <header className="empresas-header">
        <div className="empresas-header__copy">
          <p className="eyebrow">BX7 Group</p>
          <h1 className="empresas-header__title">{isMarcas ? 'Marcas' : 'Empresas y marcas'}</h1>
          <p className="empresas-header__subtitle">
            {isMarcas
              ? 'Consulta todas las marcas propias del grupo y las marcas distribuidas disponibles en BX7.'
              : 'Portafolio completo de marcas propias del grupo y marcas distribuidas en el catálogo BX7.'}
          </p>
        </div>
      </header>

      <div className="empresas-stats">
        <motion.article
          className="empresas-stat"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <span className="empresas-stat__icon empresas-stat__icon--own" aria-hidden="true">
            <Building2 size={20} />
          </span>
          <div className="empresas-stat__copy">
            <strong>{ownCount}</strong>
            <span>Marcas propias</span>
          </div>
        </motion.article>

        <motion.article
          className="empresas-stat"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <span className="empresas-stat__icon empresas-stat__icon--distributed" aria-hidden="true">
            <Truck size={20} />
          </span>
          <div className="empresas-stat__copy">
            <strong>{distributedCount}</strong>
            <span>Marcas distribuidas</span>
          </div>
        </motion.article>

        <motion.article
          className="empresas-stat"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <span className="empresas-stat__icon empresas-stat__icon--total" aria-hidden="true">
            <Star size={20} />
          </span>
          <div className="empresas-stat__copy">
            <strong>{totalCount}</strong>
            <span>Total en portafolio</span>
          </div>
        </motion.article>
      </div>

      <motion.section
        className="empresas-section panel"
        aria-labelledby="empresas-own-title"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="empresas-section__head">
          <div>
            <p className="eyebrow">Grupo BX7</p>
            <h2 id="empresas-own-title">Marcas propias</h2>
          </div>
          <span className="empresas-section__count">{ownCount} empresas</span>
        </div>

        <ul className="empresas-brands-grid">
          {ownBrands.map((brand, index) => {
            const Mark = ownBrandMarks[brand.id as keyof typeof ownBrandMarks]

            return (
              <motion.li
                key={brand.id}
                className="empresas-brand-card"
                id={brand.id === 'teix' ? 'teix' : brand.id === 'bx7-wheels' ? 'bx7-wheels' : undefined}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <div className="empresas-brand-card__logo">
                  <Mark />
                </div>
                <div className="empresas-brand-card__copy">
                  <strong>{brand.name}</strong>
                  <span>{brand.description}</span>
                  {'isPlaceholder' in brand && brand.isPlaceholder ? (
                    <small>Próximo lanzamiento</small>
                  ) : (
                    <small>Marca del grupo BX7</small>
                  )}
                </div>
              </motion.li>
            )
          })}
        </ul>
      </motion.section>

      <motion.section
        className="empresas-section panel"
        aria-labelledby="empresas-distributed-title"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
      >
        <div className="empresas-section__head">
          <div>
            <p className="eyebrow">Distribución</p>
            <h2 id="empresas-distributed-title">Marcas distribuidas</h2>
          </div>
          <span className="empresas-section__count">{distributedCount} marcas</span>
        </div>

        <ul className="empresas-brands-grid empresas-brands-grid--distributed">
          {distributedBrands.map((brand, index) => (
            <motion.li
              key={brand.id}
              className="empresas-brand-card"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
            >
              <div className="empresas-brand-card__logo empresas-brand-card__logo--distributed">
                <BrandMark id={brand.id} />
              </div>
              <div className="empresas-brand-card__copy">
                <strong>{brand.name}</strong>
                <span>Marca distribuida</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.section>
    </section>
  )
}
