import { StateCreator } from 'zustand'
import { Achievement } from '../../schemas/achievement'
import { NotificationSlice } from './notification'

export type AchievementSlice = {
  achievements: Achievement[]
  unlockAchievement: (name: string) => void
}

const createAchievementSlice: StateCreator<
  AchievementSlice & NotificationSlice,
  [['zustand/devtools', never]],
  [],
  AchievementSlice
> = (set) => ({
  achievements: [
    { name: '1', status: true },
    { name: '2', status: false },
    { name: '3', status: true },
  ],
  unlockAchievement: (name) => {
    set((state) => {
      const newAchievements = state.achievements
      newAchievements[
        newAchievements.findIndex((e) => e.name === name)
      ].status = true
      return {
        achievements: newAchievements,
      }
    })
  },
})

export default createAchievementSlice
