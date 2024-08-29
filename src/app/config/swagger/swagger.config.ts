import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

import { AuthModule } from '../../modules/auth/auth.module';
import { DonationsModule } from 'src/app/modules/donations/donations.module';
import { FeedsModule } from 'src/app/modules/feeds/feeds.module';
import { NewsModule } from 'src/app/modules/news/news.module';
import { NotificationsModule } from 'src/app/modules/notifications/notifications.module';
import { UsersModule } from 'src/app/modules/users/users.module';
import { VenturesModule } from 'src/app/modules/ventures/ventures.module';

export type SwaggerDocumentData = {
  options: Omit<OpenAPIObject, 'paths'>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  modules: Function[];
  path: string;
};

export type ApiDocs = {
  apiTag: string;
  endpoints: {
    [key: string]: Partial<OperationObject>;
  };
};

export const getSwaggerDocuments = (): SwaggerDocumentData[] => {
  return [
    {
      options: new DocumentBuilder()
        .setTitle('Auth API')
        .setDescription('API For Auth Management')
        .setVersion('1.0.0')
        .addTag('Authorization & Authentication')
        .addSecurity('bearer', {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Token',
          'x-tokenName': 'Authorization',
        })
        .build(),
      modules: [AuthModule],
      path: '/docs/api/auth',
    },
    {
      options: new DocumentBuilder()
        .setTitle('Donations API')
        .setDescription('APIs For Donations Management')
        .setVersion('1.0.0')
        .addTag('DonationsModule')
        .addSecurity('bearer', {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Token',
          'x-tokenName': 'Authorization',
        })
        .build(),
      modules: [DonationsModule],
      path: '/docs/api/donations',
    },
    {
      options: new DocumentBuilder()
        .setTitle('Feeds API')
        .setDescription('APIs For Feeds Management')
        .setVersion('1.0.0')
        .addTag('FeedsModule')
        .addSecurity('bearer', {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Token',
          'x-tokenName': 'Authorization',
        })
        .build(),
      modules: [FeedsModule],
      path: '/docs/api/feeds',
    },
    {
      options: new DocumentBuilder()
        .setTitle('News API')
        .setDescription('APIs For News Management')
        .setVersion('1.0.0')
        .addTag('NewsModule')
        .addSecurity('bearer', {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Token',
          'x-tokenName': 'Authorization',
        })
        .build(),
      modules: [NewsModule],
      path: '/docs/api/news',
    },
    {
      options: new DocumentBuilder()
        .setTitle('Notifications API')
        .setDescription('APIs For Notifications Management')
        .setVersion('1.0.0')
        .addTag('NotificationsModule')
        .addSecurity('bearer', {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Token',
          'x-tokenName': 'Authorization',
        })
        .build(),
      modules: [NotificationsModule],
      path: '/docs/api/notifications',
    },
    {
      options: new DocumentBuilder()
        .setTitle('Users API')
        .setDescription('APIs For Users Management')
        .setVersion('1.0.0')
        .addTag('UsersModule')
        .addSecurity('bearer', {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Token',
          'x-tokenName': 'Authorization',
        })
        .build(),
      modules: [UsersModule],
      path: '/docs/api/users',
    },
    {
      options: new DocumentBuilder()
        .setTitle('Ventures API')
        .setDescription('APIs For Ventures Management')
        .setVersion('1.0.0')
        .addTag('VenturesModule')
        .addSecurity('bearer', {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Token',
          'x-tokenName': 'Authorization',
        })
        .build(),
      modules: [VenturesModule],
      path: '/docs/api/ventures',
    },
  ];
};
