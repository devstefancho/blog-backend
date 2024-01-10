import * as fs from 'fs';
import * as path from 'path';

type FileData = {
  path: string;
  name: string;
};

export const recursiveReadDir = async (entry: string): Promise<FileData[]> => {
  const results: FileData[] = [];

  function addToResult(_fileData: FileData) {
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
        const fileData = { path: fullPath, name: file.name };
        addToResult(fileData);
      }
    }
  }

  await recursiveDir(entry);
  return results;
};
