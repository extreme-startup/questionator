import { Repository, UpdateResult } from 'typeorm';

import { ManageSessionService } from './manage-session.service';
import { ManageSessionEntity } from '../../entity/ManageSessionEntity';
import { User } from '../../entity/User';
import { ManageSessionDto, SessionStatus } from './ManageSession.dto';

function generateSession(s: Partial<ManageSessionDto> = {} as ManageSessionDto) {
  const session = new ManageSessionEntity();
  const trainer = new User();
  session.startedTime = s.startedTime || '2000-01-01';
  session.status = s.status || SessionStatus.CREATED;
  session.trainer = trainer;

  return session;
}

describe('ManageSessionService', () => {
  jest.mock('typeorm');

  let sessionMockRepository: Repository<ManageSessionEntity>;
  let userMockRepository: Repository<User>;
  let service: ManageSessionService;

  beforeEach(async () => {
    sessionMockRepository = new Repository();
    userMockRepository = new Repository();
    service = new ManageSessionService(sessionMockRepository, userMockRepository);
  });

  describe('manage service instantiation', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should get all session from db', async () => {
      const sessions = [generateSession()];
      const userId = sessions[0].trainer.id;
      const query = {};

      jest
        .spyOn(sessionMockRepository, 'find')
        .mockReturnValue(Promise.resolve(sessions));

      expect(await service.findAll(userId, query)).toEqual(sessions);
      expect(sessionMockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should get session by passed id', async () => {
      const session = generateSession();
      const trainerId = '1';

      jest
        .spyOn(sessionMockRepository, 'findOne')
        .mockReturnValue(Promise.resolve(session));

      expect(await service.findById(session.id, trainerId)).toEqual(session);
      expect(sessionMockRepository.findOne).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should insert new session to the session table', async () => {
      const trainer = new User();
      const newSession: Partial<ManageSessionDto> = {
        status: SessionStatus.CREATED,
        trainer,
      };

      const session = generateSession(newSession);
      jest
        .spyOn(sessionMockRepository, 'save')
        .mockReturnValue(Promise.resolve(session));

      jest
        .spyOn(userMockRepository, 'findOne')
        .mockReturnValue(Promise.resolve(trainer));

      expect(await service.create(newSession, { userId: trainer.id })).toEqual(session);
      expect(sessionMockRepository.save).toHaveBeenCalled();
      expect(userMockRepository.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update existing session', async () => {
      const session = generateSession();
      const newData: Partial<ManageSessionDto> = {
        status: SessionStatus.IN_PROGRESS,
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

      expect(await service.update(session.id, newData));
      expect(sessionMockRepository.update).toHaveBeenCalledWith(session.id, newData);
    });
  });
});
