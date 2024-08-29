import * as Http from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Swagger from '@nestjs/swagger';

import { Role, User } from 'x-ventures-domain';

import { HttpService } from '../../../../../../config/http/axios.config';
import { Auth, GetUser } from '../../../../application/decorators';
import { LoginRequestDto } from '../model/request/login-request.dto';
import { authApiDocs } from '../swagger/auth.docs';

const { apiTag, endpoints } = authApiDocs;

const path = '/auth';

@Http.Controller(path)
@Swagger.ApiTags(apiTag)
export class AuthController {
  private readonly AUTH_MANAGEMENT_URL: string;

  public constructor(
    private readonly httpAdapter: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.AUTH_MANAGEMENT_URL = `${this.configService.getOrThrow<string>(
      'AUTH_MANAGEMENT_URL',
    )}/api/v1/auth`;
  }

  @Auth()
  @Http.Get('/refresh')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.refresh)
  public refreshAuth(@GetUser() user: User) {
    return this.httpAdapter.post(
      `${this.AUTH_MANAGEMENT_URL}/auth/refresh`,
      user,
    );
  }

  @Auth(Role.ADMIN)
  @Http.Put('/disable/:id')
  @Http.HttpCode(Http.HttpStatus.NO_CONTENT)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.disableAccount)
  public disableAccount(@Http.Param('id') id: string) {
    return this.httpAdapter.put(
      `${this.AUTH_MANAGEMENT_URL}/auth/disable/${id}`,
    );
  }

  @Auth(Role.ADMIN)
  @Http.Put('/enable/:id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.enableAccount)
  public enableAccount(@Http.Param('id') id: string) {
    return this.httpAdapter.put(
      `${this.AUTH_MANAGEMENT_URL}/auth/enable/${id}`,
    );
  }

  @Http.Post('/login')
  @Http.HttpCode(Http.HttpStatus.CREATED)
  @Swagger.ApiOperation(endpoints.login)
  public loginUser(@Http.Body() loginInfo: LoginRequestDto) {
    return this.httpAdapter.post(
      `${this.AUTH_MANAGEMENT_URL}/auth/login`,
      loginInfo,
    );
  }
}
