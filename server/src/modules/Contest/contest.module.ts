import { Module } from '@nestjs/common';

import { ContestService } from './contest.service';
import { ContestController } from './contest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contest } from '../../entity/Contest';
import { SessionModule } from '../Session/session.module';
import { SessionService } from '../Session/session.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contest]), SessionModule],
  providers: [ContestService, SessionService],
  controllers: [ContestController],
})
export class ContestModule {}
