export enum RoleEnum {
  reader = 'reader',
  admin = 'admin',
  creator = 'creator',
}

export interface LoginParams {
  email: string;
  password: string;
}
export interface RegisterParams {
  username: string;
  email: string;
  password: string;
  role: RoleEnum;
}

export interface LoginResult {
  token: string;
  username: string;
  role: RoleEnum;
}

export interface LogoutParams {
  token: string;
}

export interface LogoutResult {}
