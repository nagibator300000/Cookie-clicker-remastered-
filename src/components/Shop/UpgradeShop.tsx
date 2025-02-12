import Product from './Product'
import useGameStore from '../../stores/game'

export default function UpgradeShop({}) {
  const count = useGameStore((stats) => stats.count)
  const upgradePerClick = useGameStore((stats) => stats.upgradePerClick)
  const upgradePeriodTime = useGameStore((stats) => stats.upgradePeriodTime)
  const upgradePeriodPoints = useGameStore((stats) => stats.upgradePeriodPoints)
  const unlockSlot = useGameStore((stats) => stats.unlockSlot)
  const isEditing = useGameStore((state) => state.isEditing)
  const startEditing = useGameStore((state) => state.startEditing)
  return (
    <div className="upgrades_shop">
      <button
        className="product"
        disabled={count < 10}
        onClick={() => {
          upgradePerClick(10)
        }}
      >
        <div className="name">per click</div>
        <div className="price">10</div>
      </button>
      <Product
        disabled={count < 100}
        onClick={() => {
          upgradePeriodTime(100)
        }}
        title="period time"
        price={100}
      />
      <button
        className="product"
        disabled={count < 50}
        onClick={() => {
          upgradePeriodPoints(50)
        }}
      >
        <div className="name">period points</div>
        <div className="price">50</div>
      </button>
      <button
        className="product"
        disabled={count < 50 || isEditing}
        onClick={() => {
          unlockSlot(50)
          startEditing()
        }}
      >
        <div className="name">unlock slot</div>
        <div className="price">50</div>
      </button>
    </div>
  )
}
