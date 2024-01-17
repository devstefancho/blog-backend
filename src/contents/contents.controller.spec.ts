import { Test } from '@nestjs/testing';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';

const mockContentsService = {
  findAll: jest.fn().mockImplementation(() => [
    {
      html: '<h1>test</h1>',
      frontmatter: { title: 'test' },
      content: 'test',
    },
  ]),
};

describe('ContentsController', () => {
  let contentsController: ContentsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ContentsService],
      controllers: [ContentsController],
    })
      .overrideProvider(ContentsService)
      .useValue(mockContentsService)
      .compile();

    contentsController = module.get<ContentsController>(ContentsController);
  });

  it('should be defined', () => {
    expect(contentsController).toBeDefined();
  });

  it('should return all contents', async () => {
    expect(await contentsController.findAll()).toStrictEqual([
      {
        html: '<h1>test1</h1>',
        frontmatter: { title: 'test' },
        content: 'test',
      },
    ]);
  });
});
