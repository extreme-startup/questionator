import { Test, TestingModule } from '@nestjs/testing';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { AskedQuestionDto } from './dto/askedQuestion.dto';
import { resultAllMockRepository } from './__mocks__/resultMocks';

describe('ResultLogger Controller', () => {
  let controller: ResultController;
  let service: ResultService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultController],
      providers: [
        ResultService,
        {
          provide: getRepositoryToken(AskedQuestion),
          useValue: resultAllMockRepository,
        },
      ],
    }).compile();

    controller = module.get<ResultController>(ResultController);
    service = module.get<ResultService>(ResultService);
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
      const result: AskedQuestion[] = resultAllMockRepository;
      jest.spyOn(service, 'getAllResults').mockReturnValue(Promise.resolve(result));
      expect(await controller.findAllResults(response, null, false)).toBe(result);
      expect(service.getAllResults).toHaveBeenCalled();
    });
  });

  describe('findAllResultsBySessionId', () => {
    it('should return all results', async () => {
      const result: AskedQuestion[] = resultAllMockRepository;
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
      const result: AskedQuestion[] = resultAllMockRepository;
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
      const result: AskedQuestion[] = resultAllMockRepository;
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
