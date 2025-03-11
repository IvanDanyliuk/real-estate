import { Document, model, Schema } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends Document {
  name: string;
  role: string;
  email: string;
  phone: string;
  password: string;
  verified: boolean;
  location?: string;
  profilePhoto?: string;
  likedProperties?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(val: string): Promise<boolean>;
  // replace Omit with Pick and pass there all the fields except for a password
  omitPassword(): Omit<UserDocument, "password">
};

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, requried: true },
  verified: { type: Boolean, required: true, default: false },
  location: { type: String },
  profilePhoto: { type: String },
  likedProperties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
}, {
  timestamps: true,
});

userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) {
    return next();
  }

  this.password = await hashValue(this.password);
  next();
});

userSchema.methods.comparePassword = async function(val: string) {
  return compareValue(val, this.password);
};

userSchema.methods.omitPassword = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default model<UserDocument>("User", userSchema);