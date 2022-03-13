import fsPromises from 'fs/promises';
import path from 'path';

async function* getModules(
  relativeFrom: string,
  folderPath: string
): AsyncIterableIterator<string> {
  const dir = await fsPromises.opendir(folderPath);
  for await (const dirent of dir) {
    if (dirent.isFile() && dirent.name.endsWith('.js')) {
      yield path.relative(relativeFrom, path.join(folderPath, dirent.name));
    } else if (dirent.isDirectory()) {
      yield* getModules(relativeFrom, path.join(folderPath, dirent.name));
    }
  }
}

export default getModules;
