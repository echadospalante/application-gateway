import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpService } from '../../config/http/axios.config';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './infrastructure/web/v1/controller/users.controller';

@Module({
  controllers: [UsersController],
  providers: [HttpService],
  imports: [ConfigModule, AuthModule],
})
export class UsersModule {}
