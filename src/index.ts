import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import { Client, Intents } from 'discord.js';
import logger from './utils/logger';
import loadDb from './libs/loadDb';
import setupEvent from './libs/setupEvent';
import setupErrorHandler from './libs/setupErrorHandler';
import loadCommands from './libs/commandHandler';
import loadMiddlewares from './libs/middlewareHandler';

async function main() {
  const intents = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ];

  const client = new Client({ intents, partials: ['CHANNEL'] });

  await Promise.all([
    loadDb(),
    setupErrorHandler(client),
    setupEvent(client),
    loadCommands(client),
    loadMiddlewares(client),
  ]);

  client.login(process.env.DISCORD_TOKEN);
}

main().catch(error => {
  if (error) {
    logger.error(`Application Error: ${error}`);
  }
  process.exit(1);
});
