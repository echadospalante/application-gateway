import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { getSwaggerDocuments } from './app/config/swagger/swagger.config';

const main = async () => {
  const logger = new Logger('main', { timestamp: true });
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://t9sn292b-5173.use2.devtunnels.ms',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });

  // Displaying the request info
  // app.use(morgan('combined'));

  // Compressing the response body
  app.use(compression());

  // Securing the API
  // app.use(helmet());

  app.use(cookieParser());

  setupSwagger(app);

  await app.listen(5000).then(() => {
    logger.log(`Server up and running on port ${5000}`);
  });
};

const setupSwagger = (app: INestApplication<any>) => {
  const documents = getSwaggerDocuments();
  documents.forEach(({ path, options, modules }) => {
    const document = SwaggerModule.createDocument(app, options, {
      include: modules.length > 0 ? modules : [],
    });
    SwaggerModule.setup(path, app, document);
  });
};

main();
