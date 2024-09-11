import * as Http from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Swagger from '@nestjs/swagger';

import { User, AppRole, UserCreate } from 'x-ventures-domain';

import { Request } from 'express';
import { AuthCookieInterceptor } from 'src/app/modules/auth/application/interceptors/auth-cookie.interceptor';
import { GoogleTokenInterceptor } from 'src/app/modules/auth/application/interceptors/google-token.interceptor';
import { HttpService } from '../../../../../../config/http/axios.config';
import { Auth, GetUser } from '../../../../application/decorators';
import { IdTokenPayload } from '../model/request/login-request.dto';
import { authApiDocs } from '../swagger/auth.docs';
import { LoginResponse } from '../model/response/login-response.dto';

const { apiTag, endpoints } = authApiDocs;

const path = '/auth';

@Http.Controller(path)
@Swagger.ApiTags(apiTag)
export class AuthController {
  private readonly USERS_MANAGEMENT_URL: string;
  public constructor(
    private readonly httpAdapter: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.USERS_MANAGEMENT_URL = `${this.configService.getOrThrow<string>(
      'USERS_MANAGEMENT_URL',
    )}/api/v1/users`;
  }

  @Http.Post('/login')
  @Http.HttpCode(Http.HttpStatus.CREATED)
  @Swagger.ApiOperation(endpoints.login)
  @Http.UseInterceptors(GoogleTokenInterceptor)
  public loginUser(@Http.Req() request: Request) {
    const payload = request.user as IdTokenPayload;
    const user = {
      email: payload.email,
      picture: payload.picture,
      firstName: payload.given_name,
      lastName: payload.family_name,
    };
    console.log(payload);
    return this.httpAdapter
      .post<UserCreate, LoginResponse>(`${this.USERS_MANAGEMENT_URL}`, user)
      .then((response) => response);
  }

  @Auth()
  @Http.Get('/refresh')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.refresh)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public refreshAuth(@GetUser() user: User) {
    // return this.httpAdapter.post(
    //   `${this.AUTH_MANAGEMENT_URL}/auth/refresh`,
    //   user,
    // );
  }

  @Auth(AppRole.ADMIN)
  @Http.Put('/disable/:id')
  @Http.HttpCode(Http.HttpStatus.NO_CONTENT)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.disableAccount)
  public disableAccount(@Http.Param('id') id: string) {
    // return this.httpAdapter.put(
    //   `${this.AUTH_MANAGEMENT_URL}/auth/disable/${id}`,
    // );
  }

  @Auth(AppRole.ADMIN)
  @Http.Put('/enable/:id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.enableAccount)
  public enableAccount(@Http.Param('id') id: string) {
    // return this.httpAdapter.put(
    //   `${this.AUTH_MANAGEMENT_URL}/auth/enable/${id}`,
    // );
  }
}
