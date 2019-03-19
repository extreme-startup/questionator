import { Controller, Get } from '@nestjs/common';
import { SessionService } from './session.service';
import { Sessions } from '../../entity/Sessions';

@Controller('sessions')
export class SessionController {
  constructor(private readonly customerService: SessionService) {}

  @Get()
  findAll(): Promise<Sessions[]> {
    return this.customerService.findAll();
  }
}
