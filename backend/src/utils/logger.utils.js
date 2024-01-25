"use strict";
const winston = require("winston");
const fs = require("fs");
const path = require("path");
const { loggerConfig } = require("../configs");
const { getCurrentDate } = require("./date-time.util");

// Define the log directory and create it if it doesn't exist
const logDirectory = path.join(__dirname, "../..", "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const logger = new winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(
        logDirectory,
        `${getCurrentDate()}.${loggerConfig.error_file_name}`
      ),
      level: loggerConfig.level_error, // Log only error-level messages
    }),
    new winston.transports.File({
      filename: path.join(
        logDirectory,
        `${getCurrentDate()}.${loggerConfig.info_file_name}`
      ),
      level: loggerConfig.level_info, // Log info-level messages and above
    }),
    new winston.transports.Console({
      timestamp: true,
      colorize: true,
    }),
  ],
});

module.exports = logger;
