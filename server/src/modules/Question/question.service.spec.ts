import { Repository } from 'typeorm';

import { QuestionService } from './question.service';
import { Question } from '../../entity/Question';
import { QuestionDto } from './question.dto';

function generateQuestion(q: QuestionDto = {} as QuestionDto): Question {
  const question = new Question();
  question.text = q.text || 'What is 2 plus 2';
  question.answer = q.answer || '4';
  question.value = q.value || '10';
  question.type = q.type || '1';
  question.isDeleted = q.isDeleted || false;

  return question;
}

describe('QuestionService', () => {
  jest.mock('typeorm');

  let mockRepository: Repository<Question>;
  let service: QuestionService;

  beforeEach(async () => {
    mockRepository = new Repository();
    service = new QuestionService(mockRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should get all consents from consent repository', async () => {
      const result: Question[] = [generateQuestion()];
      jest
        .spyOn(mockRepository, 'find')
        .mockReturnValue(Promise.resolve(result));

      expect(await service.findAll()).toBe(result);
      expect(mockRepository.find).toHaveBeenCalledWith();
    });
  });

  describe('findById', () => {
    it('should get question by id from question repository', async () => {
      const question = generateQuestion();
      jest
        .spyOn(mockRepository, 'findOne')
        .mockReturnValue(Promise.resolve(question));

      expect(await service.findById(question.id)).toBe(question);
      expect(mockRepository.findOne).toHaveBeenCalledWith(question.id);
    });
  });

  describe('getRandom', () => {
    it('should get random question from question table', async () => {
      const question = generateQuestion();
      const mockQueryBuilderFn = jest.fn(() => ({
        orderBy: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValue(Promise.resolve(question)),
      }));

      jest
        .spyOn(mockRepository, 'createQueryBuilder')
        .mockReturnValue(mockQueryBuilderFn() as any);

      expect(await service.getRandom()).toBeInstanceOf(Question);
    });
  });

  describe('insert', () => {
    it('should insert new question to the question table', async () => {
      const newQuestion: QuestionDto = {
        text: 'hello',
        answer: 'hey',
        type: '2',
        value: '100',
        isDeleted: false,
      };
      const question = generateQuestion(newQuestion);
      jest
        .spyOn(mockRepository, 'save')
        .mockReturnValue(Promise.resolve(question));

      expect(await service.insert(newQuestion)).toBe(question);
      expect(mockRepository.save).toHaveBeenCalledWith(newQuestion);
    });
  });
});
