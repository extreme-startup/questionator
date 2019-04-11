import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Question } from '../../entity/Question';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { QuestionType } from '../../constants';
import { advanceTo, clear } from 'jest-date-mock';
describe('QuestionService', () => {
  let questionService: QuestionService;

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

  class MockRepository {
    private repo: any[];

    constructor(repo) {
      this.repo = repo;
    }

    find() {
      return Promise.resolve(this.repo);
    }

    findOne({ id }) {
      const result = this.repo
        .find(item => item.id === id);
      return Promise.resolve(result ? { ...result } : undefined);
    }

    save(itemToSave) {
      itemToSave.id = 'fakeAskedQuestionId';
      this.repo = [
        this.repo.filter(item => item.id === itemToSave.id),
        itemToSave,
      ];
      return Promise.resolve(itemToSave);
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: getRepositoryToken(Question),
          useValue: new MockRepository([
            staticQuestion,
            dynamicQuestion,
          ]),
        },
        {
          provide: getRepositoryToken(AskedQuestion),
          useValue: new MockRepository([
            askedQuestion,
          ]),
        },
      ],
    }).compile();

    questionService = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(questionService).toBeDefined();
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
