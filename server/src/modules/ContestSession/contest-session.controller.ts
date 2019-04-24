import { Body, Controller, Get, Param, Post, Put, Query, Request } from '@nestjs/common';

import { ContestSessionService } from './contest-session.service';
import { ContestSessionDto, Status } from './contest-session.dto';

@Controller('contest-sessions')
export class ContestSessionController {
  constructor(private msService: ContestSessionService) {}

  @Get()
  showAllSessions(@Request() req, @Query() query): Promise<ContestSessionDto[]> {
    return this.msService.findAll(query);
  }

  @Post('add-Player')
  addPlayer(@Body() body) {
    return this.msService.addPlayer(body);
  }

  @Post()
  createSession(@Body() session): Promise<ContestSessionDto> {
    return this.msService.create(session);
  }

  @Get(':id')
  showSessionById(@Param() id): Promise<ContestSessionDto> {
    return this.msService.findById(id);
  }

  @Put('start')
  startSession(@Body() body) {
    body.status = Status.IN_PROGRESS;
    body.startedTime = new Date().toISOString();

    return this.msService.update(body);
  }

  @Put('pause')
  pauseSession(@Body() body) {
    body.status = Status.PAUSED;
    return this.msService.update(body);
  }

  @Put('continue')
  continueSession(@Body() body) {
    body.status = Status.IN_PROGRESS;
    return this.msService.update(body);
  }

  @Put('complete')
  completeSession(@Body() body) {
    body.status = Status.COMPLETED;
    return this.msService.update(body);
  }

  @Put(':id')
  updateSession(@Param() id, @Body() session): Promise<ContestSessionDto> {
    return this.msService.update(session);
  }
}
