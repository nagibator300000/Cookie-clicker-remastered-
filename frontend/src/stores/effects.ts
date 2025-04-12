import { StateCreator } from 'zustand'
import { SpellFxData } from './soul'
import { UniqueIdentifier } from '@dnd-kit/core'

export type HitFxData = {
    coordinates: { x: number; y: number }
    key: UniqueIdentifier
    type: 'hit'
}

type Effect = SpellFxData | HitFxData

type FXProps = Omit<SpellFxData, 'key'> | Omit<HitFxData, 'key'>

export type EffectsSlice = {
    effects: Effect[]
    addFX: (data: FXProps) => void
    removeFX: (key: UniqueIdentifier) => void
}

const createEffectsSlice: StateCreator<
    EffectsSlice,
    [['zustand/devtools', never]],
    [],
    EffectsSlice
> = (set) => ({
    effects: [],
    addFX: (data) => {
        set((state) => ({
            effects: [...state.effects, { ...data, key: Date.now() }],
        })),
            undefined,
            'effects:game/addFX'
    },
    removeFX: (key) => {
        set((state) => ({
            effects: state.effects.filter((e) => e.key !== key),
        }))
    },
})

export default createEffectsSlice
