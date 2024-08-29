import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpService } from '../../config/http/axios.config';
import { AuthModule } from '../auth/auth.module';
import { DonationsController } from './infrastructure/web/v1/controller/donations.controller';

@Module({
  controllers: [DonationsController],
  providers: [HttpService],
  imports: [ConfigModule, AuthModule],
})
export class DonationsModule {}
