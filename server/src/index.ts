import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.route";
import errorHandler from "./middleware/errorHandler";
import { OK } from "./constants/http";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.APP_ORIGIN!,
  credentials: true,
}));
app.use(cookieParser());

app.get("/", (req: any, res: any, next: any) => {
  return res.status(OK).json({
    message: "Hello World!"
  });
});

app.use("/auth", authRoutes);


//The middlware to catch all the errors across the existing routes
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));