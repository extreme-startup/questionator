import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContestSessionService } from './contest-session.service';
import { ContestSessionController } from './contest-session.controller';
import { ContestSession } from '../../entity/ContestSession';

@Module({
  imports: [TypeOrmModule.forFeature([ContestSession])],
  providers: [ContestSessionService],
  controllers: [ContestSessionController],
})
export class ContestSessionModule {}
