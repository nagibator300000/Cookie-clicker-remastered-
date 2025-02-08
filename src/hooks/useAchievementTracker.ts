import useGameStore from '@/stores/game'
import { useEffect } from 'react'
import achievements from '../../data/achievements'

function useAchievementTracker() {
  useEffect(() => {
    const unsubscribe = useGameStore.subscribe((state) => {
      achievements.forEach((achievement) => {
        if (!state.achievements.includes(achievement.title)) {
          if (achievement.trigger(state)) {
            state.unlockAchievement(achievement.title)
            state.addNotification(achievement.title)
          }
        }
      })
    })
    return () => unsubscribe()
  }, [])
}

export default useAchievementTracker
