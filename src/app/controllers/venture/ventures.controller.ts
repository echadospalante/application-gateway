import * as Http from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Request } from 'express';
import { AppRole } from 'echadospalante-domain';

import { GetUser } from '../../decorators';
import { Auth } from '../../decorators/auth.decorator';
import { AuthCookieInterceptor } from '../../interceptors/auth-cookie.interceptor';
import { User } from '../../interfaces/user';
import { ProxyService } from '../../proxy/request-proxy.service';
import { FileInterceptor } from '@nestjs/platform-express';

const path = '/ventures';

@Http.Controller(path)
export class VenturesController {
  private readonly VENTURES_MANAGEMENT_HOST: string;

  public constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    this.VENTURES_MANAGEMENT_HOST = `${this.configService.getOrThrow<string>(
      'VENTURES_MANAGEMENT_HOST',
    )}`;
  }

  @Auth(AppRole.ADMIN, AppRole.USER)
  @Http.Post('/cover-photo')
  @Http.UseInterceptors(FileInterceptor('file'))
  @Http.HttpCode(Http.HttpStatus.CREATED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public createCoverPhoto(
    @Http.Req() request: Request,
    @GetUser() user: User,
    @Http.UploadedFile() file: Express.Multer.File,
  ) {
    return this.proxyService.forwardFile(
      request,
      file,
      this.VENTURES_MANAGEMENT_HOST,
      user,
    );
  }

  @Auth(AppRole.ADMIN, AppRole.USER)
  @Http.Post('')
  @Http.HttpCode(Http.HttpStatus.CREATED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public createVenture(@Http.Req() request: Request, @GetUser() user: User) {
    return this.proxyService.forward(
      request,
      this.VENTURES_MANAGEMENT_HOST,
      user,
    );
  }

  @Auth()
  @Http.Get('')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async getVentures(
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
  @Http.Get('/owned')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async getOwnedVentures(
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
  @Http.Get('/map')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async getVenturesForMap(
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
  @Http.Get('/:ventureId/stats')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async getVentureStats(
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
  @Http.Get('/:ventureId')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async getVentureDetail(
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
  @Http.Get('/slug/:ventureSlug')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async getVentureDetailBySlug(
    @Http.Req() request: Request,
    @GetUser() user: User,
  ) {
    return this.proxyService.forward(
      request,
      this.VENTURES_MANAGEMENT_HOST,
      user,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Put('')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public updateVenture(@Http.Req() request: Request, @GetUser() user: User) {
    return this.proxyService.forward(
      request,
      this.VENTURES_MANAGEMENT_HOST,
      user,
    );
  }
}
