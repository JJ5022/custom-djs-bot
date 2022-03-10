import { Client } from 'discord.js';
import logger from '../utils/logger';

function shutdown(code: number, client: Client) {
  client.destroy();
  process.exit(code);
}

export async function errorHandler(client: Client) {
  process.on('uncaughtException', (err, origin) => {
    logger.error(`Uncaught Exception: ${err}`);
    shutdown(1, client);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    shutdown(1, client);
  });

  process.on('SIGINT', () => {
    logger.info('SIGINT: Closing application');
    shutdown(0, client);
  });
}

export default errorHandler;
