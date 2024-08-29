import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpService } from '../../config/http/axios.config';
import { AuthModule } from '../auth/auth.module';
import { FeedsController } from './infrastructure/web/v1/controller/feeds.controller';

@Module({
  controllers: [FeedsController],
  providers: [HttpService],
  imports: [ConfigModule, AuthModule],
})
export class FeedsModule {}
