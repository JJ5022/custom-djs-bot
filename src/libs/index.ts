import { Client } from 'discord.js';
import fsPromises from 'fs/promises';

export async function loadLibs(client: Client) {
  const files = await fsPromises.readdir('./build/libs');
  for (const file of files) {
    if (file.endsWith('.js') && !file.startsWith('index')) {
      const lib = await import(`./${file}`);
      lib.default(client);
    }
  }
}

export default loadLibs;
