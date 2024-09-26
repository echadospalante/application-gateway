import * as Http from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Swagger from '@nestjs/swagger';

import { User, UserCreate } from 'echadospalante-core';
import { Request, Response } from 'express';

import { HttpService } from '../../../../../../config/http/axios.config';
import { AuthCookieInterceptor } from '../../../../../../modules/auth/application/interceptors/auth-cookie.interceptor';
import { GoogleTokenInterceptor } from '../../../../../../modules/auth/application/interceptors/google-token.interceptor';
import { Auth, GetUser } from '../../../../application/decorators';
import { IdTokenPayload } from '../model/request/login-request.dto';
import UserRegisterCreateDto from '../model/request/user-preferences-create.dto';
import { LoginResponse } from '../model/response/login-response.dto';
import { authApiDocs } from '../swagger/auth.docs';

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
      picture:
        payload.picture ||
        'https://cdn-icons-png.flaticon.com/512/3607/3607444.png',
      firstName: payload.given_name,
      lastName: payload.family_name,
    };
    return this.httpAdapter.post<UserCreate, LoginResponse>(
      `${this.USERS_MANAGEMENT_URL}`,
      user,
    );
  }

  @Auth()
  @Http.Post('/logout')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Swagger.ApiOperation(endpoints.logout)
  public logoutUser(@Http.Res() res: Response) {
    res.clearCookie('authentication');
    res.send({
      message: 'Logout successful',
    });
  }

  @Auth()
  @Http.Get('/refresh')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.refresh)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public refreshAuth(@GetUser() user: User) {
    console.log({ user });
    return this.httpAdapter.get<LoginResponse>(
      `${this.USERS_MANAGEMENT_URL}/${user.email}`,
    );
  }

  @Auth()
  @Http.Post('/register')
  @Http.HttpCode(Http.HttpStatus.CREATED)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.register)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public registerUser(
    @GetUser() user: User,
    @Http.Body() registerInfo: UserRegisterCreateDto,
  ) {
    console.log({ user, registerInfo });
    return this.httpAdapter
      .post(`${this.USERS_MANAGEMENT_URL}/register/${user.email}`, {
        ...registerInfo,
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
