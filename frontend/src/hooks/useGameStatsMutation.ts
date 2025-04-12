import { useMutation } from '@tanstack/react-query';
import type { GameStats } from '@schemas/gameStats';
import fetchJSON from '../utils/fetchJSON';
import GameStatsSchema from '@schemas/gameStats';

const BACK_URL = import.meta.env.VITE_BACK_URL;

const POST_URL = `${BACK_URL}/gamedata`;

async function postGameStats(stats: GameStats) {
  const data = await fetchJSON(POST_URL, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(stats),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return GameStatsSchema.parse(data);
}

export default function useGameStatsMutation() {
  return useMutation({ mutationFn: postGameStats });
}
