import * as Http from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Request } from 'express';
import { AppRole } from 'echadospalante-domain';

import { GetUser } from '../../decorators';
import { Auth } from '../../decorators/auth.decorator';
import { AuthCookieInterceptor } from '../../interceptors/auth-cookie.interceptor';
import { User } from '../../interfaces/user';
import { ProxyService } from '../../proxy/request-proxy.service';

const path = '/events/categories';

@Http.Controller(path)
export class EventCategoriesController {
  private readonly EVENT_CATEGORIES_HOST: string;

  public constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    this.EVENT_CATEGORIES_HOST = `${this.configService.getOrThrow<string>(
      'VENTURES_MANAGEMENT_HOST',
    )}`;
  }

  @Auth()
  @Http.Get('')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async getEventCategories(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(request, this.EVENT_CATEGORIES_HOST, user);
  }

  @Auth(AppRole.ADMIN)
  @Http.Post('')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public createEventCategory(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(request, this.EVENT_CATEGORIES_HOST, user);
  }

  @Auth(AppRole.ADMIN)
  @Http.Put('')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public updateEventCategory(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(request, this.EVENT_CATEGORIES_HOST, user);
  }
}
