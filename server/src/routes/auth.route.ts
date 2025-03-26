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
import { upload } from "../middleware/multer";

const authRoutes = Router();

authRoutes.post("/register", upload.array('profilePhoto'), registerUserHandler);
authRoutes.post("/login", upload.none(), loginUserHandler);
authRoutes.get("/refresh", refreshHandler);
authRoutes.post("/logout", logoutHandler);
authRoutes.get("/email/verify/:code", verifyEmailHandler);
authRoutes.post("/password/forgot", sendPasswordResetHandler);
authRoutes.post("/password/reset", resetPasswordHandler);

export default authRoutes;