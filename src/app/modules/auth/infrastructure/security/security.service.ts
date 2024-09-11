import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { decode, sign, verify } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload, User } from 'x-ventures-domain';

import { HttpService } from '../../../../config/http/axios.config';

@Injectable()
export class SecurityToolboxImpl extends PassportStrategy(Strategy) {
  public constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    super({
      secretOrKey: configService.getOrThrow('JWT_TOKEN_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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

  public async validate(payload: AccessTokenPayload): Promise<User> {
    // const { id } = payload;
    // const user = await this.userRepository.findOneByCriteria({ _id: id });
    // if (!user) throw new UnauthorizedException('Token not active');
    // if (!user.active)
    //   throw new UnauthorizedException('User is inactive, contact an admin');
    // return user;
    throw new UnauthorizedException('Not implemented');
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
