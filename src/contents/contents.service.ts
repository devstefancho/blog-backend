import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { ContentFileData } from 'src/type/content';
import { recursiveReadDir } from 'src/util/util';

@Injectable()
export class ContentsService {
  async getList(): Promise<ContentFileData[]> {
    try {
      const filePath = path.join(process.cwd(), 'data');
      return await recursiveReadDir(filePath);
    } catch (error) {
      throw new Error('Error while reading contents');
    }
  }
}
