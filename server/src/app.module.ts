import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ExpressSessionMiddleware } from '@nest-middlewares/express-session';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormStore } from 'typeorm-store';
import { getConnection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './modules/Customer/customer.module';
import { ConfigService } from './config/config.service';
import { Session } from './entity/Session';
import { UserModule } from './modules/User/user.module';
import { AuthModule } from './modules/Auth/auth.module';
import { SessionModule } from './modules/Session/session.module';
import { ClearCookieMiddleware } from './midelwares/clearCookie.middleware';
import { ContestModule } from './modules/Contest/contest.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(),
    CustomerModule,
    UserModule,
    AuthModule,
    SessionModule,
  ],
  imports: [ConfigModule, TypeOrmModule.forRoot(), CustomerModule, ContestModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    ExpressSessionMiddleware.configure({
      secret: this.configService.secretKey(),
      store: new TypeormStore({
        repository: getConnection().getRepository(Session),
      }),
      resave: false,
      saveUninitialized: false,
    });
    consumer.apply(ExpressSessionMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    consumer.apply(CookieParserMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    consumer.apply(ClearCookieMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
