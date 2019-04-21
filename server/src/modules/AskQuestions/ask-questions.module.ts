import { Module } from '@nestjs/common';
import { AskQuestionsService } from './ask-questions.service';
import { ContenderModule } from '../Contender/contender.module';
import { QuestionModule } from '../Question/question.module';

@Module({
  imports: [ContenderModule, QuestionModule],
  providers: [AskQuestionsService],
  exports: [AskQuestionsService],
})
export class AskQuestionsModule {}
