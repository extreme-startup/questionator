import { Module } from '@nestjs/common';
import { ResultLoggerService } from './resultLogger.service';
import { ResultLoggerController } from './resultLogger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { User } from '../../entity/User';

@Module({
  imports: [TypeOrmModule.forFeature([AskedQuestion, User])],
  providers: [ResultLoggerService],
  controllers: [ResultLoggerController],
})
export class ResultLoggerModule {}
