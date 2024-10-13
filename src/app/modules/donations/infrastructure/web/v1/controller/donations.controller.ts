import * as Http from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Swagger from '@nestjs/swagger';

import { HttpService } from '../../../../../../config/http/axios.config';
import { donationsApiDocs } from '../swagger/donations.docs';

const { apiTag, endpoints } = donationsApiDocs;

const path = '/donations';

@Swagger.ApiTags(apiTag)
@Http.Controller(path)
export class DonationsController {
  private readonly DONATIONS_MANAGEMENT_URL: string;

  public constructor(
    private readonly httpAdapter: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.DONATIONS_MANAGEMENT_URL = `${this.configService.getOrThrow<string>(
      'DONATIONS_MANAGEMENT_URL',
    )}/api/v1/donations`;
  }

  // TODO: Create donation
  // TODO: Get all donations of a user
  // TODO: Get top donations
}
