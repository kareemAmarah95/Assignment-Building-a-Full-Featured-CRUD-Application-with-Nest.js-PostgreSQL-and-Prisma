export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: number;
  full_name: string;
  username: string;
  email: string;
  hashedPassword: string;
  dob: Date;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}
