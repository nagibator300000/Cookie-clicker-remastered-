import { useEffect } from "react";
import useGameStatsMutation from "./useGameStatsMutation";
import useGameStatsQuery from "./useGameStatsQuery";
import useInterval from "./useInterval";
import { useGameStatsStore } from "../stores/gameStats";

export default function useGameStats() {
  const post = useGameStatsMutation();
  const get = useGameStatsQuery();
  const init = useGameStatsStore((stats) => stats.init);
  const count = useGameStatsStore((stats) => stats.count);
  const perClick = useGameStatsStore((stats) => stats.perClick);
  const periodPoints = useGameStatsStore((stats) => stats.periodPoints);
  const periodTime = useGameStatsStore((stats) => stats.periodTime);

  useEffect(() => {
    if (get.data) {
      init(get.data);
    }
  }, [init, get.data]);

  useInterval(() => {
    const newStats = {
      count,
      perClick,
      periodPoints,
      periodTime,
    };
    post.mutate(newStats);
  }, 10000);
  return {
    error: get.error || post.error,
    isSaving: post.isPending,
    isLoading: get.isLoading,
  };
}
