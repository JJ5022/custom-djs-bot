import { Client } from 'discord.js';
import GuildConfig from '../models/guildConfig';
import logger from '../utils/logger';

export async function onReady(client: Client) {
  logger.info('Discord Bot is Ready');

  const [guilds] = await Promise.all([
    client.guilds.fetch(),
    GuildConfig.load(),
  ]);

  logger.verbose('Checking Guilds Config');
  for (const guild of guilds.values()) {
    const config = GuildConfig.getConfig(guild.id);
    if (!config) {
      await GuildConfig.insertConfig(guild.id, '**');
      logger.verbose(`Added Guild not in config: ${guild.id}`);
    }
  }

  for (const id of GuildConfig.getGuildIds()) {
    if (!guilds.has(id)) {
      await GuildConfig.removeConfig(id);
      logger.verbose(`Removed Guild in config: ${id}`);
    }
  }

  logger.verbose('Checking Guilds Config Complete');
}

export const name = 'ready';
export default onReady;
