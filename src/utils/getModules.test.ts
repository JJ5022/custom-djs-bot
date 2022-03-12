import fsPromises from 'fs/promises';
import path from 'path';

describe(`Create relative path from absolute path `, () => {
  it(`should return relative path from absolute path`, () => {
    expect(path.relative(path.resolve('.'), __filename)).toBe(
      path.join('.', 'src', 'utils', 'getModules.test.ts')
    );
  });
});
