import { useState } from 'react'
import './Shop.css'
import clsx from 'clsx'
import { InventoryContent } from '..'
import useGameStore from '../../stores/game'

export default function Shop() {
  const [isSwitched, setIsSwitched] = useState(false)
  const count = useGameStore((stats) => stats.count)
  const upgradePerClick = useGameStore((stats) => stats.upgradePerClick)
  const upgradePeriodTime = useGameStore((stats) => stats.upgradePeriodTime)
  const upgradePeriodPoints = useGameStore((stats) => stats.upgradePeriodPoints)
  const unlockSlot = useGameStore((stats) => stats.unlockSlot)
  const isEditing = useGameStore((state) => state.isEditing)
  const startEditing = useGameStore((state) => state.startEditing)
  const addNotification = useGameStore((state) => state.addNotification)
  return (
    <div className="shop">
      <button
        className="switch_shop"
        onClick={() => setIsSwitched(!isSwitched)}
      >
        <img
          src="/switch button.png"
          alt=""
          className={clsx('switch_img', isSwitched && 'switched')}
        />
      </button>
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
        <button
          className="product"
          disabled={count < 100}
          onClick={() => {
            upgradePeriodTime(100)
          }}
        >
          <div className="name">period time</div>
          <div className="price">100</div>
        </button>
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
            addNotification({
              type: 'info',
              content: 'click on the blocker to delete it',
            })
          }}
        >
          <div className="name">unlock slot</div>
          <div className="price">50</div>
        </button>
      </div>
      <div className={clsx('charms_shop', isSwitched && 'active')}>
        <div className="row">
          <InventoryContent
            id={'fury_of_the_fallen'}
            type="fury_of_the_fallen"
          />
          <InventoryContent id={'quick_slash'} type="quick_slash" />
          <InventoryContent
            id={'fragile_force'}
            type="fragile_force"
            durability={3}
          />
          <InventoryContent id={'shaman_stone'} type="shaman_stone" />
          <InventoryContent id={'soul_catcher'} type="soul_catcher" />
          <InventoryContent id={'soul_eater'} type="soul_eater" />
          <InventoryContent id={'spell_twister'} type="spell_twister" />
        </div>
      </div>
    </div>
  )
}
