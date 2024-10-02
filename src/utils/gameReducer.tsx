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
  UNLOCK,
}

type NoPayloadTypes = GameActionTypes.AUTOCLICK | GameActionTypes.RESET;

type NoPayloadAction = {
  type: NoPayloadTypes;
};
type WithPayloadAction = {
  type:
    | GameActionTypes.UPGRADE_PERCLICK
    | GameActionTypes.UPGRADE_PERIOD_POINTS
    | GameActionTypes.UPGRADE_PERIOD_TIME;
  payload: { cost: number; upgrade: number };
};

type InitAction = {
  type: GameActionTypes.INIT;
  payload: GameStats;
};

type Unlock = {
  type: GameActionTypes.UNLOCK;
  payload: number;
};

type Click = {
  type: GameActionTypes.CLICK;
  payload: number;
};

export type GameAction =
  | NoPayloadAction
  | WithPayloadAction
  | InitAction
  | Unlock
  | Click;

export default function gameReducer(
  state: GameStats,
  action: GameAction
): GameStats {
  switch (action.type) {
    case GameActionTypes.CLICK:
      return {
        ...state,
        count: state.count + action.payload,
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
        count: state.count - action.payload.cost,
        perClick: state.perClick + action.payload.upgrade,
      };
    case GameActionTypes.UPGRADE_PERIOD_POINTS:
      return {
        ...state,
        count: state.count - action.payload.cost,
        periodPoints: state.periodPoints + action.payload.upgrade,
      };
    case GameActionTypes.UPGRADE_PERIOD_TIME:
      return {
        ...state,
        count: state.count - action.payload.cost,
        periodTime: state.periodTime * (1 - action.payload.upgrade),
      };
    case GameActionTypes.UNLOCK:
      return {
        ...state,
        count: state.count - action.payload,
      };
    case GameActionTypes.INIT:
      return action.payload;
  }
}
