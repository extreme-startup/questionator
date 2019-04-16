import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Question } from '../../entities/Question';
import { AskedQuestion } from '../../entities/AskedQuestion';

describe('Question Controller', () => {
  let controller: QuestionController;

  const mockRepository = {
    data: [{ id: 1 }, { id: 2 }],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [
        QuestionService,
        {
          provide: getRepositoryToken(Question),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(AskedQuestion),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
