import { create } from 'zustand'
import createGameStatsSlice, { GameStatsSlice } from './gameStats'
import createInventorySlice, { InventorySlice } from './inventory'
import createSoulSlice, { SoulSlice } from './soul'
import createEffectsSlice, { EffectsSlice } from './effects'
import { devtools } from 'zustand/middleware'
import createNotificationSlice, { NotificationSlice } from './notification'

const useGameStore = create<
    InventorySlice &
        GameStatsSlice &
        SoulSlice &
        EffectsSlice &
        NotificationSlice
>()(
    devtools((...state) => ({
        ...createGameStatsSlice(...state),
        ...createInventorySlice(...state),
        ...createSoulSlice(...state),
        ...createEffectsSlice(...state),
        ...createNotificationSlice(...state),
    }))
)

export default useGameStore
export type { SpellFxData } from './soul'
