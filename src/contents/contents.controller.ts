import { Controller, Get, Query } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentFileData } from 'src/shared/type/content';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get()
  findAll(
    @Query('excerpt_size') excerpt_size: string,
  ): Promise<ContentFileData[]> {
    return this.contentsService.findAll(Number(excerpt_size) || 120);
  }
}
