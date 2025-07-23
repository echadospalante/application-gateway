import * as Http from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Request } from 'express';

import { GetUser } from '../../decorators';
import { Auth } from '../../decorators/auth.decorator';
import { AuthCookieInterceptor } from '../../interceptors/auth-cookie.interceptor';
import { User } from '../../interfaces/user';
import { ProxyService } from '../../proxy/request-proxy.service';

const path = '/ventures';

@Http.Controller(path)
export class VentureSponsorshipsController {
  private readonly VENTURE_SPONSORSHIPS_HOST: string;

  public constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    this.VENTURE_SPONSORSHIPS_HOST = `${this.configService.getOrThrow<string>(
      'VENTURES_MANAGEMENT_HOST',
    )}`;
  }

  @Auth()
  @Http.Get('/_/sponsorships/sent')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async getSentVentureSponsorships(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(
      request,
      this.VENTURE_SPONSORSHIPS_HOST,
      user,
    );
  }

  @Auth()
  @Http.Get('/_/sponsorships/received')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async getReceivedVentureSponsorships(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(
      request,
      this.VENTURE_SPONSORSHIPS_HOST,
      user,
    );
  }

  @Auth()
  @Http.Post('/:ventureId/sponsorships')
  @Http.HttpCode(Http.HttpStatus.CREATED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public createVentureSponsorship(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(
      request,
      this.VENTURE_SPONSORSHIPS_HOST,
      user,
    );
  }

  @Auth()
  @Http.Get('/:ventureId/sponsorships')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public getVentureSponsorship(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(
      request,
      this.VENTURE_SPONSORSHIPS_HOST,
      user,
    );
  }

  @Auth()
  @Http.Delete('/:ventureId/sponsorships/:sponsorshipId')
  @Http.HttpCode(Http.HttpStatus.NO_CONTENT)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public deleteVentureSponsorship(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(
      request,
      this.VENTURE_SPONSORSHIPS_HOST,
      user,
    );
  }
}
