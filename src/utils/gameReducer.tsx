export const defaultStats = {
  count: 0,
  perClick: 1,
  periodPoints: 0,
  periodTime: 5,
};

type GameStats = typeof defaultStats;

export enum GameActionTypes {
  CLICK,
  AUTOCLICK,
  UPGRADE_PERCLICK,
  UPGRADE_PERIOD_POINTS,
  UPGRADE_PERIOD_TIME,
  RESET,
}

type NoPayloadTypes =
  | GameActionTypes.CLICK
  | GameActionTypes.AUTOCLICK
  | GameActionTypes.RESET;

type NoPayloadAction = {
  type: NoPayloadTypes;
};
type WithPayloadAction = {
  type: Exclude<GameActionTypes, NoPayloadTypes>;
  payload: number;
};

export type GameAction = NoPayloadAction | WithPayloadAction;

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
  }
}
