import { GameStats } from '../../schemas/gameStats'
import type { StateCreator } from 'zustand'
import { SoulSlice } from './soul'
import { EffectsSlice, HitFxData } from './effects'
import { InventorySlice } from './inventory'
import defaultStats from '../../defaultStats'

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
    GameStatsSlice & SoulSlice & EffectsSlice & InventorySlice,
    [['zustand/devtools', never]],
    [],
    GameStatsSlice
> = (set) => ({
    ...defaultStats,
    click: (data) => {
        set((state) => {
            state.addFX({ ...data, type: 'hit' })
            let soulsPerClick = 3

            if (state.findCharm('soul_catcher')) soulsPerClick += 3
            if (state.findCharm('soul_eater')) soulsPerClick += 12

            let modifier = 1

            if (state.findCharm('quick_slash')) {
                modifier += 0.5
                soulsPerClick *= 1.5
            }
            if (state.findCharm('fury_of_the_fallen')) modifier += 0.75
            const oldFragileForce = state.inventoryContent.find(
                (e) => e.type === 'fragile_force'
            )
            let newInventory = state.inventoryContent
            if (oldFragileForce && oldFragileForce.durability) {
                modifier += 1
                let newFragileForce = {
                    ...oldFragileForce,
                    durability: oldFragileForce.durability - 1,
                }
                newInventory = newInventory.filter(
                    (e) => e.id !== oldFragileForce.id
                )
                if (newFragileForce.durability > 0)
                    newInventory = [...newInventory, newFragileForce]
            }

            state.addSouls(soulsPerClick)
            return {
                count: state.count + Math.floor(state.perClick * modifier),
                inventoryContent: newInventory,
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
