import { z as zod } from "zod";


export const userSchema = zod.object({
  name: zod.string().min(1, "User name is required").max(255),
  email: zod.string().email().min(1).max(255),
  location: zod.string().min(1, "Location is required").max(255),
  profilePhoto: zod.any(),
  likedProperties: zod.array(zod.string()),
});