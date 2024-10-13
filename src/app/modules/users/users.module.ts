import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpService } from '../../config/http/axios.config';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './infrastructure/web/v1/controller/users.controller';
import { UsersContactController } from './infrastructure/web/v1/controller/user-contact.controller';

@Module({
  controllers: [UsersController, UsersContactController],
  providers: [HttpService],
  imports: [ConfigModule, AuthModule],
})
export class UsersModule {}
