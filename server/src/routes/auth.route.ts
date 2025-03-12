import { Router } from "express";
import { registerUserHandler, loginUserHandler, logoutHandler } from "../controllers/auth.controller";

const authRoutes = Router();
authRoutes.post("/register", registerUserHandler);
authRoutes.post("/login", loginUserHandler);
authRoutes.get("/logout", logoutHandler);

export default authRoutes;