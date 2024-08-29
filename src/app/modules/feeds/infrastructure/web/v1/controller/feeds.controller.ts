import * as Http from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Swagger from '@nestjs/swagger';

import { HttpService } from '../../../../../../config/http/axios.config';
import { feedApiDocs } from '../swagger/feeds.docs';

const { apiTag } = feedApiDocs;
const path = '/feeds';

@Swagger.ApiTags(apiTag)
@Http.Controller(path)
export class FeedsController {
  private readonly FEEDS_MANAGEMENT_URL: string;

  public constructor(
    private readonly httpAdapter: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.FEEDS_MANAGEMENT_URL = `${this.configService.getOrThrow<string>(
      'FEEDS_MANAGEMENT_URL',
    )}/api/v1/feeds`;
  }

  // @Auth(Role.ADMIN)
  // @Http.Get()
  // @Http.HttpCode(Http.HttpStatus.OK)
  // @Swagger.ApiBearerAuth()
  // @Swagger.ApiOperation(endpoints.getAllFeeds)
  // public getAllFeeds(): Promise<Feed[]> {
  //   return this.httpAdapter.get<Feed[]>(`${this.FEEDS_MANAGEMENT_URL}`);
  // }

  // TODO: Implement the rest of the methods for feeds
}
