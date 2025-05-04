import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { map, Observable } from 'rxjs';

import { META_ROLES } from '../decorators/role-protected.decorator';
import { AppRole } from '../interfaces/role';
import { User } from '../interfaces/user';

@Injectable()
export class UserRoleGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: AppRole[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );
    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const userObservable = req.user as Observable<User>;

    if (!userObservable) throw new BadRequestException('User not found');

    return userObservable.pipe(
      map((user) => {
        for (const role of user.roles) {
          if (validRoles.includes(role)) {
            return true;
          }
        }

        throw new ForbiddenException(
          `User ${user.email} need a active role: [${validRoles}]`,
        );
      }),
    );
  }
}
