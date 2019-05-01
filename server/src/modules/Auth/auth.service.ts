import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../User/user.service';
import { UserRequestDto } from './models/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  public async createUser(user: UserRequestDto): Promise<any> {
    const createdUser = await this.userService.createUser(user);
    if (createdUser) {
      return Promise.resolve(createdUser);
    }
    return Promise.reject(false);
  }

  public async validateUser(payload: UserRequestDto): Promise<any> {
    const user = await this.userService.validateUser(payload);
    if (user) {
      return Promise.resolve(user);
    }
    return Promise.reject(false);
  }
}
