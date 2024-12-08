import { z } from "zod";
import InventoryContentSchema from "./inventoryContent";

const GameStatsSchema = z.object({
  count: z.number(),
  perClick: z.number(),
  periodPoints: z.number(),
  periodTime: z.number(),
  inventoryContent: InventoryContentSchema.array(),
  souls: z.number(),
});

export type GameStats = z.infer<typeof GameStatsSchema>;

export default GameStatsSchema;
