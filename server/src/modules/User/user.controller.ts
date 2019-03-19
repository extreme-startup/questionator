import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from '../../entity/Users';

@Controller('users')
export class UserController {
  constructor(private readonly customerService: UserService) {}

  @Get()
  findAll(): Promise<Users[]> {
    return this.customerService.findAll();
  }
}
