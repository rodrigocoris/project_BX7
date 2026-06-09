import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Circle,
  CircleDot,
  Download,
  Headphones,
  Layers,
  LayoutGrid,
  Lightbulb,
  Package,
  Search,
  SlidersHorizontal,
  Star,
  Truck,
  Wrench,
} from 'lucide-react'
import {
  catalogBrandFilterOptions,
  catalogCategories,
  catalogCategoryFilterOptions,
  catalogFeaturedBrands,
  catalogFooterStats,
  catalogPopularProducts,
} from '../../data/catalogData'
import { CatalogBrandLogo } from './CatalogBrandLogo'
import '../../styles/catalog.css'

const categoryIcons = {
  disc: CircleDot,
  layers: Layers,
  light: Lightbulb,
  spacer: Circle,
  box: Package,
  wrench: Wrench,
} as const

const footerIcons = {
  package: Package,
  star: Star,
  grid: LayoutGrid,
  truck: Truck,
  headphones: Headphones,
} as const

function formatPriceMXN(amount: number) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount)
}

function CatalogImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(event) => {
        const img = event.currentTarget
        if (img.dataset.fallbackApplied === 'true') return
        img.dataset.fallbackApplied = 'true'
        img.src = '/930.jpg'
      }}
    />
  )
}

export function CatalogView() {
  const [search, setSearch] = useState('')

  const [categoryFilter, setCategoryFilter] = useState<string>(
    catalogCategoryFilterOptions[0]
  )
  
  const [brandFilter, setBrandFilter] = useState<string>(
    catalogBrandFilterOptions[0]
  )

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return catalogPopularProducts

    return catalogPopularProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query),
    )
  }, [search])

  return (
    <section className="catalog-view dashboard-view" id="catalogo">
      <header className="catalog-header">
        <div className="catalog-header__copy">
          <h1 className="catalog-header__title">Catálogo</h1>
          <p className="catalog-header__subtitle">
            Explora nuestro catálogo de productos por categorías, marcas o búsqueda.
          </p>
        </div>
        <button type="button" className="catalog-export-btn">
          <Download size={16} />
          Exportar catálogo
        </button>
      </header>

      <div className="catalog-toolbar">
        <label className="catalog-search">
          <Search size={18} className="catalog-search__icon" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por nombre, SKU, marca o categoría..."
          />
        </label>

        <select
          className="catalog-select"
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value as (typeof catalogCategoryFilterOptions)[number])}
          aria-label="Filtrar por categoría"
        >
          {catalogCategoryFilterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          className="catalog-select"
          value={brandFilter}
          onChange={(event) => setBrandFilter(event.target.value as (typeof catalogBrandFilterOptions)[number])}
          aria-label="Filtrar por marca"
        >
          {catalogBrandFilterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button type="button" className="catalog-filters-btn">
          <SlidersHorizontal size={16} />
          Filtros
        </button>
      </div>

      <section className="catalog-section" aria-labelledby="catalog-categories-title">
        <h2 id="catalog-categories-title" className="catalog-section__title">
          Explorar por categorías
        </h2>

        <div className="catalog-categories-grid">
          {catalogCategories.map((category) => {
            const Icon = categoryIcons[category.icon]

            return (
              <article key={category.id} className="catalog-cat-card">
                <div className="catalog-cat-card__media">
                  <CatalogImage src={category.image} alt={category.name} className="catalog-cat-card__img" />
                </div>
                <div className="catalog-cat-card__body">
                  <div className="catalog-cat-card__label">
                    <Icon size={16} className="catalog-cat-card__icon" strokeWidth={2} />
                    <strong>{category.name}</strong>
                  </div>
                  <p className="catalog-cat-card__desc">{category.description}</p>
                  <span className="catalog-cat-card__count">{category.count}</span>
                  <ArrowRight size={18} className="catalog-cat-card__arrow" aria-hidden="true" />
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="catalog-section" aria-labelledby="catalog-brands-title">
        <div className="catalog-section__head">
          <h2 id="catalog-brands-title" className="catalog-section__title">
            Marcas destacadas
          </h2>
          <button type="button" className="catalog-link-btn">
            Ver todas
          </button>
        </div>

        <div className="catalog-brands-grid">
          {catalogFeaturedBrands.map((brand) => (
            <article key={brand.id} className="catalog-brand-card">
              <CatalogBrandLogo logoType={brand.logoType} name={brand.name} />
              <div className="catalog-brand-card__copy">
                <strong>{brand.name}</strong>
                <span>{brand.category}</span>
                <small>{brand.count}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="catalog-section" aria-labelledby="catalog-products-title">
        <div className="catalog-section__head">
          <h2 id="catalog-products-title" className="catalog-section__title">
            Productos más buscados
          </h2>
          <button type="button" className="catalog-link-btn">
            Ver todas
          </button>
        </div>

        <div className="catalog-products-grid">
          {filteredProducts.map((product) => (
            <article key={product.id} className="catalog-product-card">
              <div className="catalog-product-card__media">
                <CatalogImage src={product.image} alt={product.name} className="catalog-product-card__img" />
              </div>
              <div className="catalog-product-card__body">
                <strong className="catalog-product-card__name">{product.name}</strong>
                <span className="catalog-product-card__meta">
                  {product.category} · SKU: {product.sku}
                </span>
                <p className="catalog-product-card__price">{formatPriceMXN(product.price)}</p>
                <span className="catalog-product-card__stock">Disponibilidad: {product.stock} uds</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="catalog-stats-bar">
        {catalogFooterStats.map((stat) => {
          const Icon = footerIcons[stat.icon]

          return (
            <div key={stat.id} className="catalog-stats-bar__item">
              <span className="catalog-stats-bar__icon" aria-hidden="true">
                <Icon size={18} strokeWidth={2} />
              </span>
              <div>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            </div>
          )
        })}
      </footer>
    </section>
  )
}
