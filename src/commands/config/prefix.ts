import { Message } from 'discord.js';
import GuildConfig from '../../models/guildConfig';

export const name = 'prefix';
export const description = 'Change the prefix of the bot';
export const aliases = ['p'];
export const usage = 'prefix <prefix>';
export const excute = (args: string[], message: Message) => {
  if (!args[0]) {
    message.reply(`The current prefix is \`${process.env.PREFIX}\``);
  } else {
    if (message.guildId) {
      const guild = GuildConfig.getConfig(message.guildId);
      if (guild) {
        guild.setPrefix(args[0]);
        message.reply(`The prefix has been changed to \`${args[0]}\``);
      }
    } else {
      message.reply(`The prefix can only be changed in a server`);
    }
  }
};
