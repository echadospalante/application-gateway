import { SetMetadata } from '@nestjs/common';

import { AppRole } from 'echadospalante-core';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: AppRole[]) => {
  return SetMetadata(META_ROLES, args);
};
