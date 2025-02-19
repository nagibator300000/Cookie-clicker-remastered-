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
        if (e.name === 'unlockSlot') {
          ;<Product
            title="unlock slot"
            price={e.cost}
            disabled={e.disabled(count, !isEditing)}
            onClick={() => e.upgrade(startEditing)}
          />
        }
        return (
          <Product
            title={e.name}
            price={e.cost}
            disabled={e.disabled(count)}
            onClick={e.upgrade}
          />
        )
      })}
    </div>
  )
}
