import { Client } from 'discord.js';
import logger from '../utils/logger';

function shutdown(code: number, client: Client) {
  client.destroy();
  process.exit(code);
}

export async function errorHandler(client: Client) {
  process.on('uncaughtException', (err, origin) => {
    logger.error(`Uncaught Exception`, err, origin);
    shutdown(1, client);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection reason:', reason, promise);
    throw 'Unhandled Rejection';
  });

  process.on('SIGINT', () => {
    logger.info('SIGINT: Closing application');
    shutdown(0, client);
  });
}

export default errorHandler;
