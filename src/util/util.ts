import * as fs from 'fs';
import * as path from 'path';

export const recursiveReadDir = async (entry: string): Promise<string[]> => {
  const results: string[] = [];

  async function recursiveDir(dir: string): Promise<void> {
    const files = await fs.promises.readdir(dir, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        await recursiveDir(fullPath);
      } else {
        results.push(fullPath);
      }
    }
  }

  await recursiveDir(entry);
  return results;
};
