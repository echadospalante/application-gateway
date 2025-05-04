import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as jwt from 'jsonwebtoken';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthCookieInterceptor implements NestInterceptor {
  public constructor(private configService: ConfigService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const cookie = request.cookies['authentication'];

    if (process.env.NODE_ENV === 'production' && !request.secure) {
      throw new UnauthorizedException('Request must be over HTTPS');
    }

    if (!cookie) {
      throw new UnauthorizedException('Access token is missing');
    }

    try {
      const payload = verify(
        cookie,
        this.configService.getOrThrow('JWT_TOKEN_SECRET'),
      );
      const secret: jwt.Secret =
        this.configService.getOrThrow('JWT_TOKEN_SECRET');

      request.user = payload as JwtPayload;

      return next.handle().pipe(
        tap(() => {
          const newToken = jwt.sign(payload, secret, {
            // expiresIn: '1d',
          });
          response.cookie('authentication', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'Lax',
          });
        }),
      );
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
