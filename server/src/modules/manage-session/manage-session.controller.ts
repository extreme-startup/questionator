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

  @Post('add-member')
  addMember(@Body() body: { sessionHash: string, userId: string }): Promise<ManageSessionDto> {
    return this.msService.addMembers(body);
  }

  @Post()
  createSession(@Request() req, @Body() session): Promise<ManageSessionDto> {
    const userId = req.session.user;

    return this.msService.create(session, { userId });
  }

  @Get(':id')
  async showSessionById(@Request() req, @Param() id): Promise<ManageSessionDto> {
    const userId = req.session.user;

    return this.msService.findById(id, userId);
  }

  @Put(':id')
  updateSession(@Param() id, @Body() session): Promise<ManageSessionDto> {
    return this.msService.update(id, session);
  }
}
