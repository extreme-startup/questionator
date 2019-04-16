import { Repository } from 'typeorm';

import { QuestionService } from './question.service';
import { Question } from '../../entities/Question';
import { AskedQuestion } from '../../entities/AskedQuestion';
import { QuestionDto } from './dto/question.dto';
import { QuestionType } from '../../constants';
import { advanceTo, clear } from 'jest-date-mock';
import { AskedQuestionDto } from './dto/askedQuestion.dto';

function generateQuestion(q: QuestionDto = {} as QuestionDto): Question {
  const question = new Question();
  question.text = q.text || 'What is 2 plus 2';
  question.answer = q.answer || '4';
  question.value = q.value || 10;
  question.type = q.type || QuestionType.STATIC;
  question.isDeleted = q.isDeleted || false;

  return question;
}

function generateAskedQuestion(q: AskedQuestionDto = {} as AskedQuestionDto): AskedQuestion {
  const askedQuestion = new AskedQuestion();
  askedQuestion.question = q.question || 'What is 2 plus 2';
  askedQuestion.score = q.score || 10;
  askedQuestion.isCorrect = q.isCorrect || false;

  return askedQuestion;
}

describe('QuestionService', () => {
  const fakeDate = new Date('1961-4-12');
  const anotherFakeDate = new Date('1969-6-20');

  jest.mock('typeorm');

  let mockQuestionRepository: Repository<Question>;
  let mockAskedQuestionRepository: Repository<AskedQuestion>;
  let service: QuestionService;

  beforeEach(async () => {
    mockQuestionRepository = new Repository();
    mockAskedQuestionRepository = new Repository();
    service = new QuestionService(mockQuestionRepository, mockAskedQuestionRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should get all consents from consent repository', async () => {
      const result: Question[] = [generateQuestion()];
      jest
        .spyOn(mockQuestionRepository, 'find')
        .mockReturnValue(Promise.resolve(result));

      expect(await service.findAll()).toBe(result);
      expect(mockQuestionRepository.find).toHaveBeenCalledWith();
    });
  });

  describe('findById', () => {
    it('should get question by id from question repository', async () => {
      const question = generateQuestion();
      jest
        .spyOn(mockQuestionRepository, 'findOne')
        .mockReturnValue(Promise.resolve(question));

      expect(await service.findById(question.id)).toBe(question);
      expect(mockQuestionRepository.findOne).toHaveBeenCalledWith(question.id);
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
        .spyOn(mockQuestionRepository, 'createQueryBuilder')
        .mockReturnValue(mockQueryBuilderFn() as any);

      expect(await service.getRandom()).toBeInstanceOf(Question);
    });
  });

  describe('insert', () => {
    it('should insert new question to the question table', async () => {
      const newQuestion: QuestionDto = {
        text: 'hello',
        answer: 'hey',
        type: QuestionType.STATIC,
        value: 100,
        isDeleted: false,
      };
      const question = generateQuestion(newQuestion);
      jest
        .spyOn(mockQuestionRepository, 'save')
        .mockReturnValue(Promise.resolve(question));
      jest
        .spyOn(mockQuestionRepository, 'create')
        .mockReturnValue(question);

      expect(await service.insert(newQuestion)).toBe(question);
      expect(mockQuestionRepository.save).toHaveBeenCalledWith(newQuestion);
    });
  });

  describe('ask', () => {
    it('should ask static questions as expected', async () => {
      const question = generateQuestion();

      jest
        .spyOn(mockQuestionRepository, 'findOne')
        .mockReturnValue(Promise.resolve(question));
      jest
        .spyOn(mockAskedQuestionRepository, 'save')
        .mockReturnValue(Promise.resolve(generateAskedQuestion()));
      advanceTo(fakeDate.valueOf());
      await service.ask('someValidId', 123);

      expect(mockAskedQuestionRepository.save).toHaveBeenLastCalledWith(expect.objectContaining({
        questionId: 'someValidId',
        contestContenderId: 123,
        askedOn: fakeDate,
        question: question.text,
        answer: question.answer,
      }));
      clear();
    });

    it('should throw exception if question doesn\'t exist' , async () => {
      jest
        .spyOn(mockQuestionRepository, 'findOne')
        .mockReturnValue(Promise.resolve(undefined));
      await expect(service.ask('garbageId', 321)).rejects.toThrow();
      clear();
    });
  });

  describe('reply', () => {
    it('should reply with correct answers as expected', async () => {
      const askedQuestion = generateAskedQuestion();
      askedQuestion.askedOn = fakeDate;
      askedQuestion.answer = 'answer';

      jest
        .spyOn(mockAskedQuestionRepository, 'findOne')
        .mockReturnValue(Promise.resolve(askedQuestion));
      jest
        .spyOn(mockAskedQuestionRepository, 'save')
        .mockReturnValue(Promise.resolve(generateAskedQuestion()));
      advanceTo(anotherFakeDate.valueOf());
      await service.reply('someValidId', askedQuestion.answer);

      expect(mockAskedQuestionRepository.save).toHaveBeenLastCalledWith(expect.objectContaining({
        answeredOn: anotherFakeDate,
        answer: askedQuestion.answer,
        isCorrect: true,
      }));
      clear();
    });

    it('should reply with wrong answers as expected', async () => {
      const askedQuestion = generateAskedQuestion();
      askedQuestion.askedOn = fakeDate;
      askedQuestion.answer = 'answer';

      jest
        .spyOn(mockAskedQuestionRepository, 'findOne')
        .mockReturnValue(Promise.resolve(askedQuestion));
      jest
        .spyOn(mockAskedQuestionRepository, 'save')
        .mockReturnValue(Promise.resolve(generateAskedQuestion()));
      advanceTo(anotherFakeDate.valueOf());
      await service.reply('someValidId', 'bananas');

      expect(mockAskedQuestionRepository.save).toHaveBeenLastCalledWith(expect.objectContaining({
        answeredOn: anotherFakeDate,
        answer: askedQuestion.answer,
        isCorrect: false,
      }));
      clear();
    });

    it('should throw exception if asked question doesn\'t exist' , async () => {
      jest
        .spyOn(mockAskedQuestionRepository, 'findOne')
        .mockReturnValue(Promise.resolve(undefined));

      await expect(service.reply('someValidId', 'something')).rejects.toThrow();
    });

    it('should throw exception if answer was already given', async () => {
      const askedQuestion = generateAskedQuestion();
      askedQuestion.askedOn = fakeDate;

      jest
        .spyOn(mockAskedQuestionRepository, 'findOne')
        .mockReturnValue(Promise.resolve(askedQuestion));

      await expect(service.reply('validId', 'something')).rejects.toThrow();
    });
  });
});