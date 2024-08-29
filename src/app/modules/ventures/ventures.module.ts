import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpService } from '../../config/http/axios.config';
import { AuthModule } from '../auth/auth.module';
import { VenturesController } from './infrastructure/web/v1/controller/ventures.controller';

@Module({
  controllers: [VenturesController],
  providers: [HttpService],
  imports: [ConfigModule, AuthModule],
})
export class VenturesModule {}
