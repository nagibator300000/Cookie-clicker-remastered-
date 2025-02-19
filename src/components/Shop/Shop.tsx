import { useState } from 'react'
import './Shop.css'
import clsx from 'clsx'
import { InventoryContent } from '..'
import UpgradeShop from './UpgradeShop'

export default function Shop() {
  const [isSwitched, setIsSwitched] = useState(false)

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
      <UpgradeShop />
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
