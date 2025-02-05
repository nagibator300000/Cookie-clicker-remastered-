import { z } from 'zod'

const AchievementSchema = z.object({
  name: z.string(),
  status: z.boolean(),
})

export type Achievement = z.infer<typeof AchievementSchema>

export default AchievementSchema
