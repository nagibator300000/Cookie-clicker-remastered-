import { z } from "zod";
import InventoryContentSchema from "./inventoryContent.js";
const GameStatsSchema = z.object({
  count: z.number(),
  perClick: z.number(),
  periodPoints: z.number(),
  periodTime: z.number(),
  inventoryContent: InventoryContentSchema.array(),
  souls: z.number(),
});
export default GameStatsSchema;
