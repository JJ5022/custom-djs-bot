import { ClientEvents, Message } from 'discord.js';
import { excuteCommand } from '../../libs/commandHandler';
import GuildConfig from '../../models/guildConfig';
import logger from '../../utils/logger';

export async function onMessageCreate(message: Message) {
  if (message.content) logger.silly(`Received message: ${message.content}`);
  if (message.author.bot) {
    logger.silly('Message is from bot');
    return;
  }
  const config = message.inGuild() && GuildConfig.getConfig(message.guildId);
  if (excuteCommand(config, message)) {
    logger.silly('Command executed');
    return;
  }

  if (!message.inGuild()) {
    logger.silly('Message is not in a guild');
    message.channel.send("I didn't understand what you want, try `help`");
    return;
  }

  // if (message.author.bot) return;
  // const { guildId } = message;
  // if (!guildId) return;
  // const config = GuildConfig.getConfig(guildId);
  // if (!config) return;
  // if (excuteCommand(config, message)) return;
  // if (message.client.user && message.mentions.has(message.client.user))
  //   message.reply(`My prefix is \`${config.getPrefix()}\``);
}

export const name: keyof ClientEvents = 'messageCreate';
export default onMessageCreate;
