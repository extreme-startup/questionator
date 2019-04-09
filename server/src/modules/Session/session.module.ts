import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../../entity/Session';
import { QuestionModule } from '../Question/question.module';
import { ContenderModule } from '../Contender/contender.module';
import { QuestionService } from '../Question/question.service';
import { ContenderGateway } from '../Contender/contender.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    QuestionModule,
    ContenderModule,
  ],
  providers: [SessionService, QuestionService, ContenderGateway],
  controllers: [SessionController],
  exports: [SessionService],
})
export class SessionModule {}
