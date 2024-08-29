import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpService } from '../../config/http/axios.config';
import { AuthModule } from '../auth/auth.module';
import { NotificationsController } from './infrastructure/web/v1/controller/notifications.controller';

@Module({
  controllers: [NotificationsController],
  providers: [HttpService],
  imports: [ConfigModule, AuthModule],
})
export class NotificationsModule {}
