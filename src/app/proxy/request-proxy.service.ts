import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';

import * as FormData from 'form-data';
import { Request } from 'express';
import { catchError, map } from 'rxjs';
import { Readable } from 'stream';

import { User } from '../interfaces/user';
import { ResponseType } from './response-type';

@Injectable()
export class ProxyService {
  private readonly logger: Logger = new Logger(ProxyService.name);

  public constructor(private readonly httpService: HttpService) {}

  public forward(
    req: Request,
    targetHost: string,
    authenticatedUser?: User,
    responseType: ResponseType = 'json',
  ) {
    return this.httpService
      .request({
        method: req.method,
        url: `${targetHost}${req.path}`,
        data: req.body,
        headers: {
          // ...req.headers,
          'x-requested-by': authenticatedUser
            ? authenticatedUser.email
            : undefined,
        },
        params: req.query,
        responseType,
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
  }

  public forwardFile(
    req: Request,
    file: Express.Multer.File,
    targetHost: string,
    authenticatedUser?: User,
  ) {
    const formData = new FormData();
    const stream = Readable.from(file.buffer);

    formData.append('file', stream, {
      filename: file.originalname,
      contentType: file.mimetype,
      knownLength: file.size,
    });

    return this.httpService
      .request({
        method: req.method,
        url: `${targetHost}${req.path}`,
        data: formData,
        headers: {
          ...formData.getHeaders(),
          'x-requested-by': authenticatedUser
            ? authenticatedUser.id
            : undefined,
        },
        params: req.query,
      })
      .pipe(
        map((response) => {
          return {
            data: response.data,
            headers: response.headers as Record<string, string>,
          };
        }),
        catchError((error) => {
          console.error('Error en forwardFiles:', error);
          throw new HttpException(
            error.response?.data || 'Error desconocido',
            error.response?.status || 500,
          );
        }),
      );
  }

  public send(method: string, url: string, authenticatedUser?: User) {
    return this.httpService
      .request({
        method,
        url,
        headers: {
          'x-requested-by': authenticatedUser
            ? authenticatedUser.id
            : undefined,
        },
      })
      .pipe(map(({ data, status }) => ({ data, status })));
  }
}
