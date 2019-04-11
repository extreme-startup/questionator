import { Repository } from 'typeorm';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { Contest } from '../../entity/Contest';
import { ResultLoggerService } from './resultLogger.service';
import { AskedQuestionDto } from './dto/askedQuestion.dto';
import {
  resultAllMockRepository,
} from './__mocks__/resultLoggerMocks';

describe('ResultLogger Service', () => {
  let resultLoggerService: ResultLoggerService;
  let askedQuestionRepository: Repository<AskedQuestion>;
  let contestRepository: Repository<Contest>;

  beforeEach(async () => {
    askedQuestionRepository = new Repository();
    contestRepository = new Repository();
    resultLoggerService = new ResultLoggerService(askedQuestionRepository);
  });

  describe('findAllContendersByContestId', () => {
    it('should get all results from askedQuestion repository', async () => {
      const result: AskedQuestionDto[] = [resultAllMockRepository];
      jest.spyOn(askedQuestionRepository, 'find').mockReturnValue(Promise.resolve(result));

      expect(await resultLoggerService.findContendersByContestId('1')).toBe(result);
      expect(askedQuestionRepository.find).toHaveBeenCalledWith({ id: '1' });
    });
  });

  describe('findUserResultsByUserIdAndContestId', () => {
    it('should get all user results from askedQuestion repository', async () => {
      const result: AskedQuestionDto[] = [resultAllMockRepository];
      jest.spyOn(askedQuestionRepository, 'find').mockReturnValue(Promise.resolve(result));

      expect(await ResultLoggerService.findUserResultsByContestIdAndUserId('1', '1'))
        .toBe(result);
      expect(askedQuestionRepository.find).toHaveBeenCalledWith('1', '1');
    });
  });
});
