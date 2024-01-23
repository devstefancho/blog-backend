import { Test, TestingModule } from '@nestjs/testing';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Visit } from './entities/visit.entity';

class MockVisitRepository {
  save = jest.fn();
  count = jest.fn();
  findOne = jest.fn();
  update = jest.fn();
  remove = jest.fn();
}

describe('VisitController', () => {
  let controller: VisitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitController],
      providers: [
        VisitService,
        {
          provide: getRepositoryToken(Visit),
          useValue: MockVisitRepository,
        },
      ],
    }).compile();

    controller = module.get<VisitController>(VisitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
