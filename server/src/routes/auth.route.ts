import { Router } from "express";
import { 
  registerUserHandler, 
  loginUserHandler, 
  logoutHandler, 
  refreshHandler 
} from "../controllers/auth.controller";

const authRoutes = Router();
authRoutes.post("/register", registerUserHandler);
authRoutes.post("/login", loginUserHandler);
authRoutes.get("/refresh", refreshHandler);
authRoutes.get("/logout", logoutHandler);

export default authRoutes;