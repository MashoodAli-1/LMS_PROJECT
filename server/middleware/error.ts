import ErrorHandler from "../utils/ErrorHandler";
import { Response, Request, NextFunction } from "express";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //? wrong mongo id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  //? duplicate key error
  if (err.code == 1100) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  //? wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token. Please login again.";
    err = new ErrorHandler(message, 400);
  }
  //? Jwt expire token error
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is expired. try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
