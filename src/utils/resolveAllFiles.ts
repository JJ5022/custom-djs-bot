import fsPromise from 'fs/promises';
import path from 'path';

export async function resolveAllFiles(folderPath: string): Promise<string[]> {
  const filenames = await fsPromise.readdir(folderPath);
  const files: string[] = [];
  for (const file of filenames) {
    const stat = await fsPromise.stat(path.join(folderPath, file));
    if (stat.isFile()) {
      files.push(path.join(folderPath, file));
    } else if (stat.isDirectory()) {
      files.push(...(await resolveAllFiles(path.join(folderPath, file))));
    }
  }

  return files;
}

export default resolveAllFiles;
