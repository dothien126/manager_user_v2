import * as dotenv from 'dotenv';
dotenv.config();
import * as config from 'config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { initSwagger } from './share/swagger/swagger-setup'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, 
    new ExpressAdapter()
  );

  app.useGlobalPipes(new ValidationPipe());

  initSwagger(app);

  const port = config.get<number>('app.port');
  await app.listen(port, () => {
    console.log('server is running ...');
  });
}
bootstrap();
