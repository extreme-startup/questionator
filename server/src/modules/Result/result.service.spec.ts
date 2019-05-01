import { Repository } from 'typeorm';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { ResultService } from './result.service';

describe('ResultLogger Service', () => {
  let resultLoggerService: ResultService;
  let askedQuestionRepository: Repository<AskedQuestion>;

  beforeEach(async () => {
    askedQuestionRepository = new Repository();
    resultLoggerService = new ResultService(askedQuestionRepository);
  });

  it('should be defined', () => {
    expect(resultLoggerService).toBeDefined();
  });

});
