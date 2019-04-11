import { Test, TestingModule } from '@nestjs/testing';
import { ResultLoggerController } from './resultLogger.controller';
import { ResultLoggerService } from './resultLogger.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AskedQuestion } from '../../entity/AskedQuestion';
import {
  resultAllMockRepository,
} from './__mocks__/resultLoggerMocks';

describe('ResultLogger Controller', () => {
  let controller: ResultLoggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultLoggerController],
      providers: [
        ResultLoggerService,
        {
          provide: getRepositoryToken(AskedQuestion),
          useValue: resultAllMockRepository,
        },
      ],
    }).compile();

    controller = module.get<ResultLoggerController>(ResultLoggerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
