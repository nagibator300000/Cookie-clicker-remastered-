import type { User } from "@prisma/client";
export function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    !!obj &&
    "id" in obj &&
    typeof obj.id === "string" &&
    "picture" in obj &&
    typeof obj.picture === "string" &&
    "name" in obj &&
    typeof obj.name === "string" &&
    "gameData" in obj &&
    typeof obj.gameData === "string"
  );
}
