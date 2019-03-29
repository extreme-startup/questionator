import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entity/User';

describe('User Controller', () => {
  let controller: UserController;
  let service: UserService;

  const mockRepository = {
    id: '1',
    email: 'test@test.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: [mockRepository],
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const userResult: User[] = [mockRepository];

      jest.spyOn(service, 'findAll').mockReturnValue(Promise.resolve(userResult));

      expect(await controller.findAll()).toBe(userResult);
      expect(service.findAll).toHaveBeenCalledWith();
    });
  });

  describe('findById', () => {
    it('should return user by id', async () => {
      const userResult: User = mockRepository;
      jest.spyOn(service, 'findById').mockReturnValue(Promise.resolve(userResult));

      expect(await controller.findById({id: '1'})).toBe(userResult);
      expect(service.findById).toHaveBeenCalledWith('1');
    });
  });
});
