import { createLogger, format } from 'winston';
import {
  Console,
  ConsoleTransportOptions,
  File,
  FileTransportOptions,
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

const profilerFormat = format(info => {
  if (info.durationMs !== undefined) {
    info.message = `${info.message} (${info.durationMs}ms)`;
  }
  return info;
});

const consoleOption: ConsoleTransportOptions = {
  silent: false,
  level: LogLevel.silly,
  format: format.combine(
    profilerFormat(),
    format.cli({
      all: true,
    })
  ),
};

const fileOption: FileTransportOptions = {
  silent: false,
  level: LogLevel.silly,
  format: format.json(),
  filename: 'logs/output.log',
};

export const logger = createLogger({
  transports: [new Console(consoleOption), new File(fileOption)],
});

export default logger;
