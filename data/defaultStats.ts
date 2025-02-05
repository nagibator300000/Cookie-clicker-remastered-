import { GameStats } from '../schemas/gameStats'

const defaultStats: GameStats = {
  count: 0,
  perClick: 1,
  periodPoints: 0,
  periodTime: 5,
  souls: 0,
  inventoryContent: [
    { type: 'blocker', row: 1, col: 1, id: 1 },
    { type: 'blocker', row: 1, col: 2, id: 2 },
    { type: 'blocker', row: 1, col: 3, id: 3 },
    { type: 'blocker', row: 1, col: 4, id: 4 },
    { type: 'blocker', row: 1, col: 5, id: 5 },
    { type: 'blocker', row: 2, col: 1, id: 6 },
    { type: 'blocker', row: 2, col: 2, id: 7 },
    { type: 'blocker', row: 2, col: 3, id: 8 },
    { type: 'blocker', row: 2, col: 4, id: 9 },
    { type: 'blocker', row: 2, col: 5, id: 10 },
    { type: 'blocker', row: 3, col: 1, id: 11 },
    { type: 'blocker', row: 3, col: 2, id: 12 },
    { type: 'blocker', row: 3, col: 3, id: 13 },
    { type: 'blocker', row: 3, col: 4, id: 14 },
    { type: 'blocker', row: 3, col: 5, id: 15 },
    { type: 'blocker', row: 4, col: 1, id: 16 },
    { type: 'blocker', row: 4, col: 2, id: 17 },
    { type: 'blocker', row: 4, col: 3, id: 18 },
    { type: 'blocker', row: 4, col: 4, id: 19 },
    { type: 'blocker', row: 4, col: 5, id: 20 },
    { type: 'blocker', row: 5, col: 1, id: 21 },
    { type: 'blocker', row: 5, col: 2, id: 22 },
    { type: 'blocker', row: 5, col: 3, id: 23 },
    { type: 'blocker', row: 5, col: 4, id: 24 },
    { type: 'blocker', row: 5, col: 5, id: 25 },
  ],
  achievements: [
    { name: '1', status: true },
    { name: '2', status: false },
    { name: '3', status: true },
  ],
}

export default defaultStats
