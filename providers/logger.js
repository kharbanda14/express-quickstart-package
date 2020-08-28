const winston = require("winston");
const path = require("path");

const transPorts = {
  console: () => new winston.transports.Console(),
  file: () => [
    new winston.transports.File({
      filename: path.join(process.cwd(), "storage/logs", "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(process.cwd(), "storage/logs", "combined.log"),
    }),
  ],
};

let useTransPorts = [];

(process.env.LOG_DRIVER || "").split(",").forEach((transport) => {
  if (Object.keys(transPorts).includes(transport)) {
    let resolvedTransport = transPorts[transport]();
    if (Array.isArray(resolvedTransport)) {
      useTransPorts = [...resolvedTransport, ...useTransPorts];
    } else {
      useTransPorts.push(resolvedTransport);
    }
  }
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: winston.format.simple(),
  transports: useTransPorts,
});

module.exports = logger;
