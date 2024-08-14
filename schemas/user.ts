import { z } from "zod";

const UserSchema = z.object({
  name: z.string(),
  picture: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export default UserSchema;
