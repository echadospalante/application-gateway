import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { HttpService } from '../../config/http/axios.config';
import { AuthController } from './infrastructure/web/v1/controller/auth.controller';
import { GoogleTokenInterceptor } from './application/interceptors/google-token.interceptor';
import { AuthCookieInterceptor } from './application/interceptors/auth-cookie.interceptor';
import { AuthHttpService } from './domain/gateway/http/http.gateway';
import { AuthHttpAdapter } from './infrastructure/http/http.service';

@Module({
  controllers: [AuthController],
  providers: [
    HttpService,
    GoogleTokenInterceptor,
    AuthCookieInterceptor,
    {
      provide: AuthHttpService,
      useClass: AuthHttpAdapter,
    },
  ],
  imports: [
    ConfigModule,

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<number>('JWT_TOKEN_EXPIRATION'),
        },
      }),
    }),
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
