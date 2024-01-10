import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { recursiveReadDir } from './util/util';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getJsonList(): Promise<any> {
    try {
      const filePath = path.join(process.cwd(), 'data');
      return await recursiveReadDir(filePath);
    } catch (error) {
      throw new Error('Unable to read json_list.json');
    }
  }
}
