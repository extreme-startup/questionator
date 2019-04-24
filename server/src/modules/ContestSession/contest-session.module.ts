import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContestSessionService } from './contest-session.service';
import { ContestSessionController } from './contest-session.controller';
import { ContestSession } from '../../entity/ContestSession';
import { Player } from '../../entity/Player';
import { RoundService } from './round.service';
import { Round } from '../../entity/Round';
import { PlayerService } from '../Player/player.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContestSession, Round, Player])],
  providers: [ContestSessionService, RoundService, PlayerService],
  controllers: [ContestSessionController],
  exports: [ContestSessionService],
})
export class ContestSessionModule {}
