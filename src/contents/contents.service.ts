import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { ContentFileData, FrontMatter } from 'src/shared/type/content';
import { recursiveReadDir, getFrontMatter } from 'src/shared/util/util';

@Injectable()
export class ContentsService {
  async findAll(): Promise<(ContentFileData & { frontMatter: FrontMatter })[]> {
    try {
      const filePath = path.join(process.cwd(), 'data');
      const files = await recursiveReadDir(filePath);
      return files.map((file) => {
        return {
          ...file,
          frontMatter: getFrontMatter(file.path),
        };
      });
    } catch (error) {
      throw new Error('Error while reading contents');
    }
  }
}
