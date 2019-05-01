import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../../entity/Question';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { Contest } from 'src/entity/Contest';
import { ContestSession } from 'src/entity/ContestSession';

@Module({
  imports: [TypeOrmModule.forFeature([Question, AskedQuestion, Contest, ContestSession])],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
