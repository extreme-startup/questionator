import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { ManageSessionController } from './manage-session.controller';
import { ManageSessionService } from './manage-session.service';
import { ManageSessionDto, SessionStatus } from './ManageSession.dto';
import { ManageSessionEntity } from '../../entity/ManageSessionEntity';
import { User } from '../../entity/User';

function generateSession(s: Partial<ManageSessionDto> = {} as ManageSessionDto): ManageSessionDto {
  const session = new ManageSessionEntity();
  const trainer = new User();
  session.startedTime = s.startedTime || '2000-01-01';
  session.status = s.status || SessionStatus.CREATED;
  session.trainer = trainer;

  return session;
}

describe('ManageSession Controller', () => {
  let controller: ManageSessionController;
  let manageSessionService: ManageSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ManageSessionService,
        {
          provide: 'ManageSessionEntityRepository',
          useClass: Repository,
        },
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
      ],
      controllers: [ManageSessionController],
    }).compile();

    controller = module.get<ManageSessionController>(ManageSessionController);
    manageSessionService = module.get<ManageSessionService>(ManageSessionService);
  });

  describe('manage controller instantiation', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('showAllSessions', () => {
    it('should get all sessions', async () => {
      const sessions = [generateSession()];
      const mockReq = { session: { user: '1' } };
      const query = {};

      jest
        .spyOn(manageSessionService, 'findAll')
        .mockReturnValue(Promise.resolve(sessions));

      expect(await controller.showAllSessions(mockReq, query)).toEqual(sessions);
      expect(manageSessionService.findAll).toHaveBeenCalled();
    });
  });

  describe('createSession', () => {
    it('should create session', async () => {
      const newSession: Partial<ManageSessionDto> = {
        status: SessionStatus.CREATED,
      };
      const mockReq = { session: { user: '1' } };
      const session = generateSession(newSession);

      jest
        .spyOn(manageSessionService, 'create')
        .mockReturnValue(Promise.resolve(session));

      expect(await controller.createSession(mockReq, newSession)).toEqual(session);
      expect(manageSessionService.create).toHaveBeenCalledWith(newSession, { userId: mockReq.session.user });
    });
  });

  describe('showSessionById', () => {
    it('should get session by passed id', async () => {
      const session = generateSession();
      const mockReq = { session: { user: '1' } };

      jest
        .spyOn(manageSessionService, 'findById')
        .mockReturnValue(Promise.resolve(session));

      expect(await controller.showSessionById(mockReq, session.id)).toEqual(session);
      expect(manageSessionService.findById).toHaveBeenCalledWith(session.id, mockReq.session.user);
    });
  });

  describe('updateSession', () => {
    it('should update session', async () => {
      const session = generateSession();
      const newData: Partial<ManageSessionDto> = {
        status: SessionStatus.IN_PROGRESS,
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
