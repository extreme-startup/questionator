import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './modules/Customer/customer.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
