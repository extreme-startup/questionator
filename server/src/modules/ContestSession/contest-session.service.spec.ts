import { Repository, UpdateResult } from 'typeorm';

import { ContestSessionService } from './contest-session.service';
import { ContestSession } from '../../entity/ContestSession';

import { ContestSessionDto, Status } from './contest-session.dto';
import { RoundService } from './round.service';
import { PlayerService } from '../Player/player.service';
import { AskQuestionsService } from '../AskQuestions/ask-questions.service';

jest.mock('../AskQuestions/ask-questions.service', () => ({
  // tslint:disable-next-line
  AskQuestionsService: function() {
    this.startAllSchedulers = () => ({});
  },
}));

function generateSession(s: Partial<ContestSessionDto> = {} as ContestSessionDto) {
  const session = new ContestSession();

  session.startedTime = s.startedTime || '2000-01-01';
  session.status = s.status || Status.CREATED;

  return session;
}

describe('ContestSessionService', () => {
  jest.mock('typeorm');

  let sessionMockRepository: Repository<ContestSession>;
  let service: ContestSessionService;

  beforeEach(async () => {
    sessionMockRepository = new Repository();
    service = new ContestSessionService(
      sessionMockRepository,
      new Repository(),
      new RoundService(new Repository()),
      new PlayerService(new Repository()),
      new AskQuestionsService(null, null),
    );
  });

  describe('manage service instantiation', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should get all session from db', async () => {
      const sessions = [generateSession()];
      const query = {};

      jest
        .spyOn(sessionMockRepository, 'find')
        .mockReturnValue(Promise.resolve(sessions));

      expect(await service.findAll(query)).toEqual(sessions);
      expect(sessionMockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should get session by passed id', async () => {
      const session = generateSession();
      jest
        .spyOn(sessionMockRepository, 'findOne')
        .mockReturnValue(Promise.resolve(session));

      expect(await service.findById(session.id)).toEqual(session);
      expect(sessionMockRepository.findOne).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should insert new session to the session table', async () => {
      const newSession: Partial<ContestSessionDto> = {
        status: Status.CREATED,
      };

      const session = generateSession(newSession);
      jest
        .spyOn(sessionMockRepository, 'save')
        .mockReturnValue(Promise.resolve(session));

      expect(await service.create(newSession)).toEqual(session);
      expect(sessionMockRepository.save).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update existing session', async () => {
      const session = generateSession();
      const newData: Partial<ContestSessionDto> = {
        status: Status.IN_PROGRESS,
        startedTime: '2000-01-01',
      };
      session.status = newData.status;
      session.startedTime = newData.startedTime;

      jest
        .spyOn(sessionMockRepository, 'update')
        .mockReturnValue(Promise.resolve({} as UpdateResult));

      jest
        .spyOn(sessionMockRepository, 'findOne')
        .mockReturnValue(Promise.resolve(session));

      expect(await service.update(newData));
      expect(sessionMockRepository.update).toHaveBeenCalledWith(session.id, newData);
    });
  });
});
