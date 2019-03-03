import { injectable, inject } from 'inversify';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TYPES } from './types';
import IConfiguration from './interfaces/IConfiguration';
import IBootstraper from './interfaces/IBootstraper';

@injectable()
export default class Bootstraper implements IBootstraper {
  private configuration: IConfiguration;

  public constructor(@inject(TYPES.Configuration) config: IConfiguration) {
    this.configuration = config;
  }

  async startApplication() {
    const app = await NestFactory.create(AppModule);
    await app.listen(this.configuration.port());
  }
}
