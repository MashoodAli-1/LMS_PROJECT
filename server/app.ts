import express, { Request, Response, NextFunction } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
// import { error } from "console";
import { ErrorMiddleware } from "./middleware/error";
require("dotenv").config();

//? body parser
app.use(express.json({ limit: "50mb" })); // to support JSON-encoded bodies

//? cookie parser
app.use(cookieParser());

//? cors => cross origin resource sharing
//? cors means only specific  origins can access our api (development purpose) other api's trying to access our api will get cors error
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.get("/test", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: `Welcome to the API!`,
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not Found`) as any;
  err.statusCode = 404;
  next(err);
});

//? Error Middleware
app.use(ErrorMiddleware);
