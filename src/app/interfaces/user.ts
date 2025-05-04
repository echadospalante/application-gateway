import { AppRole } from './role';

// export interface User {
//   id: string;
//   picture: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   active: boolean;
//   roles: Role[];
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface User {
  id: string;
  fullname: string | null;
  email: string;
  encrypted_password: string;
  roles: AppRole[];
  country: string | null;
  ccode: string | null;
  bankid: number | null;
  roles_mask: number | null;
  is_comercial_contact: boolean;
  telegram_chat_id: string | null;
  reset_password_token: string | null;
  reset_password_sent_at: Date | null;
  remember_created_at: Date | null;
  sign_in_count: number;
  current_sign_in_at: Date | null;
  last_sign_in_at: Date | null;
  current_sign_in_ip: string | null;
  last_sign_in_ip: string | null;
  created_at: Date;
  updated_at: Date;
}
