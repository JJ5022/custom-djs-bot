import fsPromises from 'fs/promises';
import path from 'path';

export async function getJsFiles(dir: string): Promise<string[]> {
  const files = await fsPromises.readdir(dir);
  const jsFiles = files.filter(
    file => file.endsWith('.js') && !file.startsWith('index')
  );
  return jsFiles;
}

export default getJsFiles;
