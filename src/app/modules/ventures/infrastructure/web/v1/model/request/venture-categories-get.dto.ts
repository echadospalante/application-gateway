import { Type } from 'class-transformer';
import * as Validate from 'class-validator';

export default class VentureCategoriesGetRequestDto {
  @Validate.IsOptional()
  @Validate.IsString()
  public search?: string;

  @Type(() => Number)
  @Validate.IsInt()
  @Validate.Min(0)
  public page: number;

  @Type(() => Number)
  @Validate.IsInt()
  @Validate.IsPositive()
  public size: number;
}
