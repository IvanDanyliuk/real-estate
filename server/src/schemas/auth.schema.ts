import { z as zod } from "zod";

export const emailSchema = zod.string().email().min(1).max(255);
export const passwordSchema = zod.string().min(6).max(255);

export const loginSchema = zod.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: zod.string().optional(),
});

export const registerSchema = loginSchema
  .extend({
    name: zod.string().min(1).max(255),
    role: zod.string().min(1).max(255),
    phone: zod.string().min(12).max(18),
    confirmPassword: zod.string().min(6).max(255),
    location: zod.string().max(255),
    profilePhoto: zod.any().optional(),
  })
  .refine(
    (data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const verificationCodeSchema = zod.string().min(1).max(24);

export const resetPasswordSchema = zod.object({
  password: passwordSchema,
  verificationCode: verificationCodeSchema,
});