import { SetMetadata } from '@nestjs/common';

import { Role } from 'x-ventures-domain';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: Role[]) => {
  return SetMetadata(META_ROLES, args);
};
