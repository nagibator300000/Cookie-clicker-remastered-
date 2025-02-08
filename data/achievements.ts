import { GameStats } from '../schemas/gameStats'

type AchievementContent = {
  img: string
  title: string
  description: string
  trigger: (state: GameStats) => boolean
}

const achievements: AchievementContent[] = [
  {
    img: '/Achievements/FirstGeo.png',
    title: 'First one',
    description: 'get first geo',
    trigger: (state) => state.count === 1,
  },
  {
    img: '/Achievements/FirstGeo.png',
    title: 'Another one',
    description: 'get second geo',
    trigger: (state) => state.count === 2,
  },
  {
    img: '/Achievements/FirstGeo.png',
    title: '1',
    description: 'get first geo',
    trigger: () => false,
  },
  {
    img: '/Achievements/FirstGeo.png',
    title: '2',
    description: 'get first geo',
    trigger: () => false,
  },
  {
    img: '/Achievements/FirstGeo.png',
    title: '3',
    description: 'get first geo',
    trigger: () => false,
  },
  {
    img: '/Achievements/FirstGeo.png',
    title: '4',
    description: 'get first geo',
    trigger: () => false,
  },
]

export default achievements
