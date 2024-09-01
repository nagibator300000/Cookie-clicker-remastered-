import type { GameStats } from "../../schemas/gameStats";

export const defaultStats = {
  count: 0,
  perClick: 1,
  periodPoints: 0,
  periodTime: 5,
};

export enum GameActionTypes {
  CLICK,
  AUTOCLICK,
  UPGRADE_PERCLICK,
  UPGRADE_PERIOD_POINTS,
  UPGRADE_PERIOD_TIME,
  RESET,
  INIT,
}

type NoPayloadTypes =
  | GameActionTypes.CLICK
  | GameActionTypes.AUTOCLICK
  | GameActionTypes.RESET;

type NoPayloadAction = {
  type: NoPayloadTypes;
};
type WithPayloadAction = {
  type: Exclude<GameActionTypes, NoPayloadTypes | GameActionTypes.INIT>;
  payload: number;
};

type InitAction = {
  type: GameActionTypes.INIT;
  payload: GameStats;
};

export type GameAction = NoPayloadAction | WithPayloadAction | InitAction;

export default function gameReducer(
  state: GameStats,
  action: GameAction
): GameStats {
  switch (action.type) {
    case GameActionTypes.CLICK:
      return {
        ...state,
        count: state.count + state.perClick,
      };
    case GameActionTypes.AUTOCLICK:
      return {
        ...state,
        count: state.count + state.periodPoints,
      };
    case GameActionTypes.RESET:
      return defaultStats;

    case GameActionTypes.UPGRADE_PERCLICK:
      return {
        ...state,
        perClick: state.perClick + action.payload,
      };
    case GameActionTypes.UPGRADE_PERIOD_POINTS:
      return {
        ...state,
        periodPoints: state.periodPoints + action.payload,
      };
    case GameActionTypes.UPGRADE_PERIOD_TIME:
      return {
        ...state,
        periodTime: state.periodTime + action.payload,
      };
    case GameActionTypes.INIT:
      return action.payload;
  }
}
