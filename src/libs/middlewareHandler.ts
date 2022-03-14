import { Client, ClientEvents, Collection } from 'discord.js';
import logger from '../utils/logger';
import path from 'path';
import getModules from '../utils/getModules';
import { djsEvent, isDjsEvent } from '../utils/djsEvent';

interface MiddlewareHandler {
  filePath: string;
  handler: Function;
  excuteOrder: number;
}

const eventCallbacks = new Collection<
  keyof ClientEvents,
  Array<MiddlewareHandler>
>();

export async function loadMiddlewares(client: Client) {
  const modules = getModules(__dirname, path.join('.', 'build', 'middlewares'));

  logger.profile('Loading middlewares');

  for await (const module of modules) {
    const rootPath = path.relative(
      path.resolve('.'),
      path.join(__dirname, module)
    );

    const middleware = await import(module);
    const loadableEvent: string[] = [];
    const order = middleware.order;

    // Loop throgh all events
    for (const event of djsEvent) {
      if (typeof middleware[event] === 'function') {
        if (!eventCallbacks.has(event)) {
          eventCallbacks.set(event, []);
        }
        const callbacks = eventCallbacks.get(event) as Array<MiddlewareHandler>;
        const excuteIndex =
          callbacks.findIndex(
            ({ excuteOrder }) => excuteOrder && excuteOrder > order
          ) || callbacks.length;

        const previous = excuteIndex > 0 && callbacks[excuteIndex - 1];
        if (previous && previous.excuteOrder === order) {
          logger.warn(
            `Duplicate middleware order ${order} for event ${event} of ${rootPath} and ${previous.filePath}`
          );
        }

        callbacks.splice(excuteIndex, 0, {
          filePath: rootPath,
          handler: middleware[event],
          excuteOrder: order,
        });
        loadableEvent.push(event);
      }
    }

    //Loop through all exports
    /* for (const event in middleware) {
      if (isDjsEvent(event) && typeof middleware[event] === 'function') {
        if (!eventCallbacks.has(event)) {
          eventCallbacks.set(event, []);
        }
        const callbacks = eventCallbacks.get(event) as Array<MiddlewareHandler>;
        const excuteIndex =
          callbacks.findIndex(
            ({ excuteOrder }) => excuteOrder && excuteOrder > order
          ) || callbacks.length;

        callbacks.splice(excuteIndex, 0, {
          filePath: rootPath,
          handler: middleware[event],
          excuteOrder: order,
        });
        loadableEvent.push(event);
      }
    } */

    if (loadableEvent.length > 0) {
      logger.verbose(
        `Loaded middleware ${rootPath} for event(s) \n\t${loadableEvent.join()}`
      );
    } else {
      logger.warn(`No event found in middleware ${rootPath}`);
    }
  }

  logger.profile('Loading middlewares', {
    level: 'verbose',
    message: `Loading middlewares`,
  });

  for (const event of eventCallbacks.keys()) {
    client.on(event, (...args) => {
      const callbacks = eventCallbacks.get(event) as Array<MiddlewareHandler>;
      callbacks.forEach(({ handler }) => handler(client, ...args));
    });
  }
}

export default loadMiddlewares;
