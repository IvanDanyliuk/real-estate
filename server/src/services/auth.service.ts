import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import SessionModel from "../models/session.model";
import { oneYearFromNow } from "../utils/date";
import appAssert from "../utils/appAssert";
import { refreshTokenSignOptions, signToken } from "../utils/jwt";
import VerificationCodeType from "../constants/verificationCodeTypes";
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

  const userId = user._id;

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  // send verification email

  // create session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent,
  });

  // sign access token & refresh token
  const refreshToken = signToken(
    { sessionId: session._id }, 
    refreshTokenSignOptions
  );

  const accessToken = signToken({ 
    userId, 
    sessionId: session._id 
  });

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
  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

  const accessToken = signToken({ 
    userId: user?._id, 
    ...sessionInfo, 
  });

  // return user and tokens
  return {
    user: user?.omitPassword(),
    accessToken,
    refreshToken,
  };
};