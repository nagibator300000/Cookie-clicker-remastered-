import useGameStore from '../../stores/game'
import type { GameStats } from '../../../schemas/gameStats'

type UpgradableStats = Pick<
  GameStats,
  'perClick' | 'periodPoints' | 'periodTime'
>

type Stat = UpgradableStats[keyof UpgradableStats]

class Upgrade {
  name: keyof UpgradableStats
  cost: number
  upgradeMethod: (stat: Stat) => Stat

  constructor(
    name: keyof UpgradableStats,
    cost: number,
    upgradeMethod: (stat: Stat) => Stat
  ) {
    this.name = name
    this.cost = cost
    this.upgradeMethod = upgradeMethod
  }

  upgrade() {
    const stat = useGameStore.getState()[this.name]
    useGameStore.setState({
      count: useGameStore.getState().count - this.cost,
      [this.name]: this.upgradeMethod(stat),
    })
  }

  disabled() {
    return useGameStore.getState().count < this.cost
  }
}

const perClickUpgrade = new Upgrade('perClick', 100, (stat) => stat + 1)

const periodPointsUpgrade = new Upgrade('periodPoints', 200)

const UPGRADES = [perClickUpgrade, periodPointsUpgrade]

export default UPGRADES
