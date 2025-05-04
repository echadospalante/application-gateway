import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HeadersLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HeadersLoggerMiddleware');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `Request: ${req.method} ${req.url} \n${JSON.stringify(req.headers, null, 2)}`,
    );
    let cookie = req.cookies['authentication'];
    if (cookie) {
      if (cookie.includes(',')) {
        cookie = cookie.split(',')[0].trim();
        req.cookies['authentication'] = cookie;
      }
    }
    next();
  }
}
