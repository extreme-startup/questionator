import { Body, Controller, Get, Param, Post, Put, Request } from '@nestjs/common';

import { ManageSessionService } from './manage-session.service';
import { ManageSessionDto } from './ManageSession.dto';

@Controller('manage-session')
export class ManageSessionController {
  constructor(private msService: ManageSessionService) {}

  @Get()
  showAllSessions(@Request() req): Promise<ManageSessionDto[]> {
    const userId = req.session.user;

    return this.msService.findAll(userId);
  }

  @Post()
  createSession(@Body() session): Promise<ManageSessionDto> {
    return this.msService.create(session);
  }

  @Get(':id')
  showSessionById(@Param() id): Promise<ManageSessionDto> {
    return this.msService.findById(id);
  }

  @Put(':id')
  updateSession(@Param() id, @Body() session): Promise<ManageSessionDto> {
    return this.msService.update(id, session);
  }
}
