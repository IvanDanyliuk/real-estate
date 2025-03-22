import { v2 } from "cloudinary";
import SessionModel from "../models/session.model";
import { 
  createAccount, 
  loginUser, 
  refreshUserAccessToken, 
  resetPassword, 
  sendPasswordResetEmail, 
  verifyEmail 
} from "../services/auth.service";
import { 
  emailSchema, 
  loginSchema, 
  registerSchema, 
  resetPasswordSchema, 
  verificationCodeSchema 
} from "../schemas/auth.schema";
import { 
  clearAuthCookies, 
  getAccessTokenCookieOptions, 
  getRefreshTokenCookieOptions, 
  setAuthCookies 
} from "../utils/cookies";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import { verifyToken } from "../utils/jwt";
import { CREATED, NOT_FOUND, OK, UNAUTHORIZED } from "../constants/http";
// import { cloudinary } from "../config/cloudinary";

export const registerUserHandler = catchErrors(async (req, res) => {
  console.log('REGISTER REQUEST', req.body, req.files)
  const request = registerSchema.safeParse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const files = req.files;
  const uploadedImagePaths = await Promise.all(files!.map(async (file: any) => {
    const uploaded = await v2.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if(error) {
          // return res.status(NOT_FOUND).json({ message: "Cannot upload images" });
          console.log("FAILED TO UPLOAD IMAGES");
        }
        return result?.secure_url;
      }
    ).end(file.buffer);
    return uploaded;
  }));

  // const { 
  //   user, 
  //   accessToken, 
  //   refreshToken 
  // } = await createAccount(request);

  // return setAuthCookies({ res, accessToken, refreshToken })
  //   .status(CREATED)
  //   .json(user);
  return res.status(OK).json({ message: 'New user has been successfully created!' });
});

export const loginUserHandler = catchErrors(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { accessToken, refreshToken } = await loginUser(request);
  return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
    message: "Login successful",
  });
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const { payload } = verifyToken(accessToken);

  if(payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId)
  }

  return clearAuthCookies(res).status(OK).json({
    message: "Logout successful",
  });
});

export const refreshHandler = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string | undefined;
  appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

  const { 
    accessToken, 
    newRefreshToken 
  } = await refreshUserAccessToken(refreshToken);

  if(newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }

  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({ message: "Access token refreshed" });
});

export const verifyEmailHandler = catchErrors(async (req, res) => {
  const verificationCode = verificationCodeSchema.parse(req.params.code);
  await verifyEmail(verificationCode);
  return res.status(OK).json({
    message: "Email was successfully verified",
  });
});

export const sendPasswordResetHandler = catchErrors(async (req, res) => {
  const email = emailSchema.parse(req.body.email);
  await sendPasswordResetEmail(email);
  return res.status(OK).json({
    message: "Password reset email send",
  });
});

export const resetPasswordHandler = catchErrors(async (req, res) => {
  const request = resetPasswordSchema.parse(req.body);
  await resetPassword(request);
  return clearAuthCookies(res).status(OK).json({
    message: "Password reset successful",
  });
});