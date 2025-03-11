import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/env";

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
};

export default generateToken;