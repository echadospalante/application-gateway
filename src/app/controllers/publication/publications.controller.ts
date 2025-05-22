import * as Http from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';

import { AppRole } from 'echadospalante-domain';
import { Request } from 'express';

import { GetUser } from '../../decorators';
import { Auth } from '../../decorators/auth.decorator';
import { AuthCookieInterceptor } from '../../interceptors/auth-cookie.interceptor';
import { User } from '../../interfaces/user';
import { ProxyService } from '../../proxy/request-proxy.service';

const path = '/ventures';

@Http.Controller(path)
export class PublicationsController {
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
  @Http.Post('/_/publications/cover-photo')
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
  @Http.Post('/:ventureId/publications')
  @Http.HttpCode(Http.HttpStatus.CREATED)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public createPublication(@Http.Req() request: Request, @GetUser() user: User) {
    return this.proxyService.forward(
      request,
      this.VENTURES_MANAGEMENT_HOST,
      user,
    );
  }

  @Auth()
  @Http.Get('/_/publications')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async getPublicationsOfAllVentures(
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
  @Http.Get('/:ventureId/publications')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public async getPublicationsOfVenture(
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
  public updatePublication(@Http.Req() request: Request, @GetUser() user: User) {
    return this.proxyService.forward(
      request,
      this.VENTURES_MANAGEMENT_HOST,
      user,
    );
  }
}
