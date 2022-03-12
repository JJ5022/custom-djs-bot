import { Collection, Message, Client } from 'discord.js';
import resolveAllJsFiles from '../utils/resolveAllFiles';
import path from 'path';
import logger from '../utils/logger';
import GuildConfig from '../models/guildConfig';

const commands = new Collection<string, any>();
let client: Client;

export async function loadCommands(c: Client) {
  client = c;

  const files = await resolveAllJsFiles(path.join(__dirname, '..', 'commands'));
  for (const file of files) {
    logger.verbose(`Loading command: ${file}`);
    const command = await import(file);
    if (
      typeof command.name === 'string' &&
      typeof command.excute === 'function'
    ) {
      commands.set(command.name, command);
    } else {
      logger.warn(`Command ${file} is not loaded`);
    }
  }
}

export function excuteCommand(
  config: false | undefined | GuildConfig,
  message: Message
) {
  const prefix = (config && config.getPrefix()) || '';

  if (message.content.startsWith(prefix) || message.inGuild()) {
    const [command, ...args] = message.content
      .slice(prefix.length)
      .toLowerCase()
      .split(' ');

    const commandFunc = commands.get(command);

    if (commandFunc) {
      if (commandFunc.guildOnly && !message.inGuild()) {
        message.channel.send('This command can only be used in a server');
        return true;
      } else {
        logger.verbose(`Execute command: ${command}`);
        commandFunc.excute(args, message, client);
        return true;
      }
    }
  }
  return false;
}

export default loadCommands;
