import { ApiProperty } from '@nestjs/swagger';

import * as Validate from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    example: '',
    required: true,
    description: 'Id token signed by Google OAuth2',
  })
  @Validate.IsString()
  @Validate.IsNotEmpty()
  token: string;
}
