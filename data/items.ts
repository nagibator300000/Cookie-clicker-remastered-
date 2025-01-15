import type { GameStats } from '../schemas/gameStats'

type ClickBuffItems =
  | 'fragile_force'
  | 'quick_slash'
  | 'fury_of_the_fallen'
  | 'soul_eater'
  | 'soul_catcher'

type SpellBuffItems = 'spell_twister' | 'shaman_stone'

export type ItemTypes = ClickBuffItems | SpellBuffItems | 'blocker'

type GeneralInfo = {
  img: string
  info: {
    title: string
    description: string
  }
}

type ClickBuffItem = {
  [T in ClickBuffItems]: {
    onClickBonus: (stats: GameStats) => GameStats
  } & GeneralInfo
}

type SpellBuffItem = {
  [T in SpellBuffItems]: {
    onSpellBonus: (stats: GameStats) => GameStats
  } & GeneralInfo
}

type BlockerInfo = {
  blocker: {
    img: string
  }
}

export type CharmInfo = ClickBuffItem & SpellBuffItem
type ItemInfo = CharmInfo & BlockerInfo

const CONTENT_INFO: ItemInfo = {
  blocker: {
    img: '/Charms/Blocker.png',
  },
  fragile_force: {
    img: '/Charms/Fragile Strength.png',
    info: {
      title:
        'Strengthens the bearer, increasing the damage they deal to enemies with their nail',
      description:
        'This charm is fragile, and will break if its bearer is killed',
    },
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
  quick_slash: {
    img: '/Charms/Quick Slash.png',
    info: {
      title: 'Born from imperfect, discarded nails that have fused together',
      description:
        'The nails still long to be wielded. \
        Allows the bearer to slash much more rapidly with their nail',
    },
    onClickBonus: (stats) => {
      const bonusGeos = Math.floor(stats.perClick * 0.5)
      return {
        ...stats,
        count: stats.count + bonusGeos,
      }
    },
  },
  fury_of_the_fallen: {
    img: '/Charms/Fury of the Fallen.png',
    info: {
      title:
        'Embodies the fury and heroism that comes upon those who are about to die',
      description: "When close to death, the bearer's strength will increase",
    },
    onClickBonus: (stats) => {
      const bonusGeos = Math.floor(stats.perClick * 0.75)
      return {
        ...stats,
        count: stats.count + bonusGeos,
      }
    },
  },
  spell_twister: {
    img: '/Charms/Spell Twister.png',
    info: {
      title:
        "Reflecting the desires of the Soul Sanctum for mastery over SOUL, \
        it improves the bearer's ability to cast spells",
      description: 'Reduces the SOUL cost of casting spells',
    },
    onSpellBonus: (stats) => stats,
  },
  shaman_stone: {
    img: '/Charms/Shaman Stone.png',
    info: {
      title: 'Said to contain the knowledge of past generations of shaman',
      description: 'Increases the power of spells, dealing more damage to foes',
    },
    onSpellBonus: (stats) => stats,
  },
  soul_catcher: {
    img: '/Charms/Soul Catcher.png',
    info: {
      title: 'Used by shamans to draw more SOUL from the world around them',
      description:
        'Increases the amount of SOUL gained when striking an enemy with the nail',
    },
    onClickBonus: (stats) => {
      return {
        ...stats,
        souls: stats.souls + 3,
      }
    },
  },
  soul_eater: {
    img: '/Charms/Soul Eater.png',
    info: {
      title:
        'Forgotten shaman artifact, used to draw SOUL from still-living creatures',
      description:
        'Greatly increases the amount of SOUL gained when striking an enemy with the nail',
    },
    onClickBonus: (stats) => {
      return {
        ...stats,
        souls: stats.souls + 12,
      }
    },
  },
}

export default CONTENT_INFO
