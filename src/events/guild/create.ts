import { Guild } from 'discord.js';
import GuildConfig from '../../models/guildConfig';
import logger from '../../utils/logger';

export async function onGuildCreate(guild: Guild) {
  logger.verbose(`Joined guild ${guild.name}`);
  GuildConfig.insertConfig(guild.id, '**');
  if (guild.client.user) {
    guild.systemChannel?.send(
      `
Hello, I'm **${guild.client.user.username}**!
  Default Prefix: **
  Use \`help\` to see all commands
      `
    );
  }
}

export const name = 'guildCreate';
export default onGuildCreate;
