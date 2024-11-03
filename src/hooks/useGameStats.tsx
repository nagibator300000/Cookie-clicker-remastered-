import { useEffect } from "react";
import useGameStatsMutation from "./useGameStatsMutation";
import useGameStatsQuery from "./useGameStatsQuery";
import useInterval from "./useInterval";
import useGameStore from "../stores/game";

export default function useGameStats() {
  const post = useGameStatsMutation();
  const get = useGameStatsQuery();
  const init = useGameStore((stats) => stats.init);

  useEffect(() => {
    if (get.data) {
      init(get.data);
    }
  }, [init, get.data]);

  useInterval(() => {
    const { count, perClick, periodPoints, periodTime } =
      useGameStore.getState();
    post.mutate({
      count,
      perClick,
      periodPoints,
      periodTime,
    });
  }, 10000);
  return {
    error: get.error || post.error,
    isSaving: post.isPending,
    isLoading: get.isLoading,
  };
}
