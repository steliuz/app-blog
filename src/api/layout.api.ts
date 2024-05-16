import type { MenuList } from '../interface/layout/menu.interface';
import type { AxiosRequestConfig } from 'axios';

import { request } from './request';

export const getMenuList = (config: AxiosRequestConfig = {}) => request<MenuList>('get', '/user/menu', {}, config);

export const getMe = (config: AxiosRequestConfig = {}) => request<MenuList>('get', '/auth/me', {}, config);
