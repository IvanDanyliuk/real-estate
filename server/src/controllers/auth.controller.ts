import { Request, Response } from "express";
import { z as zod } from "zod";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/user.model";
import generateToken from "../utils/generateToken";
import catchErrors from "../utils/catchErrors";

const registerSchema = zod.object({
  name: zod.string().min(1).max(255),
  role: zod.string().min(1).max(255),
  email: zod.string().email().min(1).max(255),
  phone: zod.string().min(12).max(18),
  password: zod.string().min(6).max(255),
  confirmPassword: zod.string().min(6).max(255),
  location: zod.string().min(6).optional(),
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
});

export const loginUser = catchErrors(async (req, res) => {

});