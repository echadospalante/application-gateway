import * as Http from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Swagger from '@nestjs/swagger';

import { Donation } from 'x-ventures-domain';

import { HttpService } from '../../../../../../config/http/axios.config';
import { Auth } from '../../../../../auth/application/decorators';
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

  @Auth()
  @Http.Get()
  @Http.HttpCode(Http.HttpStatus.OK)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.getAllDonations)
  // Only accessible by the owner of the venture and the admin
  public getVentureDonations(
    // TODO: Move this to a query object class
    @Http.Query('ventureId') ventureId: number,
    @Http.Query('page') page: number,
    @Http.Query('limit') limit: number,
    @Http.Query('sort') sortBy: 'VALUE' | 'DATE',
    @Http.Query('sort') sortDir: 'asc' | 'desc',
  ): Promise<Donation[]> {
    return this.httpAdapter.get<Donation[]>(
      `${this.DONATIONS_MANAGEMENT_URL}?venture=${ventureId}&page=${page}&limit=${limit}&sort=${sortBy}&dir=${sortDir}`,
    );
  }

  // TODO: Create donation
  // TODO: Get all donations of a user
  // TODO: Get top donations
}
