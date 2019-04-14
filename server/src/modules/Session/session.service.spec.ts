import { Repository } from 'typeorm';
import { Session } from '../../entities/Session';
import { SessionService } from './session.service';

describe('Session Service', () => {
  let sessionService: SessionService;
  let sessionRepository: Repository<Session>;
  const mockRepository = {
    id: '1',
    email: 'test@test.com',
    expiresAt: 1111111,
    data: 'user data',
    hasId: jest.fn(() => true),
    save: jest.fn(),
    remove: jest.fn(),
    reload: jest.fn(),
  };

  beforeEach(async () => {
    sessionRepository = new Repository();
    sessionService = new SessionService(sessionRepository);
  });

  describe('findAll', () => {
    it('should get all session from session repository', async () => {
      const sessionResult: Session[] = [mockRepository];
      jest.spyOn(sessionRepository, 'find').mockReturnValue(Promise.resolve(sessionResult));

      expect(await sessionService.findAll()).toBe(sessionResult);
      expect(sessionRepository.find).toHaveBeenCalledWith();
    });
  });

  describe('validateSession', () => {
    it('should validate session and return true', async () => {
      const sessionResult: Session = mockRepository;
      jest.spyOn(sessionRepository, 'findOne').mockReturnValue(Promise.resolve(sessionResult));

      expect(await sessionService.validateSession('1')).toBe(true);
      expect(sessionRepository.findOne).toHaveBeenCalledWith({id: '1'});
    });
    it('should not validate session and return false', async () => {
      jest.spyOn(sessionRepository, 'findOne').mockReturnValue(Promise.resolve(undefined));

      expect(await sessionService.validateSession('1')).toBe(false);
      expect(sessionRepository.findOne).toHaveBeenCalledWith({id: '1'});
    });
  });
});
