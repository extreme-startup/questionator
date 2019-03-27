import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './modules/Customer/customer.module';
import { GameModule } from './modules/game/game.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forRoot(), CustomerModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
