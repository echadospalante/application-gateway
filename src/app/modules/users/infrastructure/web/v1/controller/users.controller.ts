import * as Http from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import * as Swagger from '@nestjs/swagger';

import { AppRole, User } from 'x-ventures-domain';

import { HttpService } from '../../../../../../config/http/axios.config';
import { Auth } from '../../../../../auth/application/decorators';
import UserCreateDto from '../model/request/user-create.dto';
import UserUpdateDto from '../model/request/user-update.dto';
import { profileApiDocs } from '../swagger/users.docs';

const { apiTag, endpoints } = profileApiDocs;
const path = 'users';

@Swagger.ApiTags(apiTag)
@Http.Controller(path)
export class UsersController {
  private readonly USERS_MANAGEMENT_URL: string;

  public constructor(
    private readonly httpAdapter: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.USERS_MANAGEMENT_URL = `${this.configService.getOrThrow<string>(
      'USERS_MANAGEMENT_URL',
    )}/api/v1/users`;
  }

  @Auth(AppRole.ADMIN)
  @Http.Get()
  @Http.HttpCode(Http.HttpStatus.OK)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.getAllUsers)
  public getAllUsers(): Promise<User[]> {
    return this.httpAdapter.get<User[]>(`${this.USERS_MANAGEMENT_URL}`);
  }

  @Auth()
  @Http.Get('basic')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.getAllBasicUsersInfo)
  public getAllBasicUsersInfo(): Promise<User[]> {
    return this.httpAdapter.get<User[]>(`${this.USERS_MANAGEMENT_URL}/basic`);
  }

  @Auth(AppRole.ADMIN)
  @Http.Post()
  @Http.HttpCode(Http.HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.createUser)
  @Swagger.ApiConsumes('multipart/form-data')
  public async createUser(
    @Http.UploadedFile() image: Express.Multer.File,
    @Http.Body() ventureCreateDto: UserCreateDto,
  ): Promise<void> {
    const data = {
      ...ventureCreateDto,
      image: image.buffer.toString('base64'),
      mimeType: image.mimetype,
    };
    console.log({ data });
    return this.httpAdapter.post(`${this.USERS_MANAGEMENT_URL}`, data);
  }

  @Auth(AppRole.ADMIN)
  @Http.Put(':id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @UseInterceptors(FileInterceptor('image'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.updateUser)
  @Swagger.ApiConsumes('multipart/form-data')
  public updateUser(
    @Http.Param('id') ventureId: string,
    @Http.UploadedFile() image: Express.Multer.File,
    @Http.Body() ventureUpdateDto: UserUpdateDto,
  ): Promise<User | null> {
    const data = {
      ...ventureUpdateDto,
      image: image.buffer.toString('base64'),
      mimeType: image.mimetype,
    };
    return this.httpAdapter.put(
      `${this.USERS_MANAGEMENT_URL}/${ventureId}`,
      data,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Patch('enable/:id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.enableUser)
  public enableUser(@Http.Param('id') id: string): Promise<void> {
    return this.httpAdapter.put(
      `${this.USERS_MANAGEMENT_URL}/enable/${id}`,
      {},
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Patch('disable/:id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.disableUser)
  public disableUser(@Http.Param('id') id: string): Promise<void> {
    return this.httpAdapter.put(
      `${this.USERS_MANAGEMENT_URL}/disable/${id}`,
      undefined,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Delete(':id')
  @Http.HttpCode(Http.HttpStatus.NO_CONTENT)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.deleteUser)
  public deleteUser(@Http.Param('id') id: string): Promise<void> {
    return this.httpAdapter.delete(`${this.USERS_MANAGEMENT_URL}/${id}`);
  }

  @Auth(AppRole.ADMIN)
  @Http.Put('image/:id')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @UseInterceptors(FileInterceptor('file'))
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.updateUserImage)
  public updateUserImage(
    @Http.Param('id') ventureId: string,
    @Http.UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    const formData = new FormData();
    const blob = new Blob([file.buffer], { type: file.mimetype });
    formData.append('file', blob, file.originalname);

    return this.httpAdapter.put(
      `${this.USERS_MANAGEMENT_URL}/image/${ventureId}`,
      formData,
    );
  }
}
