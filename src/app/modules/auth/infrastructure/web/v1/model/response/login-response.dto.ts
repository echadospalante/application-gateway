import { AppRole } from 'echadospalante-core';

export class LoginResponse {
  firstName: string;
  lastName: string;
  picture: string;
  email: string;
  id: string;
  roles: AppRole[];
  active: boolean;
  onboardingCompleted: boolean;
}
