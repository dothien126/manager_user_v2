import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT;
  await app.listen(port, () => {
    console.log('server is running ...');
  });
}
bootstrap();
