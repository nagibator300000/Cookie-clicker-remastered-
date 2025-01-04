import { z } from 'zod'

const InventoryContentSchema = z.object({
  type: z.enum([
    'blocker',
    'fragile_force',
    'quick_slash',
    'fury_of_the_fallen',
    'shaman_stone',
    'soul_catcher',
    'soul_eater',
    'spell_twister',
  ]),
  col: z.number().optional(),
  row: z.number().optional(),
  id: z.string().or(z.number()),
  durability: z.number().optional(),
})

export default InventoryContentSchema
