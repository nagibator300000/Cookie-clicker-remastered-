import { useQuery } from "@tanstack/react-query";
import fetchJSON from "../utils/fetchJSON";
import GameStatsSchema from "../../schemas/gameStats";

const BACK_URL = import.meta.env.VITE_BACK_URL;

const GET_URL = `${BACK_URL}/gamedata`;

async function getGameStats() {
  const resp = await fetchJSON(GET_URL, {
    credentials: "include",
  });
  return GameStatsSchema.parse(resp);
}

export default function useGameStatsQuery() {
  return useQuery({ queryKey: ["gameStats"], queryFn: getGameStats });
}
