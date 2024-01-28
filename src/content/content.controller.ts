import { Controller, Get, Param } from '@nestjs/common';
import { ContentService } from './content.service';
import { ApiResponse } from '@nestjs/swagger';
import { ContentDto } from './dto/content.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get(':slug')
  @ApiResponse({ status: 200, description: 'found content', type: ContentDto })
  @ApiResponse({ status: 404, description: 'content not found' })
  async findOne(@Param('slug') slug: string): Promise<ContentDto> {
    return this.contentService.findOne(slug);
  }
}
