import fsPromises from 'fs/promises';
import path from 'path';

describe(`Get Modules `, () => {
  it(`should return relative path from absolute path`, () => {
    expect(path.relative(path.resolve('.'), __filename)).toBe(
      path.join('.', 'src', 'utils', 'getModules.test.ts')
    );
  });

  const getFiles = async (folderPath: string): Promise<string[]> => {
    const filenames = await fsPromises.readdir(folderPath);
    const files: string[] = [];
    for (const file of filenames) {
      const stat = await fsPromises.stat(path.join(folderPath, file));
      if (stat.isFile() && file.endsWith('.js')) {
        files.push(path.join(folderPath, file));
      } else if (stat.isDirectory()) {
        files.push(...(await getFiles(path.join(folderPath, file))));
      }
    }

    return files;
  };

  it('should be able to locate all nested file', async () => {
    const files = await getFiles(
      path.resolve('.', 'test', 'utils', 'nestedJsFile')
    );

    expect(files).toContain(path.resolve('test/utils/nestedJsFile/test.js'));
    expect(files).toContain(
      path.resolve('test/utils/nestedJsFile/inner/test.js')
    );
    expect(files).toContain(
      path.resolve('test/utils/nestedJsFile/inner/inner/test.js')
    );
  });

  it('should be able to locate all nested file with relative path', async () => {
    let files = await getFiles(
      path.resolve('.', 'test', 'utils', 'nestedJsFile')
    );

    console.log(files);
    console.log(__filename);
    files = files.map(file => path.relative(__dirname, file));
    console.log(files);

    expect(files).toContain(
      path.join('..', '..', 'test', 'utils', 'nestedJsFile', 'test.js')
    );
    expect(files).toContain(
      path.join('..', '..', 'test', 'utils', 'nestedJsFile', 'inner', 'test.js')
    );
    expect(files).toContain(
      path.join(
        '..',
        '..',
        'test',
        'utils',
        'nestedJsFile',
        'inner',
        'inner',
        'test.js'
      )
    );
  });
});
