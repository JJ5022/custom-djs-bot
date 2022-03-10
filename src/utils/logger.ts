import { createLogger, format } from 'winston';
import {
  Console,
  ConsoleTransportOptions,
} from 'winston/lib/winston/transports';

export enum LogLevel {
  error = 'error',
  warn = 'warn',
  info = 'info',
  http = 'http',
  verbose = 'verbose',
  debug = 'debug',
  silly = 'silly',
}

const consoleOption: ConsoleTransportOptions = {
  silent: false,
  level: LogLevel.silly,
  format: format.cli({
    all: true,
  }),
};

export const logger = createLogger({
  transports: [new Console(consoleOption)],
});

export default logger;
