import { SetMetadata } from '@nestjs/common';

import { AppRole } from 'echadospalante-domain';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: AppRole[]) => {
  return SetMetadata(META_ROLES, args);
};
