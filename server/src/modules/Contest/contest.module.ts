import { Module } from '@nestjs/common';

import { ContestService } from './contest.service';
import { ContestController } from './contest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contest } from '../../entity/Contest';
import { ContestSession } from 'src/entity/ContestSession';
import { Round } from 'src/entity/Round';
import { RoundService } from '../ContestSession/round.service';
import { Question } from 'src/entity/Question';

@Module({
  imports: [TypeOrmModule.forFeature([Contest, ContestSession, Round, Question])],
  providers: [ContestService, RoundService],
  controllers: [ContestController],
  exports: [ContestService],
})
export class ContestModule {}
