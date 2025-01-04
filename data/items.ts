import type { GameStats } from '../schemas/gameStats'
import type { InventoryContentProps } from '../src/components'

export type ItemTypes =
  | 'blocker'
  | 'fragile_force'
  | 'quick_slash'
  | 'fury_of_the_fallen'
  | 'shaman_stone'
  | 'soul_catcher'
  | 'soul_eater'
  | 'spell_twister'

type GeneralItems = {
  [T in Exclude<ItemTypes, 'blocker'>]: {
    img: string
    info: {
      title: string
      description: string
    }
    bonus: (stats: GameStats) => GameStats
  }
}

interface ItemInfo extends GeneralItems {
  blocker: {
    img: string
  }
}

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
    bonus: (stats) => {
      const bonusGeos = stats.perClick
      const oldItem = stats.inventoryContent.find(
        (item) => item.type === 'fragile_force'
      )

      const newItem: InventoryContentProps = {
        ...oldItem,
        durability: oldItem.durability - 1,
      }

      return {
        ...stats,
        count: stats.count + bonusGeos,
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
  },
  fury_of_the_fallen: {
    img: '/Charms/Fury of the Fallen.png',
    info: {
      title:
        'Embodies the fury and heroism that comes upon those who are about to die',
      description: "When close to death, the bearer's strength will increase",
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
  },
  shaman_stone: {
    img: '/Charms/Shaman Stone.png',
    info: {
      title: 'Said to contain the knowledge of past generations of shaman',
      description: 'Increases the power of spells, dealing more damage to foes',
    },
  },
  soul_catcher: {
    img: '/Charms/Soul Catcher.png',
    info: {
      title: 'Used by shamans to draw more SOUL from the world around them',
      description:
        'Increases the amount of SOUL gained when striking an enemy with the nail',
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
  },
}

export default CONTENT_INFO
