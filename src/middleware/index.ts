import { Client } from 'discord.js';
import fsPromises from 'fs/promises';

export async function loadMiddleware(client: Client) {
  const files = await fsPromises.readdir('./build/middleware');
  for (const file of files) {
    if (file.endsWith('.js') && !file.startsWith('index')) {
      const middleware = await import(`./${file}`);
      middleware.default(client);
    }
  }
}

export default loadMiddleware;
