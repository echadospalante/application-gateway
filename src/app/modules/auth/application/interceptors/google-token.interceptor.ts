import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';

import { AccessTokenPayload } from 'echadospalante-core';
import * as jwt from 'jsonwebtoken';
import * as jwksRsa from 'jwks-rsa';
import { Observable, from } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { ConfigService } from '@nestjs/config';
import { AuthHttpService } from '../../domain/gateway/http/http.gateway';

@Injectable()
export class GoogleTokenInterceptor implements NestInterceptor {
  private readonly client: jwksRsa.JwksClient;
  private readonly JWT_SECRET: string =
    this.configService.getOrThrow<string>('JWT_TOKEN_SECRET');

  public constructor(
    @Inject(AuthHttpService)
    private authHttpService: AuthHttpService,
    private configService: ConfigService,
  ) {
    this.client = jwksRsa({
      jwksUri: 'https://www.googleapis.com/oauth2/v3/certs',
    });
  }

  private getKey(
    header: jwt.JwtHeader,
    callback: jwt.SigningKeyCallback,
  ): void {
    this.client.getSigningKey(header.kid, (err, key) => {
      if (err) {
        callback(err, undefined);
      } else {
        const signingKey = key!.getPublicKey();
        callback(null, signingKey);
      }
    });
  }

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const authHeader: string | undefined = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token: string = authHeader.split(' ')[1].trim();

    return from(
      new Promise<AccessTokenPayload>((resolve, reject) => {
        jwt.verify(
          token,
          this.getKey.bind(this),
          {
            algorithms: ['RS256'],
            issuer: ['accounts.google.com', 'https://accounts.google.com'],
          },
          (err, decoded: AccessTokenPayload | undefined) => {
            if (err) {
              reject(new UnauthorizedException('Invalid token'));
            } else if (decoded) {
              request.user = decoded;
              resolve(decoded);
            }
          },
        );
      }),
    ).pipe(
      switchMap(() =>
        next.handle().pipe(
          tap(() => {
            const newToken = jwt.sign(
              { email: request.user.email },
              this.JWT_SECRET,
              {
                expiresIn: '1d',
              },
            );
            response.cookie('authentication', newToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite:
                process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
              maxAge: 1000 * 60 * 60 * 24,
              path: '/',
            });
          }),
        ),
      ),
      catchError((err) => {
        throw err;
      }),
    );
  }
}
