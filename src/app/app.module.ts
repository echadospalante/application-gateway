import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { environment, JoiValidationSchema } from '../env/env.setup';
import { AuthController } from './controllers/auth/auth.controller';
import { EventCategoriesController } from './controllers/event/event-categories.controller';
import { EventsController } from './controllers/event/events.controller';
import { PublicationCategoriesController } from './controllers/publication/publication-categories.controller';
import { PublicationsController } from './controllers/publication/publications.controller';
import { UsersController } from './controllers/user/users.controller';
import { VentureCategoriesController } from './controllers/venture/venture-categories.controller';
import { VenturesController } from './controllers/venture/ventures.controller';
import { HealthService } from './health/health.service';
import { AuthCookieInterceptor } from './interceptors/auth-cookie.interceptor';
import { GoogleTokenInterceptor } from './interceptors/google-token.interceptor';
import { ProxyService } from './proxy/request-proxy.service';
import { SecurityService } from './security/security.service';

@Module({
  controllers: [
    AuthController,
    UsersController,
    VentureCategoriesController,
    EventCategoriesController,
    EventsController,
    VenturesController,
    PublicationsController,
    PublicationCategoriesController,
  ],
  providers: [
    ProxyService,
    SecurityService,
    AuthCookieInterceptor,
    HealthService,
    GoogleTokenInterceptor,
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [environment],
      validationSchema: JoiValidationSchema,
      isGlobal: true,
    }),
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_TOKEN_EXPIRATION'),
        },
      }),
    }),
  ],
  exports: [PassportModule, JwtModule],
})
export class AppModule {}
