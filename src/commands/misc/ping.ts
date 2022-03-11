import { Message } from 'discord.js';

export const name = 'ping';
export const description = 'Ping the bot';
export const usage = 'ping';
export const excute = (args: string[], message: Message) => {
  message.reply('Pong!');
};
