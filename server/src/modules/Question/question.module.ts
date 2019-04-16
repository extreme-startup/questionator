import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../../entity/Question';
import { AskedQuestion } from '../../entity/AskedQuestion';

@Module({
  imports: [TypeOrmModule.forFeature([Question, AskedQuestion])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule { }
