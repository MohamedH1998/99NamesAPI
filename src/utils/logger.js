import * as winston from 'winston';

const {
  combine, timestamp, label, printf,
} = winston.format;

const myFormat = printf(
  ({
    level, message, label, timestamp,
  }) => `${timestamp} [${label}] - ${level}: ${message}`,
);

export default function createLogger(logLabel) {
  const logger = winston.createLogger({
    level: 'info',
    format: combine(label({ label: logLabel }), timestamp(), myFormat),
    transports: [new winston.transports.Console()],
  });
  return logger;
}
