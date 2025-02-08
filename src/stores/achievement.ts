import { StateCreator } from 'zustand'
import { NotificationSlice } from './notification'

export type AchievementSlice = {
  achievements: string[]
  unlockAchievement: (name: string) => void
}

const createAchievementSlice: StateCreator<
  AchievementSlice & NotificationSlice,
  [['zustand/devtools', never]],
  [],
  AchievementSlice
> = (set) => ({
  achievements: [],
  unlockAchievement: (name) => {
    set((state) => {
      state.addNotification(name)
      return {
        achievements: [...state.achievements, name],
      }
    })
  },
})

export default createAchievementSlice
