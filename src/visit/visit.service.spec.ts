import { Test, TestingModule } from '@nestjs/testing';
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

describe('VisitService', () => {
  let service: VisitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisitService,
        {
          provide: getRepositoryToken(Visit),
          useValue: MockVisitRepository,
        },
      ],
    }).compile();

    service = module.get<VisitService>(VisitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
