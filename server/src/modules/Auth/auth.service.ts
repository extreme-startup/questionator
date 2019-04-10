import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../User/user.service';
import { LocalPayload } from './local-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService) {}

  async createUser(user: LocalPayload): Promise<any> {
    const createdUser = await this.userService.createUser(user);
    if (createdUser) {
      return Promise.resolve(createdUser);
    }
    return Promise.reject(false);
  }

  async validateUser(payload: LocalPayload): Promise<any> {
    const user = await this.userService.validateUser(payload);
    if (user) {
      return Promise.resolve(user);
    }
    return Promise.reject(false);
  }
}
