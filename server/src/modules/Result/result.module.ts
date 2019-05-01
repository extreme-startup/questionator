import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AskedQuestion } from '../../entity/AskedQuestion';

@Module({
  imports: [TypeOrmModule.forFeature([AskedQuestion])],
  providers: [ResultService],
  controllers: [ResultController],
})
export class ResultModule {}
