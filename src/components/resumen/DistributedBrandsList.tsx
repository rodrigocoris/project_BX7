import { distributedBrands } from '../../data/distributedBrands'
import { BrandMark } from './DistributedBrandMarks'

export function DistributedBrandsList() {
  return (
    <ul className="distributed-brands-list">
      {distributedBrands.map((brand) => (
        <li key={brand.id} className="distributed-brands-list__item">
          <BrandMark id={brand.id} />
          <span className="distributed-brands-list__name">{brand.name}</span>
        </li>
      ))}
    </ul>
  )
}
