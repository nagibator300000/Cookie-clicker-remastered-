import type { GameStats } from '../schemas/gameStats'
import type {
  CharmsTypes,
  ClickBuffCharms,
  ItemTypes,
  SpellBuffCharms,
} from '../schemas/itemTypes'

type GeneralInfo = {
  durability?: number
  img: string
  info: {
    title: string
    description: string
  }
  price?: number
}

type ClickBuffItem = {
  name: ClickBuffCharms
  onClickBonus: (stats: GameStats) => GameStats
} & GeneralInfo

type SpellBuffItem = {
  name: SpellBuffCharms
  onSpellBonus: (stats: GameStats) => GameStats
} & GeneralInfo

type BlockerInfo = {
  name: 'blocker'
  img: string
}

export type CharmInfo = ClickBuffItem | SpellBuffItem
type ItemInfo = CharmInfo | BlockerInfo

const CONTENT_INFO: ItemInfo[] = [
  {
    name: 'blocker',
    img: '/Charms/Blocker.png',
  },
  {
    name: 'fragile_force',
    img: '/Charms/Fragile Strength.png',
    info: {
      title:
        'Strengthens the bearer, increasing the damage they deal to enemies with their nail',
      description:
        'This charm is fragile, and will break if its bearer is killed',
    },
    price: 10,
    durability: 3,
    onClickBonus: (stats) => {
      const bonusGeos = stats.perClick
      const oldItem = stats.inventoryContent.find(
        (item) => item.type === 'fragile_force'
      )

      if (!oldItem || !oldItem.durability) return stats

      const newItem = {
        ...oldItem,
        durability: oldItem.durability - 1,
      }
      const newInventory = stats.inventoryContent.filter(
        (e) => e.id !== oldItem.id
      )
      if (newItem.durability > 0) {
        newInventory.push(newItem)
      }

      return {
        ...stats,
        count: stats.count + bonusGeos,
        inventoryContent: newInventory,
      }
    },
  },
  {
    name: 'quick_slash',
    img: '/Charms/Quick Slash.png',
    info: {
      title: 'Born from imperfect, discarded nails that have fused together',
      description:
        'The nails still long to be wielded. \
        Allows the bearer to slash much more rapidly with their nail',
    },
    price: 10,
    onClickBonus: (stats) => {
      const bonusGeos = Math.floor(stats.perClick * 0.5)
      return {
        ...stats,
        count: stats.count + bonusGeos,
      }
    },
  },
  {
    name: 'fury_of_the_fallen',
    img: '/Charms/Fury of the Fallen.png',
    info: {
      title:
        'Embodies the fury and heroism that comes upon those who are about to die',
      description: "When close to death, the bearer's strength will increase",
    },
    price: 10,
    onClickBonus: (stats) => {
      const bonusGeos = Math.floor(stats.perClick * 0.75)
      return {
        ...stats,
        count: stats.count + bonusGeos,
      }
    },
  },
  {
    name: 'spell_twister',
    img: '/Charms/Spell Twister.png',
    info: {
      title:
        "Reflecting the desires of the Soul Sanctum for mastery over SOUL, \
        it improves the bearer's ability to cast spells",
      description: 'Reduces the SOUL cost of casting spells',
    },
    price: 10,
    onSpellBonus: (stats) => stats,
  },
  {
    name: 'shaman_stone',
    img: '/Charms/Shaman Stone.png',
    info: {
      title: 'Said to contain the knowledge of past generations of shaman',
      description: 'Increases the power of spells, dealing more damage to foes',
    },
    price: 10,
    onSpellBonus: (stats) => stats,
  },
  {
    name: 'soul_catcher',
    img: '/Charms/Soul Catcher.png',
    info: {
      title: 'Used by shamans to draw more SOUL from the world around them',
      description:
        'Increases the amount of SOUL gained when striking an enemy with the nail',
    },
    price: 10,
    onClickBonus: (stats) => {
      return {
        ...stats,
        souls: stats.souls + 3,
      }
    },
  },
  {
    name: 'soul_eater',
    img: '/Charms/Soul Eater.png',
    info: {
      title:
        'Forgotten shaman artifact, used to draw SOUL from still-living creatures',
      description:
        'Greatly increases the amount of SOUL gained when striking an enemy with the nail',
    },
    price: 10,
    onClickBonus: (stats) => {
      return {
        ...stats,
        souls: stats.souls + 12,
      }
    },
  },
]

export function getCharm(type: SpellBuffCharms): SpellBuffItem
export function getCharm(type: ClickBuffCharms): ClickBuffItem
export function getCharm(type: 'blocker'): BlockerInfo
export function getCharm(type: CharmsTypes): CharmInfo
export function getCharm(type: ItemTypes): ItemInfo {
  const item = CONTENT_INFO.find((el) => el.name === type)
  if (!item) {
    throw new Error('Something is wrong with items.ts')
  }
  return item
}

export default CONTENT_INFO
