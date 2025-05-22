import * as Http from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppRole } from 'echadospalante-domain';
import { Request } from 'express';

import { GetUser } from '../../decorators';
import { Auth } from '../../decorators/auth.decorator';
import { AuthCookieInterceptor } from '../../interceptors/auth-cookie.interceptor';
import { User } from '../../interfaces/user';
import { ProxyService } from '../../proxy/request-proxy.service';

const path = '/users';

@Http.Controller(path)
export class UsersController {
  private readonly USERS_MANAGEMENT_HOST: string;

  public constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    this.USERS_MANAGEMENT_HOST = `${this.configService.getOrThrow<string>(
      'USERS_MANAGEMENT_HOST',
    )}`;
  }

  @Http.Get('')
  @Auth(AppRole.ADMIN)
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public getUsers(@Http.Req() request: Request, @GetUser() user: User) {
    return this.proxyService.forward(request, this.USERS_MANAGEMENT_HOST, user);
  }

  @Http.Get('/:id')
  @Auth(AppRole.ADMIN)
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public getUserById(@Http.Req() request: Request, @GetUser() user: User) {
    return this.proxyService.forward(request, this.USERS_MANAGEMENT_HOST, user);
  }

  @Auth(AppRole.ADMIN)
  @Http.Put('/:id/enable')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public enableUser(@Http.Req() request: Request, @GetUser() user: User) {
    return this.proxyService.forward(request, this.USERS_MANAGEMENT_HOST, user);
  }

  @Auth(AppRole.ADMIN)
  @Http.Put('/:id/disable')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public disableUser(@Http.Req() request: Request, @GetUser() user: User) {
    return this.proxyService.forward(request, this.USERS_MANAGEMENT_HOST, user);
  }

  @Auth(AppRole.ADMIN)
  @Http.Put('/:id/verify')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public verifyUser(@Http.Req() request: Request, @GetUser() user: User) {
    return this.proxyService.forward(request, this.USERS_MANAGEMENT_HOST, user);
  }

  @Auth(AppRole.ADMIN)
  @Http.Put('/:id/un-verify')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public unVerifyUser(@Http.Req() request: Request, @GetUser() user: User) {
    return this.proxyService.forward(request, this.USERS_MANAGEMENT_HOST, user);
  }

  @Auth(AppRole.ADMIN)
  @Http.Put('/:id/roles')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public changeUserRoles(@Http.Req() request: Request, @GetUser() user: User) {
    return this.proxyService.forward(request, this.USERS_MANAGEMENT_HOST, user);
  }
}
