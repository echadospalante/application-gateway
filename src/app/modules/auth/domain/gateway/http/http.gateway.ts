import { User } from 'echadospalante-core';

export interface AuthHttpService {
  getUserById(id: string): Promise<User>;
}

export const AuthHttpService = Symbol('AuthHttpService');
