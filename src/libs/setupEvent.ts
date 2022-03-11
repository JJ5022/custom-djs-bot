import { Client } from 'discord.js';
import logger from '../utils/logger';
import resolveAllJsFiles from '../utils/resolveAllFiles';

export async function setupEvent(client: Client) {
  const eventFiles = await resolveAllJsFiles('./build/events');
  for (const eventFile of eventFiles) {
    logger.verbose(`Setting event: ${eventFile}`);
    const event = await import(`..\\..\\${eventFile}`);

    if (event.name !== undefined && event.default !== undefined) {
      client.on(event.name, event.default);
    } else {
      logger.warn(`Fail to import event from ${eventFile}`);
    }
  }
}

export default setupEvent;
