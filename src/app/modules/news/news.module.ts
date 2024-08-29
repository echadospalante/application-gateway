import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpService } from '../../config/http/axios.config';
import { AuthModule } from '../auth/auth.module';
import { NewsController } from './infrastructure/web/v1/controller/news.controller';

@Module({
  controllers: [NewsController],
  providers: [HttpService],
  imports: [ConfigModule, AuthModule],
})
export class NewsModule {}
