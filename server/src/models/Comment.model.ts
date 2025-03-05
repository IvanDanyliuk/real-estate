import { InferSchemaType, model, Schema } from "mongoose";

const commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
}, {
  timestamps: true,
});

export type CommentType = InferSchemaType<typeof commentSchema>;
export default model<CommentType>("Comment", commentSchema);