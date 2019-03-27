import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from '../../entity/Questions';

@Module({
  imports: [TypeOrmModule.forFeature([Questions])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule { }
