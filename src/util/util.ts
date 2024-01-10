import * as fs from 'fs';
import * as path from 'path';

type FileData = {
  path: string;
  name: string;
};

export const recursiveReadDir = async (entry: string): Promise<FileData[]> => {
  const results: FileData[] = [];

  async function recursiveDir(dir: string): Promise<void> {
    const _files = await fs.promises.readdir(dir, { withFileTypes: true });
    const files = _files.filter((file) => file.name !== '.git');

    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        await recursiveDir(fullPath);
      } else {
        const fileData = { path: fullPath, name: file.name };
        results.push(fileData);
      }
    }
  }

  await recursiveDir(entry);
  return results;
};
