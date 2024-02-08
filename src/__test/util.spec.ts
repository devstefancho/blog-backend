import * as mockFs from 'mock-fs';
import * as path from 'path';
import { generateExcerpt, recursiveReadDir } from 'src/shared/util/util';

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

test('excerpt generated correctly', () => {
  const content =
    '\n\n# Atomic Habits\n\n\n글쓴이: James Clear\n\n매일 1%의 향상은 1년뒤에 37배의 향상의 결과를 낸다.\n하지만, 이 과정에서 중간에 Valley of Disappointment가 발생한다.\n기대했던 결과가 특정 지점까지는 나타나지 않는 것이다.';
  const expectedResult =
    '글쓴이: James Clear매일 1%의 향상은 1년뒤에 37배의 향상의 결과를 낸다.하지만, 이 과정에서 중간에 Valley of Disappointment가 발생한다.기대했던 결과가 특정 지점까지는 나타나지 않는 것이다.'.slice(
      0,
      90,
    );
  const result = generateExcerpt(content, 'small');
  expect(result).toEqual(expectedResult);
});
