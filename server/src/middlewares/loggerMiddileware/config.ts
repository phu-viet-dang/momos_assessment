// logger.js
import winston from "winston";

// Create a custom logger instance
const logger = winston.createLogger({
  // Default log level: production, info, debug
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // Optionally log to a file (e.g., logs/combined.log)
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
