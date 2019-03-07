import { injectable, inject } from 'inversify';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TYPES } from './types';
import IConfiguration from './interfaces/IConfiguration';
import IBootstraper from './interfaces/IBootstraper';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const packageJson = require('../package.json'); //tslint:disable-line

@injectable()
export default class Bootstraper implements IBootstraper {
  private configuration: IConfiguration;

  public constructor(@inject(TYPES.Configuration) config: IConfiguration) {
    this.configuration = config;
  }

  async startApplication() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
      .setTitle(packageJson.description)
      .setVersion(packageJson.version)
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(this.configuration.port());
  }
}
