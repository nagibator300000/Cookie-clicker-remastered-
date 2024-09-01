import { useEffect } from "react";
import useGameStatsMutation from "./useGameStatsMutation";
import useGameStatsQuery from "./useGameStatsQuery";
import { GameActionTypes } from "./gameReducer";
import useInterval from "./useInterval";
import { useGameStatsReducer } from "../components/ReducerProvider/ReducerProvider";

export default function useGameStats() {
  const post = useGameStatsMutation();
  const get = useGameStatsQuery();
  const { state, dispatch } = useGameStatsReducer();

  useEffect(() => {
    if (get.data) {
      dispatch({
        type: GameActionTypes.INIT,
        payload: get.data,
      });
    }
  }, [dispatch, get.data]);

  useInterval(() => {
    post.mutate(state);
  }, 10000);
  return {
    error: get.error || post.error,
    stats: state,
    dispatch,
    isSaving: post.isPending,
    isLoading: get.isLoading,
  };
}
