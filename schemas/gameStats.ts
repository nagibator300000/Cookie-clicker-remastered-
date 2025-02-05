import { z } from 'zod'
import InventoryContentSchema from './inventoryContent'
import AchievementSchema from './achievement'

const GameStatsSchema = z.object({
  count: z.number(),
  perClick: z.number(),
  periodPoints: z.number(),
  periodTime: z.number(),
  inventoryContent: InventoryContentSchema.array(),
  souls: z.number(),
  achievements: AchievementSchema.array(),
})

export type GameStats = z.infer<typeof GameStatsSchema>

export default GameStatsSchema
