import { Router } from "express";
import { deleteUserHandler, getUserHandler, getUsersHandler, updateUserHandler } from "../controllers/user.controller";
import { upload } from "../middleware/multer";

const userRoutes = Router();

userRoutes.get("/", getUserHandler);
userRoutes.get("/all", getUsersHandler);
userRoutes.patch("/", upload.array('profilePhoto'), updateUserHandler);
userRoutes.delete("/", deleteUserHandler);

export default userRoutes;