import useGameStore from '../../stores/game'

class Upgrade {
  name: string
  cost: number

  constructor(name: string, cost: number) {
    this.name = name
    this.cost = cost
  }

  upgrade() {
    useGameStore.setState({
      count: useGameStore.getState().count - this.cost,
      [this.name]: this.upgrade,
    })
  }

  upgradeMethod() {
    return
  }

  disabled() {
    return useGameStore.getState().count < this.cost
  }
}

const perClickUpgrade = new Upgrade('perClick', 100)

const periodPointsUpgrade = new Upgrade('periodPoints', 200)

const UPGRADES = [perClickUpgrade, periodPointsUpgrade]

export default UPGRADES
