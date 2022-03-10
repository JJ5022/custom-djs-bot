import { Client } from 'discord.js';

function shutdown(code: number, client: Client) {
  client.destroy();
  process.exit(code);
}

export async function errorHandler(client: Client) {
  process.on('uncaughtException', (err, origin) => {
    console.error(`Uncaught Exception: ${err}`);
    shutdown(1, client);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    shutdown(1, client);
  });

  process.on('SIGINT', () => {
    console.log('SIGINT: Closing application');
    shutdown(0, client);
  });
}

export default errorHandler;
