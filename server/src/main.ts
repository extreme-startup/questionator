import { NestFactory } from '@nestjs/core';
import { ConfigService } from './config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.port());
}
bootstrap();
