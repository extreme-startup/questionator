import { Module } from '@nestjs/common';
import { ResultLoggerService } from './resultLogger.service';
import { ResultLoggerController } from './resultLogger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AskedQuestion } from '../../entity/AskedQuestion';

@Module({
  imports: [TypeOrmModule.forFeature([AskedQuestion])],
  providers: [ResultLoggerService],
  controllers: [ResultLoggerController],
  exports: [ResultLoggerService],
})
export class ResultLoggerModule {}
