import * as Http from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Swagger from '@nestjs/swagger';

import { Profile, AppRole } from 'x-ventures-domain';

import { HttpService } from '../../../../../../config/http/axios.config';
import { Auth } from '../../../../../auth/application/decorators';
import { userApiDocs } from '../swagger/users.docs';

const { apiTag, endpoints } = userApiDocs;
const path = '/profiles';

@Swagger.ApiTags(apiTag)
@Http.Controller(path)
export class ProfilesController {
  private readonly USER_PROFILES_MANAGEMENT_URL: string;

  public constructor(
    private readonly httpAdapterService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.USER_PROFILES_MANAGEMENT_URL = `${this.configService.getOrThrow<string>(
      'USER_PROFILES_MANAGEMENT_URL',
    )}/api/v1/profiles`;
  }

  @Auth(AppRole.ADMIN)
  @Http.Get()
  @Http.HttpCode(Http.HttpStatus.OK)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.getAllProfiles)
  public getAllProfiles(): Promise<Profile[]> {
    return this.httpAdapterService.get<Profile[]>(
      `${this.USER_PROFILES_MANAGEMENT_URL}`,
    );
  }
}
