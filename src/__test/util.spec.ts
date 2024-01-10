import * as mockFs from 'mock-fs';
import * as path from 'path';
import { recursiveReadDir } from 'src/util/util';

beforeEach(() => {
  mockFs({
    mock: {
      'file1.txt': 'This is file 1',
      'file2.txt': 'This is file 2',
      subdir: {
        'file3.txt': 'This is file 3',
      },
    },
  });
});

afterEach(() => {
  mockFs.restore();
});

test('should list all files in a directory recursively', async () => {
  const directoryPath = path.join(__dirname, '../../.');
  const expectedFiles = [
    { path: path.join(directoryPath, 'mock/file1.txt'), name: 'file1.txt' },
    { path: path.join(directoryPath, 'mock/file2.txt'), name: 'file2.txt' },
    {
      path: path.join(directoryPath, 'mock/subdir', 'file3.txt'),
      name: 'file3.txt',
    },
  ].sort();

  const result = await recursiveReadDir(directoryPath);
  expect(result.sort()).toEqual(expectedFiles);
});
