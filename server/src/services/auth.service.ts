import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import SessionModel from "../models/session.model";
import VerificationCodeType from "../constants/verificationCodeTypes";
import { oneYearFromNow } from "../utils/date";
import { JWT_REFRESH_SECRET } from "../constants/env";

export type CreateAccountParams = {
  name: string,
  role: string,
  email: string,
  phone: string,
  password: string,
  location: string,
  profilePhoto?: string,
  userAgent?: string,
};

export const createAccount = async (data: CreateAccountParams) => {
  // verifiy existing user does not exist
  const existingUser = await UserModel.exists({
    email: data.email
  });
  if(existingUser) {
    throw new Error("User already exists");
  }

  // create user
  const newUser = await UserModel.create({
    name: data.name,
    role: data.role,
    email: data.email,
    phone: data.phone,
    password: data.password,
    location: data.location,
    profilePhoto: data.profilePhoto,
    likedProperties: []
  });

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId: newUser._id,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  // send verification email

  // create session
  const session = await SessionModel.create({
    userId: newUser._id,
    userAgent: data.userAgent,
  });

  // sign access token & refresh token
  const refreshToken = jwt.sign(
    { sessionId: session._id },
    JWT_REFRESH_SECRET,
  );
}