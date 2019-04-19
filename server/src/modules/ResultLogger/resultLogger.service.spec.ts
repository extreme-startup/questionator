import { Repository } from 'typeorm';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { User } from '../../entity/User';
import { ResultLoggerService } from './resultLogger.service';

describe('ResultLogger Service', () => {
  let resultLoggerService: ResultLoggerService;
  let askedQuestionRepository: Repository<AskedQuestion>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    askedQuestionRepository = new Repository();
    resultLoggerService = new ResultLoggerService(askedQuestionRepository, userRepository);
  });

  it('should be defined', () => {
    expect(resultLoggerService).toBeDefined();
  });

});
