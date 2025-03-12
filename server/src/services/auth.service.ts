import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import SessionModel from "../models/session.model";
import VerificationCodeType from "../constants/verificationCodeTypes";
import { oneYearFromNow } from "../utils/date";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import appAssert from "../utils/appAssert";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";

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

  appAssert(!existingUser, CONFLICT, "Email already in use");

  // create user
  const user = await UserModel.create({
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
    userId: user._id,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  // send verification email

  // create session
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });

  // sign access token & refresh token
  const refreshToken = jwt.sign(
    { sessionId: session._id },
    JWT_REFRESH_SECRET,
    { 
      audience: ["user"], 
      expiresIn: "30d" 
    },
  );

  const accessToken = jwt.sign(
    { 
      userId: user._id, 
      sessionId: session._id 
    },
    JWT_SECRET,
    { 
      audience: ["user"], 
      expiresIn: "15m", 
    },
  );

  // return user, refresh token and access token
  return {
    user: user.omitPassword(), 
    accessToken, 
    refreshToken,
  };
};

export type LoginParams = {
  email: string,
  password: string,
  userAgent?: string,
};

export const loginUser = async ({ email, password, userAgent }: LoginParams) => {
  // get user by email
  const user = await UserModel.findOne({ email });
  appAssert(user, UNAUTHORIZED, "Invalid email or password");

  // validate password from the request
  const isValid = await user?.comparePassword(password);
  appAssert(isValid, UNAUTHORIZED, "Invalid email or password");

  const userId = user?._id;

  // create a session
  const session = await SessionModel.create({
    userId,
    userAgent,
  });

  const sessionInfo = {
    sessionId: session._id,
  };

  // sign access token & refresh token
  const refreshToken = jwt.sign(
    sessionInfo,
    JWT_REFRESH_SECRET,
    { 
      audience: ["user"], 
      expiresIn: "30d" 
    },
  );

  const accessToken = jwt.sign(
    { 
      userId: user?._id, 
      ...sessionInfo, 
    },
    JWT_SECRET,
    { 
      audience: ["user"], 
      expiresIn: "15m", 
    },
  );

  // return user and tokens
  return {
    user: user?.omitPassword(),
    accessToken,
    refreshToken,
  };
};