import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { tyoe: String, requried: true },
  location: { type: String },
  profilePhoto: { type: String },
  likedProperties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
}, {
  timestamps: true,
});

export type UserType = InferSchemaType<typeof userSchema>;
export default model<UserType>("User", userSchema);