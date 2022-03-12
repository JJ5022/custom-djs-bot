import { Guild } from 'discord.js';
import GuildConfig from '../../models/guildConfig';
import logger from '../../utils/logger';

export async function onGuildDelete(guild: Guild) {
  logger.verbose(`Left guild ${guild.name}`);
  GuildConfig.removeConfig(guild.id);
}

export const name = 'guildDelete';
export default onGuildDelete;
