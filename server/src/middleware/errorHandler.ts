import { ErrorRequestHandler, Response } from "express";
import { z as zod } from "zod";
import AppError from "../utils/AppError";
import { clearAuthCookies, REFRESH_PATH } from "../utils/cookies";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";

const handleZodError = (res: Response, error: zod.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));

  return res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};

const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

const errorHandler: ErrorRequestHandler = (error: any, req: any, res: any, next: any) => {
  console.log(`PATH: ${req.path}`, error);

  if(req.path === REFRESH_PATH) {
    clearAuthCookies(res);
  }

  if(error instanceof zod.ZodError) {
    return handleZodError(res, error);
  }

  if(error instanceof AppError) {
    return handleAppError(res, error);
  }

  return res.status(INTERNAL_SERVER_ERROR).send("Internal server error");
};

export default errorHandler;