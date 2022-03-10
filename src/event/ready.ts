import { Client } from 'discord.js';

export async function onReady(client: Client) {
  console.log('Discord Bot is Ready');
}

export const name = 'ready';
export default onReady;
