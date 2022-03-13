import path from 'path';
import { djsEvent, djsDeprecatedEvent } from '../utils/djsEvent';
import getModules from '../utils/getModules';

describe('Testing event', () => {
  it('should be able to import event', async () => {
    const modules = getModules(__dirname, path.join('.', 'build', 'events'));
    for await (const module of modules) {
      const event = await import(`${module}`);
      expect(event.name).toBeDefined();
      expect(event.default).toBeDefined();
      expect(djsEvent.includes(event.name)).toBeTruthy();
      expect(djsDeprecatedEvent.includes(event.name)).toBeFalsy();
    }
  });
});
