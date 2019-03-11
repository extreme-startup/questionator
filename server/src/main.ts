import { NestFactory } from '@nestjs/core';
import { ConfigService } from './config';
import { AppModule } from './app.module';
import { description, version } from '../package.json';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
