import { Repository } from 'typeorm';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { ResultLoggerService } from './resultLogger.service';
import { AskedQuestionDto } from './dto/askedQuestion.dto';
import { resultAllMockRepository } from './__mocks__/resultLoggerMocks';
import { paramObjectMock } from './__mocks__/paramObjectMock';

describe('ResultLogger Service', () => {
  let resultLoggerService: ResultLoggerService;
  let askedQuestionRepository: Repository<AskedQuestion>;

  beforeEach(async () => {
    askedQuestionRepository = new Repository();
    resultLoggerService = new ResultLoggerService(askedQuestionRepository);
  });

  describe('getAllResults', () => {
    it('should get all results from askedQuestion repository', async () => {
      const result: AskedQuestionDto[] = resultAllMockRepository;
      jest.spyOn(askedQuestionRepository, 'find').mockReturnValue(Promise.resolve(result));

      expect(await resultLoggerService.getAllResults()).toBe(result);
      expect(askedQuestionRepository.find).toHaveBeenCalled();
    });
  });

  describe('getAllResultsBySessionId', () => {
    it('should get all results from askedQuestion repository', async () => {
      const result: AskedQuestionDto[] = resultAllMockRepository;
      jest.spyOn(askedQuestionRepository, 'find').mockReturnValue(Promise.resolve(result));

      expect(await resultLoggerService.getAllResults(2)).toBe(result);
      expect(askedQuestionRepository.find).toHaveBeenCalledWith(paramObjectMock);
    });
  });

  describe('getAllResultsBySessionIdMoreThanSpecificTime', () => {
    it('should get all results from askedQuestion repository', async () => {
      const result: AskedQuestionDto[] = [resultAllMockRepository[1]];
      jest.spyOn(askedQuestionRepository, 'find').mockReturnValue(Promise.resolve(result));

      expect(await resultLoggerService.getAllResults(2, 1554994618000)).toBe(result);
      expect(askedQuestionRepository.find).toHaveBeenCalled();
    });
  });

});
