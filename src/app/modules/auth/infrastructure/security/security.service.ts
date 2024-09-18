import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';
import { decode, sign, verify } from 'jsonwebtoken';
import { Strategy } from 'passport-jwt';
import { AccessTokenPayload, User } from 'x-ventures-domain';

import { HttpService } from '../../../../config/http/axios.config';

@Injectable()
export class SecurityToolboxImpl extends PassportStrategy(Strategy) {
  public constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        if (req && req.cookies) {
          console.log({ cookies: req.cookies });
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
      console.log({ token });
      const jwtSecret: string =
        this.configService.getOrThrow('JWT_TOKEN_SECRET');
      verify(token, jwtSecret);
      return true;
    } catch {
      return false;
    }
  }

  public async validate(payload: AccessTokenPayload): Promise<User> {
    const { email } = payload;
    const user = await this.httpService.get<User>(
      `${this.configService.getOrThrow('USERS_MANAGEMENT_URL')}/api/v1/users/${email}`,
    );
    if (!user) throw new UnauthorizedException('Token not active');
    if (!user.active)
      throw new UnauthorizedException('User is inactive, contact an admin');
    return user;
    // throw new UnauthorizedException('Not implemented');
  }

  public generateJwt(
    subject: string,
    claims: { [key: string]: any },
    expiresIn: number,
  ): string {
    const jwtSecret: string = this.configService.getOrThrow('JWT_TOKEN_SECRET');

    return sign(claims, jwtSecret, { expiresIn });
  }

  public generatePasswordHash(password: string): string {
    // const salt: string = genSaltSync(10);
    // return hashSync(password, salt);
    return '';
  }

  public comparePasswordHash(password: string, hash: string): boolean {
    // return compareSync(password, hash);
    return true;
  }

  public getTokenInfo<T>(token: string): T {
    const decodedToken = decode(token);
    return decodedToken as T;
  }
}
