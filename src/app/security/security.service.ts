import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';
import { decode, sign, verify } from 'jsonwebtoken';
import { Strategy } from 'passport-jwt';
import { catchError, map, Observable, throwError } from 'rxjs';

import { AccessTokenPayload } from '../interfaces/token-payload';
import { User } from '../interfaces/user';

@Injectable()
export class SecurityService extends PassportStrategy(Strategy) {
  public constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        if (req && req.cookies) {
          return req.cookies['authentication'];
        }
        return null;
      },
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_TOKEN_SECRET'),
    });
  }

  public validateJwt(token: string): boolean {
    try {
      const jwtSecret: string =
        this.configService.getOrThrow('JWT_TOKEN_SECRET');
      verify(token, jwtSecret);
      return true;
    } catch {
      return false;
    }
  }

  public validate(payload: AccessTokenPayload): Observable<User> {
    const { id } = payload;

    return this.httpService
      .get<User>(
        `${this.configService.getOrThrow('USERS_MANAGEMENT_HOST')}/api/v1/users/id/${id}`,
      )
      .pipe(
        map((response) => {
          const user = response.data;
          if (!user) {
            throw new UnauthorizedException('Token not active');
          }
          // if (!user.active) {
          //   throw new UnauthorizedException(
          //     'User is inactive, contact an admin',
          //   );
          // }
          return user;
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  public generateJwt(
    subject: string,
    claims: { [key: string]: any },
    expiresIn: number,
  ): string {
    const jwtSecret: string = this.configService.getOrThrow('JWT_TOKEN_SECRET');

    return sign(claims, jwtSecret, { expiresIn });
  }

  public getTokenInfo<T>(token: string): T {
    const decodedToken = decode(token);
    return decodedToken as T;
  }
}
