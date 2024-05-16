import type {
  LoginParams,
  LoginResult,
  LogoutParams,
  LogoutResult,
  RegisterParams,
  UserWithTokens,
} from '../interface/user/login';

import { request } from './request';

export const apiLogin = (data: LoginParams) => request<LoginResult>('post', '/auth/login', data);

export const apiRegister = (data: RegisterParams) => request<UserWithTokens>('post', '/auth/register', data);

export const apiLogout = (data: LogoutParams) => request<LogoutResult>('post', '/auth/logout', data);
