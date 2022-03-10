import { Client } from 'discord.js';
import logger from '../utils/logger';

export async function onReady(client: Client) {
  logger.info('Discord Bot is Ready');
}

export const name = 'ready';
export default onReady;
