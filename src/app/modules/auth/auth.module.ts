import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthController } from './infrastructure/web/v1/controller/auth.controller';
import { HttpService } from '../../config/http/axios.config';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  imports: [ConfigModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [HttpService],
})
export class AuthModule {}
