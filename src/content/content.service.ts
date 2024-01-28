import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as matter from 'gray-matter';
import { markedExtended } from 'src/config/marked';
import { recursiveReadDir } from 'src/shared/util/util';
import { ContentDto } from './dto/content.dto';
import { FrontMatter } from 'src/shared/type/content';

@Injectable()
export class ContentService {
  async findOne(slug: string): Promise<ContentDto> {
    const dataPath = path.join(process.cwd(), 'data');
    const files = await recursiveReadDir(dataPath);
    const file = files.find((f) => f.name === `${slug}.md`);

    if (!file) {
      throw new NotFoundException('content not found');
    }

    const fullPath = path.join(file.path);
    const fileData = fs.readFileSync(fullPath, 'utf8');
    const parsedData = matter(fileData);

    return {
      html: markedExtended(parsedData.content) as string,
      frontmatter: parsedData.data as FrontMatter,
      content: parsedData.content,
    };
  }
}
