import { ownBrands } from '../../data/ownBrands'
import { Bx7WheelsMark, FuturasMarcasMark, TeixMark } from './OwnBrandMarks'

const brandMarks = {
  'bx7-wheels': Bx7WheelsMark,
  teix: TeixMark,
  futuras: FuturasMarcasMark,
} as const

export function OwnBrandsList() {
  return (
    <ul className="own-brands-list">
      {ownBrands.map((brand) => {
        const Mark = brandMarks[brand.id as keyof typeof brandMarks]

        return (
          <li key={brand.id} className="own-brands-list__item">
            <Mark />
            <div className="own-brands-list__copy">
              <strong>{brand.name}</strong>
              <span>{brand.description}</span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
