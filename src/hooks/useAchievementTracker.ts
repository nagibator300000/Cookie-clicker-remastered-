import useGameStore from '@/stores/game'
import { useEffect } from 'react'
import achievements from '../../data/achievements'

function useAchievementTracker() {
  useEffect(() => {
    const unsubsdcribe = useGameStore.subscribe((state) => {
      achievements.forEach((achievement) => {
        if (achievement.trigger(state)) {
          if (
            !useGameStore
              .getState()
              .achievements.find((e) => e === achievement.title)
          ) {
            useGameStore.getState().unlockAchievement(achievement.title)
          }
        }
      })
    })
    return () => unsubsdcribe()
  }, [])
}

export default useAchievementTracker
