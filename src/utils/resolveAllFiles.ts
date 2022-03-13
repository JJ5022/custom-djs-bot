import fsPromise from 'fs/promises';
import path from 'path';

/** @deprecated use getModules */
export async function resolveAllJsFiles(folderPath: string): Promise<string[]> {
  const filenames = await fsPromise.readdir(folderPath);
  const files: string[] = [];
  for (const file of filenames) {
    const stat = await fsPromise.stat(path.join(folderPath, file));
    if (stat.isFile() && file.endsWith('.js')) {
      files.push(path.join(folderPath, file));
    } else if (stat.isDirectory()) {
      files.push(...(await resolveAllJsFiles(path.join(folderPath, file))));
    }
  }

  return files;
}

export default resolveAllJsFiles;
