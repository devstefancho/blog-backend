import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as matter from 'gray-matter';
import { markedExtended } from 'src/config/marked';

@Injectable()
export class ContentService {
  async parseMarkdownFile(
    filePath: string,
  ): Promise<{ html: string; frontmatter: any; content: string }> {
    const fullPath = path.join(
      process.cwd(),
      'data',
      'content',
      `${filePath}.md`,
    );
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const parsedMarkdown = matter(fileContents);

    return {
      html: markedExtended(parsedMarkdown.content) as string,
      frontmatter: parsedMarkdown.data,
      content: parsedMarkdown.content,
    };
  }

  async parseNvimMarkdownFileFromOpenWiki(
    filePath: string,
  ): Promise<{ html: string; frontmatter: any; content: string }> {
    const fullPath = path.join(
      process.cwd(),
      'data/blog/areas/nvim',
      `${filePath}.md`,
    );
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const parsedMarkdown = matter(fileContents);

    return {
      html: markedExtended(parsedMarkdown.content) as string,
      frontmatter: parsedMarkdown.data,
      content: parsedMarkdown.content,
    };
  }
}
