import { Module } from '@nestjs/common';

import { ContestService } from './contest.service';
import { ContestController } from './contest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contest } from '../../entity/Contest';
import { ContestSession } from '../../entity/ContestSession';
import { Round } from '../../entity/Round';
import { RoundService } from '../ContestSession/round.service';
import { UserService } from '../User/user.service';
import { Question } from '../../entity/Question';
import { User } from '../../entity/User';

@Module({
  imports: [TypeOrmModule.forFeature([Contest, ContestSession, Round, Question, User])],
  providers: [ContestService, RoundService, UserService],
  controllers: [ContestController],
  exports: [ContestService],
})
export class ContestModule {}
