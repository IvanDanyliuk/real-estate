import catchErrors from "../utils/catchErrors";
import { createAccount, loginUser } from "../services/auth.service";
import { CREATED, OK } from "../constants/http";
import { setAuthCookies } from "../utils/cookies";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

export const registerUserHandler = catchErrors(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { 
    user, 
    accessToken, 
    refreshToken 
  } = await createAccount(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
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