import type { MenuList } from '@/interface/layout/menu.interface';

import { intercepter, mock } from '../config';

const mockMenuList: MenuList = [
  {
    code: 'Home',
    icon: 'dashboard',
    path: '/dashboard',
  },
  {
    code: 'Category',
    icon: 'documentation',
    path: '/category',
  },
  {
    code: 'Thematic',
    icon: 'guide',
    path: '/thematic',
  },
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
