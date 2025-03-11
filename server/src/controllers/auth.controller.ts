import { z as zod } from "zod";
import catchErrors from "../utils/catchErrors";
import { createAccount } from "../services/auth.service";
import { CREATED } from "../constants/http";
import { setAuthCookies } from "../utils/cookies";

const registerSchema = zod.object({
  name: zod.string().min(1).max(255),
  role: zod.string().min(1).max(255),
  email: zod.string().email().min(1).max(255),
  phone: zod.string().min(12).max(18),
  password: zod.string().min(6).max(255),
  confirmPassword: zod.string().min(6).max(255),
  location: zod.string().max(255),
  profilePhoto: zod.string().optional(),
  userAgent: zod.string().optional(),
}).refine(
  (data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

export const registerUser = catchErrors(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await createAccount(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

export const loginUser = catchErrors(async (req, res) => {

});