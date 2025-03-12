import { Router } from "express";
import { registerUserHandler, loginUserHandler } from "../controllers/auth.controller";

const authRoutes = Router();
authRoutes.post("/register", registerUserHandler);
authRoutes.post("/login", loginUserHandler);

export default authRoutes;