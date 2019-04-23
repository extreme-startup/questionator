import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContestSessionService } from './contest-session.service';
import { ContestSessionController } from './contest-session.controller';
import { ContestSession } from '../../entity/ContestSession';
import { Player } from '../../entity/Player';
import { RoundService } from './round.service';
import { Round } from '../../entity/Round';

@Module({
  imports: [TypeOrmModule.forFeature([ContestSession, Player, Round])],
  providers: [ContestSessionService, RoundService],
  controllers: [ContestSessionController],
  exports: [ContestSessionService],
})
export class ContestSessionModule {}
