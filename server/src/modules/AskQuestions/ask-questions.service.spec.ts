import { Test, TestingModule } from '@nestjs/testing';
import { AskQuestionsService } from './ask-questions.service';

describe('SchedulerService', () => {
  let service: AskQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AskQuestionsService],
    }).compile();

    service = module.get<AskQuestionsService>(AskQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
