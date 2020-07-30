import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

import express, { Request, Response, NextFunction } from "express";
import { BAD_REQUEST } from "http-status-codes";
import "express-async-errors";
import logger from "@shared/Logger";

import apiRouter from "./apis";

// Init express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

// Add APIs
app.use("/api", apiRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  next();
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});

app.get("*", (req: Request, res: Response) => {
  res.send("echo");
});

// Export express instance
export default app;
