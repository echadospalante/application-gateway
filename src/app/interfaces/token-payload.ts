import { AppRole } from './role';

export interface AccessTokenPayload {
  id: number;
  roles: AppRole[];
  // email: string;
  iat: number;
  exp: number;
}

export interface IdTokenPayload {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  nbf: number;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}
