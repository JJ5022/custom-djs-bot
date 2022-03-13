import path from 'path';
import getModules from '../utils/getModules';

it('should be able to load all models', async () => {
  const modules = getModules(__dirname, path.join('.', 'build', 'events'));
  for await (const module of modules) {
    const model = await import(`${module}`);
    expect(model.default).toBeDefined();

    expect(model.default.load).toBeDefined();
    expect(model.default.load).toBeInstanceOf(Function);

    expect(model.default.save).toBeDefined();
    expect(model.default.save).toBeInstanceOf(Function);
  }
});
