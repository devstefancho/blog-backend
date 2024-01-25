import { Controller, Get } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentFileData } from 'src/shared/type/content';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get()
  findAll(): Promise<ContentFileData[]> {
    return this.contentsService.findAll();
  }
}
