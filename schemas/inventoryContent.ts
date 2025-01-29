import { z } from 'zod'
import { ItemsTypesSchema } from './itemTypes'

const InventoryContentSchema = z.object({
  type: ItemsTypesSchema,
  col: z.number().optional(),
  row: z.number().optional(),
  id: z.string().or(z.number()),
  durability: z.number().optional(),
})

export default InventoryContentSchema
