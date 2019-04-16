import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../../entities/Question';
import { AskedQuestion } from '../../entities/AskedQuestion';

@Module({
  imports: [TypeOrmModule.forFeature([Question, AskedQuestion])],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
