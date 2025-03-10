import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/user.model";
import generateToken from "../utils/generateToken";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { name, role, email, phone, password, location, profilePhoto } = req.body;

    const existingUser = await User.findOne({ email });

    if(existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      role,
      email,
      phone,
      password: hashedPassword,
      location,
      profilePhoto,
    });

    const token = generateToken(newUser.id);
    res.status(201).json({ token });
  } catch (error: any) {
    res.status(301).json({ message: "Failed to create a new user" });
  }
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!user) {
      // res.status(400).json({ message: "The user with such email does not exist" });
      throw new Error("The user with such email does not exist")
    }

    const passwordMatch = await bcrypt.compare(password, user.password!);
    const token = generateToken(user!.id);

    if(user && passwordMatch) {
      res.status(201).json({ token });
    } else {
      // res.status(401).json({ message: "Invalid credentials" });
      throw new Error("Invalid credentials");
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});