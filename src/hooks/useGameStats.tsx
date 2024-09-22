import { useEffect, useRef } from "react";
import useGameStatsMutation from "./useGameStatsMutation";
import useGameStatsQuery from "./useGameStatsQuery";
import { GameActionTypes } from "../utils/gameReducer";
import useInterval from "./useInterval";
import { useGameStatsReducer } from "../components/ReducerProvider/ReducerProvider";

export default function useGameStats() {
  const post = useGameStatsMutation();
  const get = useGameStatsQuery();
  const { state, dispatch } = useGameStatsReducer();
  const dataRef = useRef(state);

  useEffect(() => {
    dataRef.current = state;
  }, [state]);

  useEffect(() => {
    if (get.data) {
      dispatch({
        type: GameActionTypes.INIT,
        payload: get.data,
      });
    }
  }, [dispatch, get.data]);

  useInterval(() => {
    post.mutate(dataRef.current);
  }, 10000);
  return {
    error: get.error || post.error,
    stats: state,
    dispatch,
    isSaving: post.isPending,
    isLoading: get.isLoading,
  };
}
