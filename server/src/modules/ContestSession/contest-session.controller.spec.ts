import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { ContestSessionController } from './contest-session.controller';
import { ContestSessionService } from './contest-session.service';
import { ContestSessionDto, Status } from './contest-session.dto';
import { ContestSession } from '../../entity/ContestSession';
import { User } from '../../entity/User';

function generateSession(s: Partial<ContestSessionDto> = {} as ContestSessionDto) {
  const session = new ContestSession();

  session.startedTime = s.startedTime || '2000-01-01';
  session.status = s.status || Status.CREATED;

  return session;
}

describe('ManageSession Controller', () => {
  let controller: ContestSessionController;
  let manageSessionService: ContestSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContestSessionService,
        {
          provide: 'ContestSessionRepository',
          useClass: Repository,
        },
      ],
      controllers: [ContestSessionController],
    }).compile();

    controller = module.get<ContestSessionController>(ContestSessionController);
    manageSessionService = module.get<ContestSessionService>(ContestSessionService);
  });

  describe('manage controller instantiation', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('showAllSessions', () => {
    it('should get all contest-session', async () => {
      const sessions = [generateSession()];
      const mockReq = { session: { user: '1' } };

      jest
        .spyOn(manageSessionService, 'findAll')
        .mockReturnValue(Promise.resolve(sessions));

      expect(await controller.showAllSessions(mockReq)).toEqual(sessions);
      expect(manageSessionService.findAll).toHaveBeenCalled();
    });
  });

  describe('createSession', () => {
    it('should create session', async () => {
      const trainer = new User();
      const newSession: Partial<ContestSessionDto> = {
        status: Status.CREATED,
      };
      const session = generateSession(newSession);

      jest
        .spyOn(manageSessionService, 'create')
        .mockReturnValue(Promise.resolve(session));

      expect(await controller.createSession(newSession)).toEqual(session);
      expect(manageSessionService.create).toHaveBeenCalledWith(newSession);
    });
  });

  describe('showSessionById', () => {
    it('should get session by passed id', async () => {
      const session = generateSession();

      jest
        .spyOn(manageSessionService, 'findById')
        .mockReturnValue(Promise.resolve(session));

      expect(await controller.showSessionById(session.id)).toEqual(session);
      expect(manageSessionService.findById).toHaveBeenCalledWith(session.id);
    });
  });

  describe('updateSession', () => {
    it('should update session', async () => {
      const session = generateSession();
      const newData: Partial<ContestSessionDto> = {
        status: Status.IN_PROGRES,
        startedTime: '2000-01-01',
      };
      session.status = newData.status;
      session.startedTime = newData.startedTime;

      jest
        .spyOn(manageSessionService, 'update')
        .mockReturnValue(Promise.resolve(session));

      expect(await controller.updateSession(session.id, newData)).toEqual(session);
      expect(manageSessionService.update).toHaveBeenCalledWith(session.id, newData);
    });
  });
});
