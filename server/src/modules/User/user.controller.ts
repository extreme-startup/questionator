import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entity/User';

@Controller('users')
export class UserController {
  constructor(private readonly customerService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.customerService.findAll();
  }
}
