import { Test, TestingModule } from '@nestjs/testing';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';

describe('ContentService', () => {
  let service: ContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentService],
      controllers: [ContentController],
    }).compile();

    service = module.get<ContentService>(ContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
