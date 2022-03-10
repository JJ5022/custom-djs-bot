import { ClientEvents, Message } from 'discord.js';

export async function onMessageCreate(message: Message) {
  if (message.author.bot) return;
  if (message.content.startsWith('!')) {
    const args = message.content.slice(1).split(/ +/);
    const commandName = args.shift()!.toLowerCase();

    if (commandName == 'ping') {
      message.reply({
        content: 'Pong!',
      });
    }
  }
}

export const name: keyof ClientEvents = 'messageCreate';
export default onMessageCreate;
