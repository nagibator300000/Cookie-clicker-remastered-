import type { StateCreator } from 'zustand'
import { GameStatsSlice } from './gameStats'
import { UniqueIdentifier } from '@dnd-kit/core'
import type { EffectsSlice } from './effects'
import { InventorySlice } from './inventory'
import defaultStats from '../../data/defaultStats'

type Coordinates = {
  x: number
  y: number
}

export interface SpellFxData {
  start: Coordinates
  finish: Coordinates
  key: UniqueIdentifier
  type: 'spell'
}

export interface SoulSlice {
  souls: number
  spell: (data: Omit<SpellFxData, 'key' | 'type'>) => void
  removeSpell: (key: UniqueIdentifier) => void
}

const SoulSlice: StateCreator<
  SoulSlice & GameStatsSlice & EffectsSlice & InventorySlice,
  [['zustand/devtools', never]],
  [],
  SoulSlice
> = (set) => ({
  souls: defaultStats.souls,
  spell: (data) =>
    set(
      (state) => {
        state.addFX({ ...data, type: 'spell' })
        return {
          souls: state.souls - (state.findCharm('spell_twister') ? 25 : 33),
        }
      },
      undefined,
      'soul:game/spell'
    ),
  removeSpell: (key) => {
    set(
      (state) => {
        state.removeFX(key)
        return {
          count: state.count + (state.findCharm('shaman_stone') ? 20 : 15),
        }
      },
      undefined,
      'soul:game/removeSpell'
    )
  },
})

export default SoulSlice
