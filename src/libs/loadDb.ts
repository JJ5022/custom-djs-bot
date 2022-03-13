import path from 'path';
import getModules from '../utils/getModules';
import logger from '../utils/logger';

export async function loadDb(): Promise<any> {
  const modules = getModules(__dirname, path.join('.', 'build', 'models'));
  for await (const module of modules) {
    const rootPath = path.relative(
      path.resolve('.'),
      path.join(__dirname, module)
    );
    const model = await import(module);
    if (model.default && typeof model.default.load === 'function') {
      await model.default.load();
      logger.verbose(
        `Loaded model: ${path.basename(rootPath)} from "${rootPath}"`
      );
    } else {
      logger.warn(`Fail to import model from ${rootPath}`);
    }
  }
}

export default loadDb;
