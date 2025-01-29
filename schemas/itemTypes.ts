import { z } from 'zod'

const clickBuffCharms = [
  'fragile_force',
  'quick_slash',
  'fury_of_the_fallen',
  'soul_catcher',
  'soul_eater',
] as const

const spellBuffCharms = ['shaman_stone', 'spell_twister'] as const

const allCharms = [...clickBuffCharms, ...spellBuffCharms] as const

const allItems = [...allCharms, 'blocker'] as const

export const ClickBuffCharmsSchema = z.enum(clickBuffCharms)

export const SpellBuffCharmsSchema = z.enum(spellBuffCharms)

export const CharmsTypesSchema = z.enum(allCharms)

export const ItemsTypesSchema = z.enum(allItems)

export type ClickBuffCharms = z.infer<typeof ClickBuffCharmsSchema>

export type SpellBuffCharms = z.infer<typeof SpellBuffCharmsSchema>

export type CharmsTypes = z.infer<typeof CharmsTypesSchema>

export type ItemTypes = z.infer<typeof ItemsTypesSchema>
