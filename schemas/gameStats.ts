import { z } from "zod";

const GameStatsSchema = z.object({
  count: z.number(),
  perClick: z.number(),
  periodPoints: z.number(),
  periodTime: z.number(),
});

export type GameStats = z.infer<typeof GameStatsSchema>;

export default GameStatsSchema;
