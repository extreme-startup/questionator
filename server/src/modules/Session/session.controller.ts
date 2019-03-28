import { Controller, Get } from '@nestjs/common';
import { SessionService } from './session.service';
import { Session } from '../../entity/Session';

@Controller('sessions')
export class SessionController {
  constructor(private readonly customerService: SessionService) {}

  @Get()
  findAll(): Promise<Session[]> {
    return this.customerService.findAll();
  }
}
