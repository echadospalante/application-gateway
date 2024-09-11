import * as Http from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import * as Swagger from '@nestjs/swagger';

import { Venture, AppRole } from 'x-ventures-domain';

import { HttpService } from '../../../../../../config/http/axios.config';
import { Auth } from '../../../../../auth/application/decorators';
import VentureCreateDto from '../model/request/venture-create.dto';
import VentureUpdateDto from '../model/request/venture-update.dto';
import { venturesApiDocs } from '../swagger/ventures.docs';

const { apiTag, endpoints } = venturesApiDocs;
const path = '/ventures';

@Swagger.ApiTags(apiTag)
@Http.Controller(path)
export class VenturesController {
  private readonly VENTURES_MANAGEMENT_URL: string;

  public constructor(
    private readonly httpAdapter: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.VENTURES_MANAGEMENT_URL = `${this.configService.getOrThrow<string>(
      'VENTURES_MANAGEMENT_URL',
    )}/api/v1/ventures`;
  }

  @Auth(AppRole.ADMIN)
  @Http.Get()
  @Http.HttpCode(Http.HttpStatus.OK)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.getAllVentures)
  public getAllVentures(): Promise<Venture[]> {
    return this.httpAdapter.get<Venture[]>(`${this.VENTURES_MANAGEMENT_URL}`);
  }

  @Auth(AppRole.ADMIN)
  @Http.Post()
  @Http.HttpCode(Http.HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.createVenture)
  @Swagger.ApiConsumes('multipart/form-data')
  public async createVenture(
    @Http.UploadedFile() image: Express.Multer.File,
    @Http.Body() ventureCreateDto: VentureCreateDto,
  ): Promise<void> {
    const data = {
      ...ventureCreateDto,
      image: image.buffer.toString('base64'),
      mimeType: image.mimetype,
    };
    console.log({ data });
    return this.httpAdapter.post(`${this.VENTURES_MANAGEMENT_URL}`, data);
  }

  @Auth(AppRole.ADMIN)
  @Http.Put(':id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @UseInterceptors(FileInterceptor('image'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.updateVenture)
  @Swagger.ApiConsumes('multipart/form-data')
  public updateVenture(
    @Http.Param('id') ventureId: string,
    @Http.UploadedFile() image: Express.Multer.File,
    @Http.Body() ventureUpdateDto: VentureUpdateDto,
  ): Promise<Venture | null> {
    const data = {
      ...ventureUpdateDto,
      image: image.buffer.toString('base64'),
      mimeType: image.mimetype,
    };
    return this.httpAdapter.put(
      `${this.VENTURES_MANAGEMENT_URL}/${ventureId}`,
      data,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Patch('enable/:id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.enableVenture)
  public enableVenture(@Http.Param('id') id: string): Promise<void> {
    return this.httpAdapter.put(
      `${this.VENTURES_MANAGEMENT_URL}/enable/${id}`,
      {},
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Patch('disable/:id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.disableVenture)
  public disableVenture(@Http.Param('id') id: string): Promise<void> {
    return this.httpAdapter.put(
      `${this.VENTURES_MANAGEMENT_URL}/disable/${id}`,
      undefined,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Delete(':id')
  @Http.HttpCode(Http.HttpStatus.NO_CONTENT)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.deleteVenture)
  public deleteVenture(@Http.Param('id') id: string): Promise<void> {
    return this.httpAdapter.delete(`${this.VENTURES_MANAGEMENT_URL}/${id}`);
  }

  @Auth()
  @Http.Get('image/:id')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.getVentureImage)
  public getVentureImage(@Http.Param('id') id: string): Promise<Blob> {
    return this.httpAdapter.get(`${this.VENTURES_MANAGEMENT_URL}/image/${id}`);
  }

  @Auth(AppRole.ADMIN)
  @Http.Put('image/:id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @UseInterceptors(FileInterceptor('file'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.updateVentureImage)
  public updateVentureImage(
    @Http.Param('id') ventureId: string,
    @Http.UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    const formData = new FormData();
    const blob = new Blob([file.buffer], { type: file.mimetype });
    formData.append('file', blob, file.originalname);

    return this.httpAdapter.put(
      `${this.VENTURES_MANAGEMENT_URL}/image/${ventureId}`,
      formData,
    );
  }
}
