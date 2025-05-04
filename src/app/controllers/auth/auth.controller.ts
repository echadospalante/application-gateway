import { HttpService } from '@nestjs/axios';
import * as Http from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Request, Response } from 'express';
import { lastValueFrom, map } from 'rxjs';

import { Auth, GetUser } from '../../decorators';
import { AuthCookieInterceptor } from '../../interceptors/auth-cookie.interceptor';
import { GoogleTokenInterceptor } from '../../interceptors/google-token.interceptor';
import { User } from '../../interfaces/user';
import { ProxyService } from '../../proxy/request-proxy.service';
import { IdTokenPayload } from './../../interfaces/token-payload';

const path = '/auth';

@Http.Controller(path)
export class AuthController {
  private readonly USERS_MANAGEMENT_HOST: string;
  private readonly logger: Logger = new Logger(AuthController.name);

  public constructor(
    private readonly proxyService: ProxyService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.USERS_MANAGEMENT_HOST = this.configService.getOrThrow<string>(
      'USERS_MANAGEMENT_HOST',
    );
  }

  @Http.Post('/login')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(GoogleTokenInterceptor)
  public loginUser(@Http.Req() request: Request) {
    const payload = request.user as IdTokenPayload;
    const user = {
      email: payload.email,
      picture:
        payload.picture ||
        'https://cdn-icons-png.flaticon.com/512/3607/3607444.png',
      firstName: payload.given_name,
      lastName: payload.family_name,
    };
    return lastValueFrom(
      this.httpService
        .post(`${this.USERS_MANAGEMENT_HOST}/api/v1/auth/login`, user)
        .pipe(map(({ data }) => data)),
    );
  }

  @Auth()
  @Http.Post('/logout')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public logoutUser(@Http.Res() res: Response) {
    res.clearCookie('authentication');
    res.send({
      message: 'Se ha cerrado su sesión correctamente, vuelva pronto.',
    });
  }

  @Auth()
  @Http.Get('/refresh')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public refreshAuth(@Http.Req() request: Request, @GetUser() user: User) {
    return this.proxyService.forward(request, this.USERS_MANAGEMENT_HOST, user);
  }

  @Auth()
  @Http.Post('/onboarding')
  @Http.HttpCode(Http.HttpStatus.CREATED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public saveOnboarding(@Http.Req() request: Request, @GetUser() user: User) {
    return this.proxyService.forward(request, this.USERS_MANAGEMENT_HOST, user);
  }
}
