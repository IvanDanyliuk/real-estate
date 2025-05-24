import { Router } from "express";
import { deleteUserHandler, getUserHandler, getUsersHandler, updateUserHandler } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", getUserHandler);
userRoutes.get("/all", getUsersHandler);
userRoutes.patch("/", updateUserHandler);
userRoutes.delete("/", deleteUserHandler);

export default userRoutes;