import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppRole } from 'echadospalante-core';

import { UserRoleGuard } from '../guards/user-role.guard';
import { RoleProtected } from './role-protected.decorator';

/**
 * Decorator to protect an endpoint with authentication and role validation
 * @param roles List of roles that can access the endpoint, empty array means that all roles can access the endpoint
 */
export function Auth(...roles: AppRole[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
