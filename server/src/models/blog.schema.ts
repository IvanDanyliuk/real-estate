import { InferSchemaType, model, Schema } from "mongoose";

const articleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, requried: true },
  images: [{ type: String, required: true }],
}, {
  timestamps: true,
});

export type ArticleType = InferSchemaType<typeof articleSchema>;
export default model<ArticleType>("Article", articleSchema);