import { Controller, Get, Param } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get(':slug')
  async get(
    @Param('slug') slug: string,
  ): Promise<{ html: string; frontmatter: any }> {
    return this.contentService.findOne(slug);
  }
}
