import path from 'path';
import getJsFiles from '../utils/getFiles';
import logger from '../utils/logger';

export async function loadDb(): Promise<any> {
  const files = await getJsFiles('./build/models');
  for (const file of files) {
    const model = await import(`./${file}`);
    if (model.default && model.default.load) {
      model.default.load();
    } else {
      logger.error(`Model ${file} is not loaded`);
    }
  }
}

export default loadDb;
