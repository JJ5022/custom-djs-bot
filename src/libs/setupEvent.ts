import { Client } from 'discord.js';
import resolveAllFiles from '../utils/resolveAllFiles';

export async function setupEvent(client: Client) {
  const eventFiles = await resolveAllFiles('./build/event');
  for (const eventFile of eventFiles) {
    if (eventFile.endsWith('.js') && !eventFile.startsWith('index')) {
      const event = await import(`..\\..\\${eventFile}`);

      if (event.name !== undefined && event.default !== undefined) {
        client.on(event.name, event.default);
      } else {
        console.log(`Fail to import event from ${eventFile}`);
      }
    }
  }
}

export default setupEvent;
