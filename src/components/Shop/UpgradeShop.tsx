import Product from './Product'
import useGameStore from '../../stores/game'
import UPGRADES from './data'

export default function UpgradeShop() {
  const count = useGameStore((state) => state.count)
  const isEditing = useGameStore((state) => state.isEditing)
  const startEditing = useGameStore((state) => state.startEditing)
  return (
    <div className="upgrades_shop">
      {UPGRADES.map((e) => {
        return e.name === 'unlockSlot' ? (
          <Product
            title={e.name}
            price={e.cost}
            disabled={e.disabled(count, !isEditing)}
            onClick={() => e.upgrade(startEditing)}
            key={e.name}
          />
        ) : (
          <Product
            title={e.name}
            price={e.cost}
            disabled={e.disabled(count)}
            onClick={() => e.upgrade()}
            key={e.name}
          />
        )
      })}
    </div>
  )
}
