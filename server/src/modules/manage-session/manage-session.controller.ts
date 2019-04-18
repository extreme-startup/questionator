import { Body, Controller, Get, Param, Post, Put, Request } from '@nestjs/common';

import { ManageSessionService } from './manage-session.service';
import { ManageSessionDto, ManageSessionRO } from './ManageSession.dto';

@Controller('manage-session')
export class ManageSessionController {
  constructor(private msService: ManageSessionService) {}

  @Get()
  showAllSessions(@Request() req): Promise<ManageSessionRO[]> {
    const userId = req.session.user;

    return this.msService.findAll(userId);
  }

  @Post()
  createSession(@Request() req, @Body() session): Promise<ManageSessionRO> {
    const userId = req.session.user;

    return this.msService.create(session, userId);
  }

  @Get(':id')
  showSessionById(@Request() req, @Param() id): Promise<ManageSessionRO> {
    const userId = req.session.user;

    return this.msService.findById(id, userId);
  }

  @Put(':id')
  updateSession(@Param() id, @Body() session): Promise<ManageSessionRO> {
    return this.msService.update(id, session);
  }
}
