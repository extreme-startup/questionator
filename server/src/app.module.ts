import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './modules/Customer/customer.module';
import { ContestModule } from './modules/Contest/contest.module';
import { QuestionModule } from './modules/Question/question.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forRoot(), CustomerModule, ContestModule, QuestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
