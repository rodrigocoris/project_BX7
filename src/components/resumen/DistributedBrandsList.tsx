import { distributedBrands } from '../../data/distributedBrands'
import {
  DobinsonsMark,
  EibachMark,
  FoxMark,
  KcHilitesMark,
  MethodMark,
  VossenMark,
} from './DistributedBrandMarks'

const brandMarks = {
  fox: FoxMark,
  dobinsons: DobinsonsMark,
  'kc-hilites': KcHilitesMark,
  eibach: EibachMark,
  method: MethodMark,
  vossen: VossenMark,
} as const

export function DistributedBrandsList() {
  return (
    <ul className="distributed-brands-list">
      {distributedBrands.map((brand) => {
        const Mark = brandMarks[brand.id]

        return (
          <li key={brand.id} className="distributed-brands-list__item">
            <Mark />
            <span className="distributed-brands-list__name">{brand.name}</span>
          </li>
        )
      })}
    </ul>
  )
}
