import { ErrorRequestHandler } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/http";

const errorHandler: ErrorRequestHandler = (error: any, req: any, res: any, next: any) => {
  console.log(`PATH: ${req.path}`, error);
  return res.status(INTERNAL_SERVER_ERROR).send("Internal server error");
};

export default errorHandler;