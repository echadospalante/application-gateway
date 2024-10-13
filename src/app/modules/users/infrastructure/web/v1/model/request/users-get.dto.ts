import { Type } from 'class-transformer';
import * as Validate from 'class-validator';
import { AppRole } from 'echadospalante-core';

export default class UsersGetRequestDto {
  @Validate.IsString()
  @Validate.IsIn(['M', 'F', 'O'])
  @Validate.IsOptional()
  public gender: 'M' | 'F' | 'O';

  @Validate.IsOptional()
  public search: string;

  @Validate.IsOptional()
  @Validate.IsEnum(AppRole)
  public role: AppRole;

  @Type(() => Number)
  @Validate.IsInt()
  @Validate.Min(0)
  public page: number;

  @Type(() => Number)
  @Validate.IsInt()
  @Validate.IsPositive()
  public size: number;
}
