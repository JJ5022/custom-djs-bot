import { Client } from 'discord.js';
import logger from '../utils/logger';
import path from 'path';
import getModules from '../utils/getModules';

export async function setupEvent(client: Client) {
  const modules = getModules(__dirname, path.join('.', 'build', 'events'));
  for await (const module of modules) {
    const rootPath = path.relative(
      path.resolve('.'),
      path.join(__dirname, module)
    );
    const event = await import(`${module}`);

    if (typeof event.name === 'string' && typeof event.default === 'function') {
      client.on(event.name, event.default);
      logger.verbose(`Loaded event: ${event.name} from "${rootPath}"`);
    } else {
      logger.warn(`Fail to import event from "${rootPath}"`);
    }
  }
}

export default setupEvent;
