import { Repository } from 'typeorm';

import { QuestionService } from './question.service';
import { Question } from '../../entity/Question';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { QuestionDto } from './dto/question.dto';
import { QuestionType } from '../../constants';
import { advanceTo, clear } from 'jest-date-mock';

function generateQuestion(q: QuestionDto = {} as QuestionDto): Question {
  const question = new Question();
  question.text = q.text || 'What is 2 plus 2';
  question.answer = q.answer || '4';
  question.value = q.value || 10;
  question.type = q.type || QuestionType.STATIC;
  question.isDeleted = q.isDeleted || false;

  return question;
}

describe('QuestionService', () => {
  const fakeContenderId = 'fakeContenderId';
  const fakeDate = new Date('1961-4-12');
  const anotherFakeDate = new Date('1969-6-20');
  const staticQuestion = {
    id: 'fakeId1',
    type: QuestionType.STATIC,
    text: 'What is an answer to the Ultimate Question of Life, the Universe, and Everything',
    answer: '42',
    value: 0,
    isDeleted: false,
    contest: 'fakeContextId1',
  };
  const dynamicQuestion = {
    id: 'fakeId2',
    type: QuestionType.DYNAMIC,
    contextGenerator: (() => ({
      dynamicValue: 'dynamicValue',
    })).toString(),
    text: 'dynamic question {{dynamicValue}}',
    answer: 'much dynamic {{dynamicValue}}',
    value: 0,
    isDeleted: false,
    contest: 'fakeContextId2',
  };

  const askedQuestion = {
    id: 'fakeAskedQuestionId',
    contestContenderId: fakeContenderId,
    questionId: staticQuestion.id,
    askedOn: fakeDate,
    score: 0,
    question: staticQuestion.text,
    answer: staticQuestion.answer,
  };

  jest.mock('typeorm');

  let mockRepository: Repository<Question>;
  let anotherMockRepository: Repository<AskedQuestion>;
  let service: QuestionService;

  beforeEach(async () => {
    mockRepository = new Repository();
    anotherMockRepository = new Repository();
    service = new QuestionService(mockRepository, anotherMockRepository);
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
        type: QuestionType.STATIC,
        value: 100,
        isDeleted: false,
      };
      const question = generateQuestion(newQuestion);
      jest
        .spyOn(mockRepository, 'save')
        .mockReturnValue(Promise.resolve(question));
      jest
        .spyOn(mockRepository, 'create')
        .mockReturnValue(question);

      expect(await service.insert(newQuestion)).toBe(question);
      expect(mockRepository.save).toHaveBeenCalledWith(newQuestion);
    });
  });

  describe('#ask', () => {
    it('should ask static questions as expected', async () => {
      advanceTo(fakeDate.valueOf());
      const result = await questionService.ask(staticQuestion.id, fakeContenderId);

      expect(result).toEqual({ ...askedQuestion, questionId: staticQuestion.id });
      clear();
    });

    it('should ask dynamic questions as expected', async () => {
      advanceTo(fakeDate.valueOf());
      const result = await questionService.ask(dynamicQuestion.id, fakeContenderId);

      expect(result).toEqual({
        ...askedQuestion,
        questionId: dynamicQuestion.id,
        question: dynamicQuestion.text.replace('{{dynamicValue}}', 'dynamicValue'),
        answer: dynamicQuestion.answer.replace('{{dynamicValue}}', 'dynamicValue'),
      });
    });

    it('should throw exception if question doesn\'t exist' , async () => {
      await expect(questionService.ask('garbageId', fakeContenderId)).rejects.toThrow();
    });
  });

  describe('#reply', () => {
    it('should reply with correct answers as expected', async () => {
      advanceTo(anotherFakeDate.valueOf());

      expect(await questionService.reply(askedQuestion.id, askedQuestion.answer)).toEqual({
        ...askedQuestion,
        answeredOn: anotherFakeDate,
        isCorrect: true,
      });
    });

    it('should reply with wrong answers as expected', async () => {
      advanceTo(anotherFakeDate.valueOf());

      expect(await questionService.reply(askedQuestion.id, 'bananas')).toEqual({
        ...askedQuestion,
        answeredOn: anotherFakeDate,
        isCorrect: false,
      });
    });

    it('should throw exception if asked question doesn\'t exist' , async () => {
      await expect(questionService.reply('garbageId', 'bananas')).rejects.toThrow();
    });

    it('should throw exception if answer was already given', async () => {
      await questionService.reply(askedQuestion.id, askedQuestion.answer);
      await expect(questionService.reply(askedQuestion.id, askedQuestion.answer)).rejects.toThrow();
    });
  });
});
