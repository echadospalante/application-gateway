import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from 'echadospalante-core';

import { HttpService } from '../../../../config/http/axios.config';
import { AuthHttpService } from '../../domain/gateway/http/http.gateway';

@Injectable()
export class AuthHttpAdapter implements AuthHttpService {
  private readonly BASE_AUTH_URL: string;
  public constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.BASE_AUTH_URL = this.configService.getOrThrow('USERS_MANAGEMENT_URL');
  }

  public getUserById(id: string): Promise<User> {
    return this.httpService.get<User>(
      `${this.BASE_AUTH_URL}/api/v1/users/${id}`, // Add include params
    );
  }
}
