import { NextFunction, Request, Response } from "express";
import logger from "./config";

// Request logging middleware
const requestLogger = (req: any, res: Response, next: NextFunction) => {
  // Log incoming request details (method, URL)
  logger.info(`${req.method} ${req.originalUrl}`);

  // Store the start time to calculate the request processing time later
  res.on("finish", () => {
    const elapsedTime = Date.now() - req.startTime;
    logger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} in ${elapsedTime}ms`
    );
  });

  // Start time for measuring response time
  req.startTime = Date.now();
  next();
};

// Error logging middleware
const errorLogger = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorMessage = err?.errors?.[0]?.message || err?.message;
  logger.error(`Error: ${errorMessage} - ${err.stack}`);
  res.status(500).json(errorMessage);
};

const loggerMiddleware = { requestLogger, errorLogger };

export default loggerMiddleware;
