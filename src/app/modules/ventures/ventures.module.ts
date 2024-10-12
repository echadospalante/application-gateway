import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpService } from '../../config/http/axios.config';
import { AuthModule } from '../auth/auth.module';
import { VenturesController } from './infrastructure/web/v1/controller/ventures.controller';
import { VentureCategoriesController } from './infrastructure/web/v1/controller/venture-categories.controller';

@Module({
  controllers: [VenturesController, VentureCategoriesController],
  providers: [HttpService],
  imports: [ConfigModule, AuthModule],
})
export class VenturesModule {}
