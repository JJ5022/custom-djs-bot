import { Client, ClientEvents, Collection } from 'discord.js';
import logger from '../utils/logger';
import path from 'path';
import getModules from '../utils/getModules';
import { djsEvent, isDjsEvent } from '../utils/djsEvent';

const eventCallbacks = new Collection<
  keyof ClientEvents,
  Collection<string, Function>
>();

export async function loadMiddlewares(client: Client) {
  const modules = getModules(__dirname, path.join('.', 'build', 'middlewares'));
  let middlewareCount = 0;

  logger.profile('Loading middlewares');

  for await (const module of modules) {
    const rootPath = path.relative(
      path.resolve('.'),
      path.join(__dirname, module)
    );

    const middleware = await import(module);
    const excuteOrder = middleware.order || `unordered-${middlewareCount++}`;
    const loadableEvent: string[] = [];

    /* //Loop through all events
    for (const event of djsEvent) {
      if (typeof middleware[event] === 'function') {
        if (!eventCallbacks.has(event)) {
          eventCallbacks.set(event, new Collection());
        }
        eventCallbacks.get(event)?.set(excuteOrder, middleware[event]);
        loadableEvent.push(event);
      }
    } 
    */

    //Loop through all exports
    for (const ex in middleware) {
      if (isDjsEvent(ex)) {
        if (!eventCallbacks.has(ex)) {
          eventCallbacks.set(ex, new Collection());
        }
        eventCallbacks.get(ex)?.set(excuteOrder, middleware[ex]);
        loadableEvent.push(ex);
      }
    }

    if (loadableEvent.length > 0) {
      logger.verbose(
        `Loaded middleware ${rootPath} for event(s) \n\t${loadableEvent.join()}`
      );
    } else {
      logger.warn(`No event found in middleware ${rootPath}`);
    }
  }

  eventCallbacks.forEach((callbacks, _event) => {
    callbacks.sort((_a, _b, aKey, bKey) => {
      const [aOrder, bOrder] = [aKey, bKey].map(parseInt);
      return isNaN(aOrder) ? 1 : isNaN(bOrder) ? -1 : aOrder - bOrder;
    });
  });

  logger.profile('Loading middlewares', {
    level: 'verbose',
    message: `Loading middlewares`,
  });
}

export function excuteMiddleware<
  E extends keyof ClientEvents,
  A extends ClientEvents[E]
>(event: E, ...args: A) {}

export default loadMiddlewares;
