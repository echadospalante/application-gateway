import { AppRole } from 'x-ventures-domain';

export class LoginResponse {
  firstName: string;
  lastName: string;
  picture: string;
  email: string;
  id: string;
  roles: AppRole[];
  active: boolean;
}
