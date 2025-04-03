import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import propertyRoutes from "./routes/property.route";
import errorHandler from "./middleware/errorHandler";
import { APP_ORIGIN, PORT } from "./constants/env";
import authenticate from "./middleware/authenticate";
import sessionRoutes from "./routes/session.route";

const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: APP_ORIGIN,
  credentials: true,
}));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/properties", propertyRoutes);

// protected routes
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes)

//The middlware to catch all the errors across the existing routes
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));