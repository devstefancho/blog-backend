import { Controller, Get, Param } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly markdownService: ContentService) {}

  @Get(':slug')
  async getMarkdownFile(
    @Param('slug') slug: string,
  ): Promise<{ html: string; frontmatter: any }> {
    return this.markdownService.parseMarkdownFile(slug);
  }

  @Get('nvim/:slug')
  async getNvimMarkdownFile(
    @Param('slug') slug: string,
  ): Promise<{ html: string; frontmatter: any }> {
    return this.markdownService.parseNvimMarkdownFileFromOpenWiki(slug);
  }
}
