import * as fs from 'fs';
import * as path from 'path';
import { ContentFileData } from 'src/type/content';

export const recursiveReadDir = async (
  entry: string,
): Promise<ContentFileData[]> => {
  const results: ContentFileData[] = [];

  function addToResult(_fileData: ContentFileData) {
    const { name } = _fileData;
    if (name.endsWith('.md') && name !== 'README.md') {
      results.push(_fileData);
    }
  }

  async function recursiveDir(dir: string): Promise<void> {
    const _files = await fs.promises.readdir(dir, { withFileTypes: true });
    const files = _files.filter((file) => file.name !== '.git');

    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        await recursiveDir(fullPath);
      } else {
        const fileData = {
          path: fullPath,
          name: file.name,
          slug: file.name.split('.')[0], // 현재는 slug와 파일명이 같다고 가정하기 때문에 확장자만 제거
        };
        addToResult(fileData);
      }
    }
  }

  await recursiveDir(entry);
  return results;
};
