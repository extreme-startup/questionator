import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SessionService } from './session.service';
import { Session } from '../../entity/Session';

@Controller('sessions')
export class SessionController {
  constructor(private readonly customerService: SessionService) {}

  @Get()
  @ApiResponse({ status: 200, type: Session, isArray: true })
  findAll(): Promise<Session[]> {
    return this.customerService.findAll();
  }
}
