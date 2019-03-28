import { Module } from '@nestjs/common';

import { ContestService } from './contest.service';
import { ContestController } from './contest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contest } from '../../entity/Contest';

@Module({
  imports: [TypeOrmModule.forFeature([Contest])],
  providers: [ContestService],
  controllers: [ContestController],
})
export class ContestModule {}
