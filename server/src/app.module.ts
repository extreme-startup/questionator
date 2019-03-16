import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ExpressSessionMiddleware } from '@nest-middlewares/express-session';
import * as MySQLStore from 'express-mysql-session';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as typeORM from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './modules/Customer/customer.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forRoot(), CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    // const options = {
    //   host: 'localhost',
    //   port: 3306,
    //   user: 'root',
    //   password: 'password',
    //   database: 'questionator',
    // };

    // const sessionStore = MySQLStore(options);
    // const sessionStore = MySQLStore({}, typeORM.getConnection());

    ExpressSessionMiddleware.configure({
      secret: this.configService.secretKey(),
      // store: sessionStore,
      resave: false,
      saveUninitialized: false,
    });

    consumer.apply(ExpressSessionMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
