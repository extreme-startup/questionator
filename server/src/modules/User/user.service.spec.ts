import { Repository } from 'typeorm';
import { User } from '../../entity/User';
import { UserService } from './user.service';

describe('User Service', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  const mockRepository = {
    id: '1',
    email: 'test@test.com',
    sessions: [],
    players: [],
    trainers: [],
  };

  beforeEach(async () => {
    userRepository = new Repository();
    userService = new UserService(userRepository);
  });

  describe('findAll', () => {
    it('should get all users from user repository', async () => {
      const userResult: User[] = [mockRepository];
      jest.spyOn(userRepository, 'find').mockReturnValue(Promise.resolve(userResult));

      expect(await userService.findAll()).toBe(userResult);
      expect(userRepository.find).toHaveBeenCalledWith();
    });
  });

  describe('validateUser', () => {
    it('should validate user and return it', async () => {
      const userResult: User = mockRepository;
      jest.spyOn(userRepository, 'findOne').mockReturnValue(Promise.resolve(userResult));

      expect(await userService.validateUser({email: 'test@test.com'})).toBe(userResult);
      expect(userRepository.findOne).toHaveBeenCalledWith({email: 'test@test.com'});
    });
    it('should not validate session and return undefined', async () => {
      jest.spyOn(userRepository, 'findOne').mockReturnValue(Promise.resolve(undefined));

      expect(await userService.validateUser({email: ''})).toBe(undefined);
      expect(userRepository.findOne).toHaveBeenCalledWith({email: ''});
    });
  });

  describe('findById', () => {
    it('should return user by id', async () => {
      const userResult: User = mockRepository;
      jest.spyOn(userRepository, 'findOne').mockReturnValue(Promise.resolve(userResult));

      expect(await userService.findById('1')).toBe(userResult);
      expect(userRepository.findOne).toHaveBeenCalledWith({id: '1'});
    });
  });
});
