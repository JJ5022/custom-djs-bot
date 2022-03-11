import path from 'path';
import getJsFiles from '../utils/getFiles';

it('should be able to load all models', async () => {
  const files = await getJsFiles(__dirname);
  for (const file of files) {
    const model = await import(`./${file}`);
    expect(model.default).toBeDefined();

    expect(model.default.load).toBeDefined();
    expect(model.default.load).toBeInstanceOf(Function);

    expect(model.default.save).toBeDefined();
    expect(model.default.save).toBeInstanceOf(Function);
  }
});
