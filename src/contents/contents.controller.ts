import { Controller, Get } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentFileData } from 'src/type/content';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get()
  getList(): Promise<ContentFileData[]> {
    return this.contentsService.getList();
  }
}
