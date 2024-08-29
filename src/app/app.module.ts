import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { environment } from '../env/env';
import { JoiValidationSchema } from '../env/joi.config';
import { HttpService } from './config/http/axios.config';
import { AuthModule } from './modules/auth/auth.module';
import { DonationsModule } from './modules/donations/donations.module';
import { FeedsModule } from './modules/feeds/feeds.module';
import { NewsModule } from './modules/news/news.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { UsersModule } from './modules/users/users.module';
import { VenturesModule } from './modules/ventures/ventures.module';

@Module({
  providers: [HttpService],
  exports: [HttpService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [environment],
      validationSchema: JoiValidationSchema,
    }),
    AuthModule,
    DonationsModule,
    FeedsModule,
    NewsModule,
    NotificationsModule,
    UsersModule,
    VenturesModule,
  ],
})
export class AppModule {}
