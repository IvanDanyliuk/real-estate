import { z as zod } from "zod";


export const userSchema = zod.object({
  name: zod.string().min(1, "User name is required").max(255).optional(),
  email: zod.string().email().min(1).max(255).optional(),
  location: zod.string().min(1, "Location is required").max(255).optional(),
  phone: zod.string().optional(),
  profilePhoto: zod.any().optional(),
  likedProperties: zod.array(zod.string()).optional(),
});