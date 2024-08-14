import { createContext, ReactNode, useContext, useReducer } from "react";
import gameReducer, { defaultStats, GameAction } from "../../utils/gameReducer";

type GameStatsProviderProps = { children: ReactNode };

type ReducerContext = {
  state: typeof defaultStats;
  dispatch: React.Dispatch<GameAction>;
};

const gameStatsContext = createContext<ReducerContext | null>(null);

export default function GameStatsProvider({
  children,
}: GameStatsProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, defaultStats);
  return (
    <gameStatsContext.Provider value={{ state, dispatch }}>
      {children}
    </gameStatsContext.Provider>
  );
}

export function useGameStats() {
  const context = useContext(gameStatsContext);
  if (!context) {
    throw new Error("This hook shouldn't be used outside of ReducerProvider");
  }
  return context;
}
