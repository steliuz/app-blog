import type { MenuChild } from '@/interface/layout/menu.interface';

export type Locale = 'zh_CN' | 'en_US' | 'es_ES';

export interface UserType {
  email: string;
  id: string;
  isEmailVerified: boolean;
  name: string;
  role: string;
}

export interface UserState {
  username: UserType;
  menuList: MenuChild[];
  logged: boolean;
  collapsed: boolean;
  newUser: boolean;
}
