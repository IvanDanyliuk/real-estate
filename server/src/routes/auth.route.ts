import { Router } from "express";
import { 
  registerUserHandler, 
  loginUserHandler, 
  logoutHandler, 
  refreshHandler, 
  verifyEmailHandler,
  sendPasswordResetHandler,
  resetPasswordHandler
} from "../controllers/auth.controller";

const authRoutes = Router();
authRoutes.post("/register", registerUserHandler);
authRoutes.post("/login", loginUserHandler);
authRoutes.get("/refresh", refreshHandler);
authRoutes.get("/logout", logoutHandler);
authRoutes.get("/email/verify/:code", verifyEmailHandler);
authRoutes.post("/password/forgot", sendPasswordResetHandler);
authRoutes.post("/password/reset", resetPasswordHandler);

export default authRoutes;