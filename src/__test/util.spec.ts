import * as mockFs from 'mock-fs';
import * as path from 'path';
import { recursiveReadDir } from 'src/shared/util/util';

beforeEach(() => {
  mockFs({
    mock: {
      'file1.md': 'This is file 1',
      'file2.md': 'This is file 2',
      'file3.txt': 'This is file 3 text file',
      subdir: {
        'file3.md': 'This is file 3',
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
    {
      path: path.join(directoryPath, 'mock/file1.md'),
      name: 'file1.md',
      slug: 'file1',
    },
    {
      path: path.join(directoryPath, 'mock/file2.md'),
      name: 'file2.md',
      slug: 'file2',
    },
    {
      path: path.join(directoryPath, 'mock/subdir', 'file3.md'),
      name: 'file3.md',
      slug: 'file3',
    },
  ].sort();

  const result = await recursiveReadDir(directoryPath);
  expect(result.sort()).toEqual(expectedFiles);
});
