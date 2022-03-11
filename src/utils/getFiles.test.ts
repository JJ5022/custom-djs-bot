import getJsFiles from './getFiles';

describe('Get JS Files in a dir', () => {
  it('should be able to get files', async () => {
    const dir = './test/utils/withThreeFiles';
    const files = await getJsFiles(dir);
    expect(files.length).toBe(3);
    expect(files.includes('test0.js')).toBeTruthy();
    expect(files.includes('test1.js')).toBeTruthy();
    expect(files.includes('test2.js')).toBeTruthy();
  });

  it('should not be able to find JS file in folder with no JS file', async () => {
    const dir = './test/utils/empty';
    const files = await getJsFiles(dir);
    expect(files.length).toBe(0);
  });
});
