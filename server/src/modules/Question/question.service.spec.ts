import { Repository } from 'typeorm';

import { QuestionService } from './question.service';
import { Question } from '../../entity/Question';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { QuestionDto } from './dto/question.dto';
import { QuestionType } from '../../constants';
import { advanceTo, clear } from 'jest-date-mock';
import { AskedQuestionDto } from './dto/askedQuestion.dto';
import { MockRepository } from '../Contest/__mocks__/mocks';
import { QuestionCreateDto } from '../../modules/Question/dto/question-create.dto';
import { toQuestionDto } from '../../modules/Question/helpers/questions.helper';
import { Contest } from '../../entity/Contest';
import { ContestSession } from '../../entity/ContestSession';
import { Round } from '../../entity/Round';
import { Player } from '../../entity/Player';

function generateQuestion(q: QuestionDto | QuestionCreateDto = {} as QuestionDto | QuestionCreateDto): Question {
  const question = new Question();
  question.id = undefined;
  question.text = q.text || 'What is 2 plus 2';
  question.answer = q.answer || '4';
  question.value = q.value || 10;
  question.type = q.type || QuestionType.STATIC;
  question.deleted = false;

  return question;
}

function generateAskedQuestion(q: AskedQuestionDto = {} as AskedQuestionDto): AskedQuestion {
  const askedQuestion = new AskedQuestion();
  askedQuestion.text = q.question || 'What is 2 plus 2';
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
  let mockContestRepository: Repository<Contest>;
  let mockContestSessionRepository: Repository<ContestSession>;
  let service: QuestionService;

  beforeEach(async () => {
    mockQuestionRepository = new MockRepository();
    mockAskedQuestionRepository = new MockRepository();
    mockContestRepository = new MockRepository();
    mockContestSessionRepository = new MockRepository();
    service = new QuestionService(
      mockQuestionRepository,
      mockAskedQuestionRepository,
      mockContestRepository,
      mockContestSessionRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should get all consents from consent repository', async () => {
      const questions: Question[] = [generateQuestion()];
      const result = questions.map(toQuestionDto);
      jest
        .spyOn(mockQuestionRepository, 'find')
        .mockReturnValue(Promise.resolve(questions));

      expect(await service.findAll()).toEqual({
        data: result,
        error: undefined,
      });
      expect(mockQuestionRepository.find).toHaveBeenCalledWith();
    });
  });

  describe('findById', () => {
    it('should get question by id from question repository', async () => {
      const question = generateQuestion();
      const result = toQuestionDto(question);
      jest
        .spyOn(mockQuestionRepository, 'findOne')
        .mockReturnValue(Promise.resolve(question));

      expect(await service.findById(question.id)).toEqual({
        data: result,
        error: undefined,
      });
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

      expect((await service.getRandom()).data).toEqual(toQuestionDto(question));
    });
  });

  describe('insert', () => {
    it('should insert new question to the question table', async () => {
      const newQuestion: QuestionCreateDto = {
        text: 'hello',
        answer: 'hey',
        type: QuestionType.STATIC,
        value: 100,
        contestId: '1',
      };
      const contest = new Contest();
      const contestSession = new ContestSession();
      contestSession.rounds = [new Round()];
      contest.contestSessions = [contestSession];
      const question = generateQuestion(newQuestion);
      jest
        .spyOn(mockContestRepository, 'findOne')
        .mockReturnValue(Promise.resolve(contest));
      jest
        .spyOn(mockContestSessionRepository, 'findOne')
        .mockReturnValue(Promise.resolve(contestSession));
      jest
        .spyOn(mockQuestionRepository, 'save')
        .mockReturnValue(Promise.resolve(question));
      jest
        .spyOn(mockQuestionRepository, 'create')
        .mockReturnValue(question);

      expect(await service.insert(newQuestion)).toEqual({
        data: toQuestionDto(question),
        error: undefined,
      });
      expect(mockQuestionRepository.save).toHaveBeenCalledWith(question);
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
      await service.ask('someValidId', {
        id: 'some-player-id',
        contestSession: null,
      } as Player);

      expect(mockAskedQuestionRepository.save).toHaveBeenLastCalledWith(expect.objectContaining({
        question,
        askedOn: fakeDate,
        text: question.text,
        answer: question.answer,
        score: question.value,
      }));
      clear();
    });

    it('should throw exception if question doesn\'t exist', async () => {
      jest
        .spyOn(mockQuestionRepository, 'findOne')
        .mockReturnValue(Promise.resolve(undefined));
      await expect(service.ask('garbageId', {
        id: 'some-player-id',
        contestSession: null,
      } as Player)).rejects.toThrow();
      clear();
    });
  });

  describe('reply', () => {
    it('should reply with correct answers as expected', async () => {
      const askedQuestion = generateAskedQuestion();
      askedQuestion.askedOn = fakeDate;
      askedQuestion.answer = 'answer';

      jest
        .spyOn(mockAskedQuestionRepository, 'findOneOrFail')
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
        .spyOn(mockAskedQuestionRepository, 'findOneOrFail')
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

    it('should throw exception if asked question doesn\'t exist', async () => {
      jest
        .spyOn(mockAskedQuestionRepository, 'findOne')
        .mockReturnValue(Promise.resolve(undefined));

      await expect(service.reply('someValidId', 'something')).rejects.toThrow();
    });

    it('should throw exception if answer was already given', async () => {
      const askedQuestion = generateAskedQuestion();
      askedQuestion.answeredOn = fakeDate;

      jest
        .spyOn(mockAskedQuestionRepository, 'findOne')
        .mockReturnValue(Promise.resolve(askedQuestion));

      await expect(service.reply('validId', 'something')).rejects.toThrow();
    });
  });
});
