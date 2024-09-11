import { User } from 'x-ventures-domain';

export interface AuthHttpService {
  getUserById(id: string): Promise<User>;
}

export const AuthHttpService = Symbol('AuthHttpService');
