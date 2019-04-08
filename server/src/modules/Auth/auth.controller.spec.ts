import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../User/user.service';

describe('Auth Controller', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(data => data),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);

  });

  describe('Define Auth controller', () => {
    it('Should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('Login', () => {
    it('should return user if exist', async () => {
      jest.spyOn(service, 'validateUser').mockImplementation(async () => await result);
      const user = {email: 'test@test.com'};
      const result = {
        id: '1',
        email: 'test@test.com',
      };
      const response = {
        status: (code: number) => response,
        json: (data?: any) => data,
      };
      const request = {
        session: {
          user: '',
        },
      };

      expect(await controller.loginUser(response, user, request)).toBe(result);
      expect(request.session.user).toBe('1');
    });

    it('should create and return user if does not exist', async () => {
      const result = {
        id: '1',
        email: 'test@test.com',
      };
      const user = {email: 'test@test.com'};
      const response = {
        status: (code: number) => response,
        json: (data?: any) => data,
      };
      const request = {
        session: {
          user: '',
        },
      };

      service.validateUser = jest.fn(() => Promise.reject(false));
      service.createUser = jest.fn(() => Promise.resolve(result));

      expect(await controller.loginUser(response, user, request)).toBe(result);
      expect(request.session.user).toBe('1');
    });
  });

  describe('Register', () => {
    it('should forbidden to create user with same credentials', async () => {
      service.validateUser = jest.fn(() => Promise.resolve(true));
      const user = {email: 'test@test.com'};
      const result = {
        message: 'User already exist',
      };
      const response = {
        status: (code: number) => response,
        json: (data?: any) => data,
      };
      expect(await controller.registerUser(response, user, {})).toEqual(result);
    });

    it('should create new user', async () => {
      const result = {
        id: '1',
        email: 'test@test.com',
      };
      const user = {email: 'test@test.com'};
      const response = {
        status: (code: number) => response,
        json: (data?: any) => data,
      };
      const request = {
        session: {
          user: '',
        },
      };
      service.validateUser = jest.fn(() => Promise.reject(false));
      service.createUser = jest.fn(() => Promise.resolve(result));

      expect(await controller.registerUser(response, user, request)).toBe(result);
    });
  });

  describe('Logout', () => {
    it('should clear cookie when logout', async () => {
      const result = {
        message: 'Ok',
      };
      const response = {
        status: (code: number) => response,
        json: (data?: any) => data,
        clearCookie: jest.fn(),
      };
      const request = {
        session: {
          user: '1',
        },
        cookies: {
          'connect.sid': '1',
        },
      };

      expect(await controller.logoutUser(response, request)).toEqual(result);
      expect(response.clearCookie).toHaveBeenCalled();
    });
  });

  describe('getUserAuthenticated', () => {
    it('should authenticate user if cookie set', async () => {
      const result = {
        user: '1',
      };
      const response = {
        status: (code: number) => response,
        json: (data?: any) => data,
      };
      const request = {
        session: {
          user: '1',
        },
        cookies: {
          'connect.sid': '1',
        },
      };

      expect(await controller.getUserAuthenticated(response, request)).toEqual(result);
    });
    it('should not authenticate user if cookie does not set', async () => {
      const result = {
        user: null,
      };
      const response = {
        status: (code: number) => response,
        json: (data?: any) => data,
      };
      const request = {
        session: {
          user: '1',
        },
        cookies: {
          'connect.sid': '',
        },
      };

      expect(await controller.getUserAuthenticated(response, request)).toEqual(result);
    });
  });
});
