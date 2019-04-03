import { NestFactory } from '@nestjs/core';
import { ConfigService } from './config';
import { AppModule } from './app.module';
import { description, version } from '../package.json';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as serveStatic from 'serve-static';
import * as history from 'connect-history-api-fallback';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  app.use(history({ index: '/' }));
  app.use(serveStatic(path.join(__dirname, '../../../client/dist')));

  const configService: ConfigService = app.get(ConfigService);

  const options = new DocumentBuilder()
    .setTitle(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(configService.port());
}
bootstrap();
