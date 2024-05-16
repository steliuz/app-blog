export enum RoleEnum {
  reader = 'reader',
  admin = 'admin',
  creator = 'creador',
}

export interface LoginParams {
  email: string;
  password: string;
}
export interface RegisterParams {
  name: string;
  email: string;
  password: string;
  role: RoleEnum;
}

export interface TokenInfo {
  token: string;
  expires: string;
}

export interface Tokens {
  access: TokenInfo;
  refresh: TokenInfo;
}

export interface User {
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  id: string;
}

export interface UserWithTokens {
  user: User;
  tokens: Tokens;
}
export interface LoginResult {
  token: string;
  username: string;
  role: RoleEnum;
}

export interface LogoutParams {
  refreshToken: string;
}

export interface LogoutResult {}
