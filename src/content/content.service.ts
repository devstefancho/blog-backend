import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as matter from 'gray-matter';
import { markedExtended } from 'src/config/marked';
import { recursiveReadDir } from 'src/util/util';

@Injectable()
export class ContentService {
  async findOne(
    slug: string,
  ): Promise<{ html: string; frontmatter: any; content: string }> {
    const dataPath = path.join(process.cwd(), 'data');
    const files = await recursiveReadDir(dataPath);
    const file = files.find((f) => f.name === `${slug}.md`);

    const fullPath = path.join(file.path);
    const fileData = fs.readFileSync(fullPath, 'utf8');
    const parsedData = matter(fileData);

    return {
      html: markedExtended(parsedData.content) as string,
      frontmatter: parsedData.data,
      content: parsedData.content,
    };
  }
}
