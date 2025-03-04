import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { schema, root, graphqlHandler } from "./graphql/schema";

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use("/graphql", graphqlHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server runnting on port ${PORT}`));