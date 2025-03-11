import { Document, model, Schema, Types } from "mongoose";
import VerificationCodeType from "../constants/verificationCodeTypes";

export interface VerificationCodeDocument extends Document {
  userId: Types.ObjectId;
  type: VerificationCodeType;
  expiresAt: Date;
  createdAt: Date;
};

const verificationCodeSchema = new Schema<VerificationCodeDocument>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  type: { type: String, required: true },
  createdAt: { type: Date, requried: true, default: Date.now },
  expiresAt: { type: Date, required: true },
});

export default model<VerificationCodeDocument>(
  "VerificationCode", 
  verificationCodeSchema,
  "verification_codes"
);