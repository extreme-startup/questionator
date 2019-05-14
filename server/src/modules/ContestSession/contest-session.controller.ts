import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';

import { ContestSessionService } from './contest-session.service';
import { ContestSessionDto, Status } from './contest-session.dto';
import { PlayerDto } from '../Player/player.dto';

@Controller('contest-sessions')
export class ContestSessionController {
  constructor(private msService: ContestSessionService) { }

  @Get()
  showAllSessions(
    @Request() req,
    @Query() query,
  ): Promise<ContestSessionDto[]> {
    return this.msService.findAll(query);
  }

  @Post('add-Player')
  async addPlayer(@Body() body) {
    return await this.msService.addPlayer(body);
  }

  @Post()
  async createSession(@Body() session): Promise<ContestSessionDto> {
    return await this.msService.create(session);
  }

  @Get(':id')
  async showSessionById(@Param() id): Promise<ContestSessionDto> {
    return await this.msService.findById(id);
  }

  @Get('result/:contestSessionId')
  async getSessionResult(@Param() { contestSessionId }, @Query() {answerOn}): Promise<PlayerDto[]> {
    return await this.msService.getResults(contestSessionId, new Date(answerOn));
  }

  @Get('lastAnswerOn/:contestSessionId')
  async getLastAnswerOn(@Param() { contestSessionId }): Promise<Date> {
    return  await this.msService.getLastAnswerOn(contestSessionId);
  }

  @Put('start')
  async startSession(@Body() body) {
    body.status = Status.IN_PROGRESS;
    body.startedTime = new Date().toISOString();

    return await this.msService.update(body);
  }

  @Put('pause')
  async pauseSession(@Body() body) {
    body.status = Status.PAUSED;
    return await this.msService.update(body);
  }

  @Put('continue')
  async continueSession(@Body() body) {
    body.status = Status.IN_PROGRESS;
    return await this.msService.update(body);
  }

  @Put('complete')
  async completeSession(@Body() body) {
    body.status = Status.COMPLETED;
    return await this.msService.update(body);
  }

  @Put(':id')
  async updateSession(
    @Param() id,
    @Body() session,
  ): Promise<ContestSessionDto> {
    return await this.msService.update(session);
  }
}
