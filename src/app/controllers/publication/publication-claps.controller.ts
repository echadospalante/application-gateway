import * as Http from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Request } from 'express';

import { GetUser } from '../../decorators';
import { Auth } from '../../decorators/auth.decorator';
import { AuthCookieInterceptor } from '../../interceptors/auth-cookie.interceptor';
import { User } from '../../interfaces/user';
import { ProxyService } from '../../proxy/request-proxy.service';

const path = '/publications';

@Http.Controller(path)
export class PublicationClapsController {
  private readonly VENTURES_MANAGEMENT_HOST: string;

  private readonly logger = new Http.Logger(PublicationClapsController.name);
  public constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    this.VENTURES_MANAGEMENT_HOST = `${this.configService.getOrThrow<string>(
      'VENTURES_MANAGEMENT_HOST',
    )}`;
  }

  @Auth()
  @Http.Post('/:publicationId/claps')
  @Http.HttpCode(Http.HttpStatus.CREATED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public savePublicationClap(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(
      request,
      this.VENTURES_MANAGEMENT_HOST,
      user,
    );
  }

  @Auth()
  @Http.Delete('/:publicationId/claps/:clapId')
  @Http.HttpCode(Http.HttpStatus.NO_CONTENT)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async deletePublicationClap(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(
      request,
      this.VENTURES_MANAGEMENT_HOST,
      user,
    );
  }
}
