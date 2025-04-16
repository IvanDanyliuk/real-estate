import { Router } from "express";
import { deleteUserHandler, getUserHandler, getUsersHandler } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", getUserHandler);
userRoutes.get("/all", getUsersHandler);
userRoutes.delete("/", deleteUserHandler);

export default userRoutes;