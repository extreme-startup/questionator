import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { ManageSessionController } from './manage-session.controller';
import { ManageSessionService } from './manage-session.service';
import { ManageSessionDto, SessionStatus } from './ManageSession.dto';
import { ManageSessionEntity } from '../../entities/ManageSessionEntity';
import { User } from '../../entities/User';

function generateSession(s: Partial<ManageSessionDto> = {} as ManageSessionDto) {
  const session = new ManageSessionEntity();
  const trainer = new User();
  session.startedTime = s.startedTime || '2000-01-01';
  session.status = s.status || SessionStatus.LoV;
  session.trainer = s.trainer as User || trainer;

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

      jest
        .spyOn(manageSessionService, 'findAll')
        .mockReturnValue(Promise.resolve(sessions));

      expect(await controller.list()).toEqual(sessions);
      expect(manageSessionService.findAll).toHaveBeenCalled();
    });
  });

  describe('createSession', () => {
    it('should create session', async () => {
      const trainer = new User();
      const newSession: Partial<ManageSessionDto> = {
        status: SessionStatus.LoV,
        trainer,
      };
      const session = generateSession(newSession);

      jest
        .spyOn(manageSessionService, 'create')
        .mockReturnValue(Promise.resolve(session));

      expect(await controller.create(newSession)).toEqual(session);
      expect(manageSessionService.create).toHaveBeenCalledWith(newSession);
    });
  });

  describe('showSessionById', () => {
    it('should get session by passed id', async () => {
      const session = generateSession();

      jest
        .spyOn(manageSessionService, 'findById')
        .mockReturnValue(Promise.resolve(session));

      expect(await controller.getById(session.id)).toEqual(session);
      expect(manageSessionService.findById).toHaveBeenCalledWith(session.id);
    });
  });

  describe('updateSession', () => {
    it('should update session', async () => {
      const session = generateSession();
      const newData: Partial<ManageSessionDto> = {
        status: SessionStatus.ACTIVE,
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
