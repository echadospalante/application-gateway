import * as Http from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Swagger from '@nestjs/swagger';

import { User } from 'echadospalante-core';

import { HttpService } from '../../../../../../config/http/axios.config';
import { Auth, GetUser } from '../../../../../auth/application/decorators';
import { userApiDocs } from '../swagger/users.docs';

const { apiTag, endpoints } = userApiDocs;
const path = '/users/contact';

@Swagger.ApiTags(apiTag)
@Http.Controller(path)
export class UsersContactController {
  private readonly USERS_MANAGEMENT_URL: string;

  public constructor(
    private readonly httpAdapter: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.USERS_MANAGEMENT_URL = `${this.configService.getOrThrow<string>(
      'USERS_MANAGEMENT_URL',
    )}/api/v1/users/contact`;
  }

  @Auth()
  @Http.Get()
  @Http.HttpCode(Http.HttpStatus.OK)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.getUserContactInfo)
  public getUserContactInfo(@GetUser() user: User): Promise<User[]> {
    console.log({ USER_CONTACT: user });
    return this.httpAdapter.get<User[]>(
      `${this.USERS_MANAGEMENT_URL}/${user.email}`,
    );
  }
}
