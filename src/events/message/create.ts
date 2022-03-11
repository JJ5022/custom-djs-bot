import { ClientEvents, Message } from 'discord.js';
import GuildConfig from '../../models/guildConfig';

export async function onMessageCreate(message: Message) {
  if (message.author.bot) return;
  const { guildId } = message;
  if (!guildId) return;
  const config = GuildConfig.getConfig(guildId);
  if (!config) return;
  if (message.content.startsWith(config.getPrefix())) {
    const [command, ...args] = message.content
      .slice(config.getPrefix().length)
      .toLowerCase()
      .split(' ');

    if (command == 'ping') {
      message.reply('Pong!');
    } else if (command == 'react') {
      message.react('👌');
    }
  }
}

export const name: keyof ClientEvents = 'messageCreate';
export default onMessageCreate;
