import { GameStats } from '../../schemas/gameStats'
import type { StateCreator } from 'zustand'
import { SoulSlice } from './soul'
import { EffectsSlice, HitFxData } from './effects'
import { InventorySlice } from './inventory'
import defaultStats from '../../data/defaultStats'
import { NotificationSlice } from './notification'
import CONTENT_INFO from '../../data/items'
import { ClickBuffCharmsSchema } from '../../schemas/itemTypes'

export interface GameStatsSlice
  extends Omit<GameStats, 'souls' | 'inventoryContent'> {
  click: (data: Omit<HitFxData, 'key' | 'type'>) => void
  autoClick: () => void
  reset: () => void
  upgradePerClick: (cost: number) => void
  upgradePeriodPoints: (cost: number) => void
  upgradePeriodTime: (cost: number) => void
  unlock: (cost: number) => void
  init: (stats: GameStats) => void
}

const createGameStatsSlice: StateCreator<
  GameStatsSlice &
    SoulSlice &
    EffectsSlice &
    InventorySlice &
    NotificationSlice,
  [['zustand/devtools', never]],
  [],
  GameStatsSlice
> = (set) => ({
  ...defaultStats,
  click: (data) => {
    set((state) => {
      state.addFX({ ...data, type: 'hit' })
      let newState: GameStats = state
      state.inventoryContent.forEach((current) => {
        const res = ClickBuffCharmsSchema.safeParse(current.type)
        if (res.success) {
          const type = res.data
          const info = CONTENT_INFO[type]
          newState = info.onClickBonus(newState)
        }
      })
      return {
        ...newState,
        souls: newState.souls + 3,
        count: newState.count + state.perClick,
      }
    })
  },
  autoClick: () => {
    set((state) => ({
      count: state.count + state.periodPoints,
    }))
  },
  reset: () => {
    set(() => defaultStats)
  },
  upgradePerClick: (cost) => {
    set((state) => ({
      count: state.count - cost,
      perClick: state.perClick + 1,
    }))
  },
  upgradePeriodPoints: (cost) => {
    set((state) => ({
      count: state.count - cost,
      periodPoints: state.periodPoints + 1,
    }))
  },
  upgradePeriodTime: (cost) => {
    set((state) => ({
      count: state.count - cost,
      periodPoints: state.periodTime + 0.1,
    }))
  },
  unlock: (cost) => {
    set((state) => ({ count: state.count - cost }))
  },
  init: (stats) => {
    set(() => stats)
  },
})

export default createGameStatsSlice
