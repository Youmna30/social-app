import { NextFunction, Request, Response } from "express";
import { logger } from "../../pkg/logger/logger";
import { AppError } from "../../pkg/error/error";

export function globalErrorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error(err.message, {
    stack: err.stack,
    // correlationId: req.correlationId
  }); // to be removed on production
  if (err.isOperational === true) {
    return res.status(err.statusCode).json({
      message: err.message,
      success: false,
      stack: err.stack, // to be removed on production
    });
  }
  return res.status(500).json({
    message: "Something went wrong",
    success: false,
    stack: err.stack,
  });
}
