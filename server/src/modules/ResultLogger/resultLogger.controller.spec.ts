import { Test, TestingModule } from '@nestjs/testing';
import { ResultLoggerController } from './resultLogger.controller';
import { ResultLoggerService } from './resultLogger.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { User } from '../../entity/User';
import { AskedQuestionDto } from './dto/askedQuestion.dto';
import { resultAllMockRepository, resultUserMockRepository } from './__mocks__/resultLoggerMocks';

describe('ResultLogger Controller', () => {
  let controller: ResultLoggerController;
  let service: ResultLoggerService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultLoggerController],
      providers: [
        ResultLoggerService,
        {
          provide: getRepositoryToken(AskedQuestion),
          useValue: resultAllMockRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: resultUserMockRepository,
        },
      ],
    }).compile();

    controller = module.get<ResultLoggerController>(ResultLoggerController);
    service = module.get<ResultLoggerService>(ResultLoggerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllResults', () => {
    it('should return all results', async () => {
      const response = {
        status: (code: number) => response,
        json: (data?: any) => data,
      };
      const result: AskedQuestionDto[] = resultAllMockRepository;
      jest.spyOn(service, 'getAllResults').mockReturnValue(Promise.resolve(result));
      expect(await controller.findAllResults(response, null, false)).toBe(result);
      expect(service.getAllResults).toHaveBeenCalled();
    });
  });

  describe('findAllResultsBySessionId', () => {
    it('should return all results', async () => {
      const result: AskedQuestionDto[] = resultAllMockRepository;
      const response = {
        status: (code: number) => response,
        json: (data?: any) => data,
      };
      jest.spyOn(service, 'getAllResults').mockReturnValue(Promise.resolve(result));
      expect(await controller.findAllResults(response, '2', {})).toBe(result);
      expect(service.getAllResults).toHaveBeenCalled();
    });
  });

  describe('findAllResultsBySessionIdAndUserId', () => {
    it('should return all results', async () => {
      const result: AskedQuestionDto[] = resultAllMockRepository;
      const response = {
        status: (code: number) => response,
        json: (data?: any) => data,
      };
      jest.spyOn(service, 'getAllResults').mockReturnValue(Promise.resolve(result));
      expect(await controller.findAllResults(response, '2', {userId: '1'})).toBe(result);
      expect(service.getAllResults).toHaveBeenCalled();
    });
  });

  describe('findAllResultsBySessionIdAndTime', () => {
    it('should return all results', async () => {
      const result: AskedQuestionDto[] = resultAllMockRepository;
      const response = {
        status: (code: number) => response,
        json: (data?: any) => data,
      };
      jest.spyOn(service, 'getAllResults').mockReturnValue(Promise.resolve(result));
      expect(await controller.findAllResults(response, '2', {time: 122321})).toBe(result);
      expect(service.getAllResults).toHaveBeenCalled();
    });
  });
});
