import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Question } from '../../entity/Question';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { QuestionType } from '../../constants';

describe('QuestionService', () => {
  let questionService: QuestionService;

  const fakeContenderId = 'fakeContenderId';
  const fakeNewDate = new Date('1961-4-12');
  const anotherFakeNewDate = new Date('1969-6-20');
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
    askedOn: fakeNewDate,
    score: 123,
    question: staticQuestion.text,
    answer: staticQuestion.answer,
  };

  const questionsRepo = [
    staticQuestion,
    dynamicQuestion,
  ];

  const askedQuestionsRepo = [
    askedQuestion,
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: getRepositoryToken(Question),
          useValue: {
            find: () => questionsRepo,
            findOne: ({ id }) => questionsRepo
              .filter(question => question.id === id),
            save: question => questionsRepo.push(question),
          },
        },
        {
          provide: getRepositoryToken(AskedQuestion),
          useValue: {
            find: () => askedQuestionsRepo,
            findOne: ({ id }) => askedQuestionsRepo
              .filter(question => question.id === id),
            save: question => askedQuestionsRepo.push(question),
          },
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
      spyOn(Date.prototype, 'setDate').and.returnValue(fakeNewDate);

      expect(await questionService.ask(staticQuestion.id, fakeContenderId)).toEqual(askedQuestion);
    });

    it('should ask dynamic questions as expected', async () => {
      spyOn(Date.prototype, 'setDate').and.returnValue(fakeNewDate);

      expect(await questionService.ask(dynamicQuestion.id, fakeContenderId)).toEqual({
        ...askedQuestion,
        question: dynamicQuestion.text.replace('{{dynamicValue}}', 'dynamicValue'),
        answer: dynamicQuestion.answer.replace('{{dynamicValue}}', 'dynamicValue'),
      });
    });

    it('should throw exception if question doesn\'t exist' , async () => {
      expect(await questionService.ask('garbageId', fakeContenderId)).toThrow();
    });
  });

  describe('#reply', () => {
    it('should reply with correct answers as expected', async () => {
      spyOn(Date.prototype, 'setDate').and.returnValue(anotherFakeNewDate);

      expect(await questionService.reply(askedQuestion.id, askedQuestion.answer)).toEqual({
        ...askedQuestion,
        answeredOn: anotherFakeNewDate,
        isCorrect: true,
      });
    });

    it('should reply with wrong answers as expected', async () => {
      spyOn(Date.prototype, 'setDate').and.returnValue(anotherFakeNewDate);

      expect(await questionService.reply(askedQuestion.id, 'bananas')).toEqual({
        ...askedQuestion,
        answeredOn: anotherFakeNewDate,
        isCorrect: false,
      });
    });

    it('should throw exception if asked question doesn\'t exist' , async () => {
      expect(await questionService.reply('garbageId', 'bananas')).toThrow();
    });

    it('should throw exception if answer was already given', async () => {
      await questionService.reply(askedQuestion.id, askedQuestion.answer);
      expect(await questionService.reply(askedQuestion.id, askedQuestion.answer)).toThrow();
    });
  });
});
