import { Collection, Message, Client } from 'discord.js';
import path from 'path';
import logger from '../utils/logger';
import GuildConfig from '../models/guildConfig';
import getModules from '../utils/getModules';

const commands = new Collection<string, any>();
let client: Client;

export async function loadCommands(c: Client) {
  client = c;

  const modules = getModules(__dirname, path.join('.', 'build', 'commands'));
  for await (const module of modules) {
    const rootPath = path.relative(
      path.resolve('.'),
      path.join(__dirname, module)
    );
    const command = await import(module);
    if (
      typeof command.name === 'string' &&
      typeof command.excute === 'function'
    ) {
      commands.set(command.name, command);
      logger.verbose(`Loaded command: ${command.name} from "${rootPath}"`);
    } else {
      logger.warn(`Fail to import command from "${rootPath}"`);
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
