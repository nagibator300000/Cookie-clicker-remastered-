import { useState } from 'react'
import './Shop.css'
import clsx from 'clsx'
import UpgradeShop from './UpgradeShop'
import CharmsShop from './CharmsShop'

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
      <CharmsShop isActive={isSwitched} />
    </div>
  )
}
