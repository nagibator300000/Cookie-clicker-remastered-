import useGameStore from '../../stores/game'
import type { GameStats } from '../../../schemas/gameStats'

type UpgradableStats = 'perClick' | 'periodPoints' | 'periodTime' | 'unlockSlot'

class Upgrade {
  name: UpgradableStats
  cost: number
  upgradeMethod?: (stat: number) => number

  constructor(
    name: UpgradableStats,
    cost: number,
    upgradeMethod?: (stat: number) => number
  ) {
    this.name = name
    this.cost = cost
    this.upgradeMethod = upgradeMethod
  }

  upgrade = (additonal?: () => void) => {
    const newState: Partial<GameStats> = {
      count: useGameStore.getState().count - this.cost,
    }
    if (this.upgradeMethod) {
      const stat = useGameStore.getState()[this.name]
      if (typeof stat === 'number' && this.name !== 'unlockSlot')
        newState[this.name] = this.upgradeMethod(stat)
    }
    useGameStore.setState(newState)
    if (additonal) additonal()
  }

  disabled(count: number, additonal?: boolean) {
    const isEnough = count < this.cost
    if (additonal === undefined) {
      return isEnough
    } else {
      return isEnough && additonal
    }
  }
}

const perClickUpgrade = new Upgrade('perClick', 10, (stat) => stat + 1)

const periodPointsUpgrade = new Upgrade('periodPoints', 50, (stat) => stat + 1)
const periodTimeUpgrade = new Upgrade('periodTime', 100, (stat) => stat + 0.1)
const unlockSlot = new Upgrade('unlockSlot', 50)

const UPGRADES = [
  perClickUpgrade,
  periodPointsUpgrade,
  periodTimeUpgrade,
  unlockSlot,
]

export default UPGRADES
