import {Controller, Get, Param} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entity/User';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param() params): Promise<User> {
    return await this.userService.findById(params.id);
  }
}
