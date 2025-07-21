import * as Http from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppRole } from 'echadospalante-domain';
import { Request } from 'express';

import { GetUser } from '../../decorators';
import { Auth } from '../../decorators/auth.decorator';
import { AuthCookieInterceptor } from '../../interceptors/auth-cookie.interceptor';
import { User } from '../../interfaces/user';
import { ProxyService } from '../../proxy/request-proxy.service';

const path = '/publications/categories';

@Http.Controller(path)
export class PublicationCategoriesController {
  private readonly PUBLICATION_CATEGORIES_HOST: string;

  public constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    this.PUBLICATION_CATEGORIES_HOST = `${this.configService.getOrThrow<string>(
      'VENTURES_MANAGEMENT_HOST',
    )}`;
  }

  @Auth()
  @Http.Get('/count-stats')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async getPublicationCategoriesStats(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(
      request,
      this.PUBLICATION_CATEGORIES_HOST,
      user,
    );
  }

  @Auth()
  @Http.Get('')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async getPublicationCategories(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(
      request,
      this.PUBLICATION_CATEGORIES_HOST,
      user,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Post('')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public createPublicationCategory(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(
      request,
      this.PUBLICATION_CATEGORIES_HOST,
      user,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Put('')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public updatePublicationCategory(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(
      request,
      this.PUBLICATION_CATEGORIES_HOST,
      user,
    );
  }
}
