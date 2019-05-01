import { Test, TestingModule } from '@nestjs/testing';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Session } from '../../entity/Session';
import { User} from '../../entity/User';

describe('Session Controller', () => {
  let controller: SessionController;
  let service: SessionService;

  const mockRepository = [{
    id: '1',
    email: 'test@test.com',
    expiresAt: 1111111,
    data: 'user data',
    user: new User(),
    hasId: jest.fn(() => true),
    save: jest.fn(),
    remove: jest.fn(),
    reload: jest.fn(),
  }];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionController],
      providers: [
        SessionService,
        {
          provide: getRepositoryToken(Session),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<SessionController>(SessionController);
    service = module.get<SessionService>(SessionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all sessions', async () => {
      const sessionResult: Session[] = mockRepository;

      jest.spyOn(service, 'findAll').mockReturnValue(Promise.resolve(sessionResult));

      expect(await controller.findAll()).toBe(sessionResult);
      expect(service.findAll).toHaveBeenCalledWith();
    });
  });
});
