import { Test, TestingModule } from '@nestjs/testing';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';

describe('ContentController', () => {
  let contentController: ContentController;
  let contentService: ContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentService],
      controllers: [ContentController],
    }).compile();

    contentService = module.get<ContentService>(ContentService);
    contentController = module.get<ContentController>(ContentController);
  });

  it('should be defined', () => {
    expect(contentController).toBeDefined();
  });

  it('should return one content', async () => {
    const result = Promise.resolve({
      html: '<h1>test</h1>',
      frontmatter: { title: 'test' },
      content: 'test',
    });

    jest.spyOn(contentService, 'findOne').mockImplementation(() => result);
    expect(await contentController.findOne('')).toBe(await result);
  });
});
