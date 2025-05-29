import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as morgan from 'morgan';

import { AppModule } from './app/app.module';
import { json, urlencoded } from 'express';
import { ConfigService } from '@nestjs/config';

const main = async () => {
  const logger = new Logger('main', { timestamp: true });
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'https://avaluos.valor-corp.com'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-requested-by',
      'x-edit-start-date',
      'x-edit-current-date',
      'x-edit-uuid',
    ],
  });

  app.use(morgan('short'));
  app.use(compression());
  app.use(helmet());

  app.use(cookieParser());

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port).then(() => {
    logger.log(`Server up and running on port ${port}`);
  });
};

main();
