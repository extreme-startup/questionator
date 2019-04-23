import { Body, Controller, Get, Param, Post, Put, Query, Request } from '@nestjs/common';

import { ContestSessionService } from './contest-session.service';
import { ContestSessionDto } from './contest-session.dto';

@Controller('contest-sessions')
export class ContestSessionController {
  constructor(private msService: ContestSessionService) {}

  @Get()
  showAllSessions(@Request() req, @Query() query): Promise<ContestSessionDto[]> {
    return this.msService.findAll(query);
  }

  @Post()
  createSession(@Body() session): Promise<ContestSessionDto> {
    return this.msService.create(session);
  }

  @Get(':id')
  showSessionById(@Param() id): Promise<ContestSessionDto> {
    return this.msService.findById(id);
  }

  @Put(':id')
  updateSession(@Param() id, @Body() session): Promise<ContestSessionDto> {
    return this.msService.update(id, session);
  }
}
