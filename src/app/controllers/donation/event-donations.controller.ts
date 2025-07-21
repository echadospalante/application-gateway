import * as Http from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Request } from 'express';

import { GetUser } from '../../decorators';
import { Auth } from '../../decorators/auth.decorator';
import { AuthCookieInterceptor } from '../../interceptors/auth-cookie.interceptor';
import { User } from '../../interfaces/user';
import { ProxyService } from '../../proxy/request-proxy.service';

const path = '/events';

@Http.Controller(path)
export class EventDonationsController {
  private readonly EVENT_DONATIONS_HOST: string;

  public constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    this.EVENT_DONATIONS_HOST = `${this.configService.getOrThrow<string>(
      'VENTURES_MANAGEMENT_HOST',
    )}`;
  }

  @Auth()
  @Http.Get('/_/donations/sent')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async getSentEventDonations(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(request, this.EVENT_DONATIONS_HOST, user);
  }

  @Auth()
  @Http.Get('/_/donations/received')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async getReceivedEventDonations(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(request, this.EVENT_DONATIONS_HOST, user);
  }

  @Auth()
  @Http.Post('/:eventId/donations')
  @Http.HttpCode(Http.HttpStatus.CREATED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public createEventDonation(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(request, this.EVENT_DONATIONS_HOST, user);
  }

  @Auth()
  @Http.Get('/:eventId/donations')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public getEventDonation(@Http.Req() request: Request, @GetUser() user: User) {
    return this.proxyService.forward(request, this.EVENT_DONATIONS_HOST, user);
  }
}
