import { z as zod } from "zod";

export const articleSchema = zod.object({
  title: zod.string().min(1, { message: "Title is required!" }).max(255, { message: "Title should not contain more than 255 characters" }),
  content: zod.string().min(1, { message: 'Content is required!' }),
  images: zod.any(),
});