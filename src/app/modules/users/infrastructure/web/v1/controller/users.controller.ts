import * as Http from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import * as Swagger from '@nestjs/swagger';

import { AppRole, Role, User } from 'echadospalante-core';

import { HttpService } from '../../../../../../config/http/axios.config';
import { AuthCookieInterceptor } from '../../../../../../modules/auth/application/interceptors/auth-cookie.interceptor';
import UserRolesUpdateDto from '../../../../../../modules/auth/infrastructure/web/v1/model/request/user-roles-update.dto';
import { Auth } from '../../../../../auth/application/decorators';
import UserCreateDto from '../model/request/user-create.dto';
import UserUpdateDto from '../model/request/user-update.dto';
import { userApiDocs } from '../swagger/users.docs';
import UsersGetRequestDto from '../model/request/users-get.dto';

const { apiTag, endpoints } = userApiDocs;
const path = '/users';

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
  public getUsers(@Http.Query() query: UsersGetRequestDto): Promise<User[]> {
    const { page, size, gender, role, search } = query;
    const skip = page * size;
    const params = new URLSearchParams();
    params.set('skip', skip.toString());
    params.set('take', size.toString());
    search && params.set('search', search);
    role && params.set('role', role);
    gender && params.set('gender', gender);

    return this.httpAdapter.get<User[]>(
      `${this.USERS_MANAGEMENT_URL}?includeNotifications=false&includeRoles=true&includeVentures=false&includePreferences=false&includeComments=false&includeDetail=true`,
      undefined,
      params,
    );
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
  @Http.Patch('/unlock/:email')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.enableUser)
  public enableUser(@Http.Param('email') email: string): Promise<void> {
    return this.httpAdapter.put(
      `${this.USERS_MANAGEMENT_URL}/enable/${email}`,
      undefined,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Patch('/lock/:email')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.disableUser)
  public disableUser(@Http.Param('email') email: string): Promise<void> {
    return this.httpAdapter.put(
      `${this.USERS_MANAGEMENT_URL}/disable/${email}`,
      undefined,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Patch('/verify/:email')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.enableUser)
  public verifyUserAccount(@Http.Param('email') email: string): Promise<void> {
    console.log({ VERIFY: email });
    return this.httpAdapter.put(
      `${this.USERS_MANAGEMENT_URL}/verify/${email}`,
      undefined,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Patch('/unverify/:email')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.disableUser)
  public unverifyUserAccount(
    @Http.Param('email') email: string,
  ): Promise<void> {
    console.log({ UNVERIFY: email });

    return this.httpAdapter.put(
      `${this.USERS_MANAGEMENT_URL}/unverify/${email}`,
      undefined,
    );
  }

  @Auth(AppRole.ADMIN)
  @Http.Delete(':email')
  @Http.HttpCode(Http.HttpStatus.NO_CONTENT)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.deleteUser)
  public deleteUser(@Http.Param('email') email: string): Promise<void> {
    return this.httpAdapter.delete(`${this.USERS_MANAGEMENT_URL}/${email}`);
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

  @Auth(AppRole.ADMIN)
  @Http.Get('/roles')
  @Http.HttpCode(Http.HttpStatus.OK)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.fetchUserRoles)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public fetchUserRoles() {
    return this.httpAdapter.get<Role[]>(`${this.USERS_MANAGEMENT_URL}/roles`);
  }

  @Auth(AppRole.ADMIN)
  @Http.Patch('/roles')
  @Http.HttpCode(Http.HttpStatus.ACCEPTED)
  @Swagger.ApiBearerAuth()
  @Swagger.ApiOperation(endpoints.changeUserRoles)
  @Http.UseInterceptors(AuthCookieInterceptor)
  public changeUserRoles(@Http.Body() userRolesUpdateDto: UserRolesUpdateDto) {
    console.log({ userRolesUpdateDto });
    return this.httpAdapter.put<UserRolesUpdateDto, void>(
      `${this.USERS_MANAGEMENT_URL}/roles`,
      { ...userRolesUpdateDto },
    );
  }
}
