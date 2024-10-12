import { Transform } from 'class-transformer';
import * as Validate from 'class-validator';

import {
  ComplexInclude,
  Pagination,
  VentureCategory,
} from 'echadospalante-core';

import { VentureFilters } from '../../../../../domain/core/venture-filters';

export default class VentureCategoriesQueryDto {

  @Transform(({ value }) => value === 'true')
  @Validate.IsBoolean()
  @Validate.IsOptional()
  public includeVentures: boolean;

  @Validate.IsNumber()
  @Validate.IsInt()
  @Transform((param) => parseInt(param.value))
  public page: number;

  @Transform((param) => parseInt(param.value))
  @Validate.IsNumber()
  @Validate.IsInt()
  @Validate.Min(1)
  public size: number;

  @Validate.IsString()
  @Validate.IsOptional()
  public search?: string;

  static parseQuery(query: VentureCategoriesQueryDto) {
    const include: ComplexInclude<VentureCategory> = {
      ventures: query.includeVentures,
      users: false, // SIEMPRE EN FALSE
    };

    const pagination = {
      page: query.page,
      size: query.size,
    };

    const filters: VentureFilters = {
      search: query.search,
    };

    return {
      include,
      pagination,
      filters,
    };
  }
}
