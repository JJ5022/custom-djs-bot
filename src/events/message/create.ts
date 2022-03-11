import { ClientEvents, Message } from 'discord.js';
import { excuteCommand } from '../../libs/commandHandler';
import GuildConfig from '../../models/guildConfig';

export async function onMessageCreate(message: Message) {
  if (message.author.bot) return;
  const { guildId } = message;
  if (!guildId) return;
  const config = GuildConfig.getConfig(guildId);
  if (!config) return;
  if (excuteCommand(config, message)) return;
}

export const name: keyof ClientEvents = 'messageCreate';
export default onMessageCreate;
