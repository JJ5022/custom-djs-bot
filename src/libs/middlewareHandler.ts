import { Client, ClientEvents, Collection } from 'discord.js';
import logger from '../utils/logger';
import path from 'path';

const middlewares = new Collection<keyof ClientEvents, any>();

export async function loadMiddlewares(client: Client) {}

export function excuteMiddleware<
  E extends keyof ClientEvents,
  A extends ClientEvents[E]
>(event: E, ...args: A) {}

export default loadMiddlewares;
