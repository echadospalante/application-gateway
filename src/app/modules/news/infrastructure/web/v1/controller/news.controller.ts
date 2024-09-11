import * as Http from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import * as Swagger from '@nestjs/swagger';

import { AppRole, News } from 'x-ventures-domain';
import { HttpService } from '../../../../../../config/http/axios.config';
import { Auth } from '../../../../../auth/application/decorators';
import NewsCreateDto from '../model/request/news-create.dto';
import NewsUpdateDto from '../model/request/news-update.dto';
import { newsApiDocs } from '../swagger/news.docs';

const { apiTag, endpoints } = newsApiDocs;
const path = '/news';

@Swagger.ApiTags(apiTag)
@Http.Controller(path)
export class NewsController {
  private readonly NEWS_MANAGEMENT_URL: string;

  public constructor(
    private readonly httpAdapter: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.NEWS_MANAGEMENT_URL = `${this.configService.getOrThrow<string>(
      'NEWS_MANAGEMENT_URL',
    )}/api/v1/news`;
  }

  @Auth(AppRole.ADMIN)
  @Http.Get()
  @Http.HttpCode(Http.HttpStatus.OK)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.getAllNews)
  public getAllNews(): Promise<News[]> {
    return this.httpAdapter.get<News[]>(`${this.NEWS_MANAGEMENT_URL}`);
  }

  @Auth(AppRole.ADMIN)
  @Http.Post()
  @Http.HttpCode(Http.HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.createNews)
  @Swagger.ApiConsumes('multipart/form-data')
  public async createNews(
    @Http.UploadedFile() image: Express.Multer.File,
    @Http.Body() newsCreateDto: NewsCreateDto,
  ): Promise<void> {
    const data = {
      ...newsCreateDto,
      image: image.buffer.toString('base64'),
      mimeType: image.mimetype,
    };
    console.log({ data });
    return this.httpAdapter.post(`${this.NEWS_MANAGEMENT_URL}`, data);
  }

  @Auth(AppRole.ADMIN)
  @Http.Put(':id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @UseInterceptors(FileInterceptor('image'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.updateNews)
  @Swagger.ApiConsumes('multipart/form-data')
  public updateNews(
    @Http.Param('id') newsId: string,
    @Http.UploadedFile() image: Express.Multer.File,
    @Http.Body() newsUpdateDto: NewsUpdateDto,
  ): Promise<News | null> {
    const data = {
      ...newsUpdateDto,
      image: image.buffer.toString('base64'),
      mimeType: image.mimetype,
    };
    return this.httpAdapter.put(
      `${this.NEWS_MANAGEMENT_URL}/news/${newsId}`,
      data,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Patch('enable/:id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.enableNews)
  public enableNews(@Http.Param('id') id: string): Promise<void> {
    return this.httpAdapter.put(
      `${this.NEWS_MANAGEMENT_URL}/news/enable/${id}`,
      {},
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Patch('disable/:id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.disableNews)
  public disableNews(@Http.Param('id') id: string): Promise<void> {
    return this.httpAdapter.put(
      `${this.NEWS_MANAGEMENT_URL}/news/disable/${id}`,
      undefined,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Delete(':id')
  @Http.HttpCode(Http.HttpStatus.NO_CONTENT)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.deleteNews)
  public deleteNews(@Http.Param('id') id: string): Promise<void> {
    return this.httpAdapter.delete(`${this.NEWS_MANAGEMENT_URL}/news/${id}`);
  }

  @Auth()
  @Http.Get('image/:id')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.getNewsImage)
  public getNewsImage(@Http.Param('id') id: string): Promise<Blob> {
    return this.httpAdapter.get(`${this.NEWS_MANAGEMENT_URL}/news/image/${id}`);
  }

  @Auth(AppRole.ADMIN)
  @Http.Put('image/:id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @UseInterceptors(FileInterceptor('file'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.updateNewsImage)
  public updateNewsImage(
    @Http.Param('id') newsId: string,
    @Http.UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    const formData = new FormData();
    const blob = new Blob([file.buffer], { type: file.mimetype });
    formData.append('file', blob, file.originalname);

    return this.httpAdapter.put(
      `${this.NEWS_MANAGEMENT_URL}/news/image/${newsId}`,
      formData,
    );
  }
}
