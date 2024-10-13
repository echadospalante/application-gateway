import * as Http from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import * as Swagger from '@nestjs/swagger';

import { AppRole } from 'echadospalante-core';

import { HttpService } from '../../../../../../config/http/axios.config';
import { Auth } from '../../../../../auth/application/decorators';
import NotificationCreateDto from '../model/request/notification-create.dto';
import NotificationUpdateDto from '../model/request/notification-update.dto';
import { notificationApiDocs } from '../swagger/notifications.docs';

const { apiTag, endpoints } = notificationApiDocs;
const path = '/news';

@Swagger.ApiTags(apiTag)
@Http.Controller(path)
export class NotificationsController {
  private readonly NOTIFICATIONS_MANAGEMENT_URL: string;

  public constructor(
    private readonly httpAdapter: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.NOTIFICATIONS_MANAGEMENT_URL = `${this.configService.getOrThrow<string>(
      'NOTIFICATIONS_MANAGEMENT_URL',
    )}/api/v1/notifications`;
  }

  @Auth(AppRole.ADMIN)
  @Http.Get()
  @Http.HttpCode(Http.HttpStatus.OK)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.getAllNotifications)
  public getAllNotifications(): Promise<Notification[]> {
    return this.httpAdapter.get<Notification[]>(
      `${this.NOTIFICATIONS_MANAGEMENT_URL}/news`,
    );
  }

  @Auth()
  @Http.Get('basic')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.getAllBasicNotificationsInfo)
  public getAllBasicNotificationsInfo(): Promise<Notification[]> {
    return this.httpAdapter.get<Notification[]>(
      `${this.NOTIFICATIONS_MANAGEMENT_URL}/news/basic`,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Post()
  @Http.HttpCode(Http.HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.createNotification)
  @Swagger.ApiConsumes('multipart/form-data')
  public async createNotification(
    @Http.UploadedFile() image: Express.Multer.File,
    @Http.Body() notificationCreateDto: NotificationCreateDto,
  ): Promise<void> {
    const data = {
      ...notificationCreateDto,
      image: image.buffer.toString('base64'),
      mimeType: image.mimetype,
    };
    console.log({ data });
    return this.httpAdapter.post(
      `${this.NOTIFICATIONS_MANAGEMENT_URL}/news`,
      data,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Put(':id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @UseInterceptors(FileInterceptor('image'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.updateNotification)
  @Swagger.ApiConsumes('multipart/form-data')
  public updateNotification(
    @Http.Param('id') notificationId: string,
    @Http.UploadedFile() image: Express.Multer.File,
    @Http.Body() notificationUpdateDto: NotificationUpdateDto,
  ): Promise<Notification | null> {
    const data = {
      ...notificationUpdateDto,
      image: image.buffer.toString('base64'),
      mimeType: image.mimetype,
    };
    return this.httpAdapter.put(
      `${this.NOTIFICATIONS_MANAGEMENT_URL}/news/${notificationId}`,
      data,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Patch('enable/:id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.enableNotification)
  public enableNotification(@Http.Param('id') id: string): Promise<void> {
    return this.httpAdapter.put(
      `${this.NOTIFICATIONS_MANAGEMENT_URL}/news/enable/${id}`,
      {},
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Patch('disable/:id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.disableNotification)
  public disableNotification(@Http.Param('id') id: string): Promise<void> {
    return this.httpAdapter.put(
      `${this.NOTIFICATIONS_MANAGEMENT_URL}/news/disable/${id}`,
      undefined,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Delete(':id')
  @Http.HttpCode(Http.HttpStatus.NO_CONTENT)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.deleteNotification)
  public deleteNotification(@Http.Param('id') id: string): Promise<void> {
    return this.httpAdapter.delete(
      `${this.NOTIFICATIONS_MANAGEMENT_URL}/news/${id}`,
    );
  }

  @Auth()
  @Http.Get('image/:id')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.getNotificationImage)
  public getNotificationImage(@Http.Param('id') id: string): Promise<Blob> {
    return this.httpAdapter.get(
      `${this.NOTIFICATIONS_MANAGEMENT_URL}/news/image/${id}`,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Put('image/:id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @UseInterceptors(FileInterceptor('file'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.updateNotificationImage)
  public updateNotificationImage(
    @Http.Param('id') notificationId: string,
    @Http.UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    const formData = new FormData();
    const blob = new Blob([file.buffer], { type: file.mimetype });
    formData.append('file', blob, file.originalname);

    return this.httpAdapter.put(
      `${this.NOTIFICATIONS_MANAGEMENT_URL}/news/image/${notificationId}`,
      formData,
    );
  }
}
