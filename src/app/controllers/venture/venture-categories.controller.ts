import * as Http from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Request } from 'express';
import { AppRole } from 'echadospalante-domain';

import { GetUser } from '../../decorators';
import { Auth } from '../../decorators/auth.decorator';
import { AuthCookieInterceptor } from '../../interceptors/auth-cookie.interceptor';
import { User } from '../../interfaces/user';
import { ProxyService } from '../../proxy/request-proxy.service';

const path = '/ventures/categories';

@Http.Controller(path)
export class VentureCategoriesController {
  private readonly VENTURE_CATEGORIES_HOST: string;

  public constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    this.VENTURE_CATEGORIES_HOST = `${this.configService.getOrThrow<string>(
      'VENTURES_MANAGEMENT_HOST',
    )}`;
  }

  @Auth()
  @Http.Get('/all')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async getVentureCategories(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(
      request,
      this.VENTURE_CATEGORIES_HOST,
      user,
    );
  }

  @Auth()
  @Http.Get('/count-stats')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async getVentureCategoriesStats(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(
      request,
      this.VENTURE_CATEGORIES_HOST,
      user,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Post('')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public createVentureCategory(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(
      request,
      this.VENTURE_CATEGORIES_HOST,
      user,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Put('')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public updateVentureCategory(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(
      request,
      this.VENTURE_CATEGORIES_HOST,
      user,
    );
  }
}
