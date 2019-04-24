import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContestSessionService } from './contest-session.service';
import { ContestSessionController } from './contest-session.controller';
import { ContestSession } from '../../entity/ContestSession';
import { Player } from '../../entity/Player';
import { RoundService } from './round.service';
import { Round } from '../../entity/Round';
import { PlayerService } from '../Player/player.service';
import { AskQuestionsModule } from '../AskQuestions/ask-questions.module';
import { AskQuestionsService } from '../AskQuestions/ask-questions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContestSession, Round, Player]),
    AskQuestionsModule,
  ],
  providers: [
    ContestSessionService,
    RoundService,
    PlayerService,
    AskQuestionsService,
  ],
  controllers: [ContestSessionController],
  exports: [ContestSessionService],
})
export class ContestSessionModule {}
