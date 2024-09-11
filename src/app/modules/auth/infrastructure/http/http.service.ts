import { Injectable } from '@nestjs/common';
import { AuthHttpService } from '../../domain/gateway/http/http.gateway';
import { User } from 'x-ventures-domain';
import { HttpService } from 'src/app/config/http/axios.config';
import { ConfigService } from '@nestjs/config';

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
