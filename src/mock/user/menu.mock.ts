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
    path: '/documentation',
  },
  {
    code: 'Thematic',
    icon: 'guide',
    path: '/guide',
  },
  {
    code: 'permission',
    icon: 'permission',
    path: '/permission',
    children: [
      {
        code: 'routePermission',
        path: '/permission/route',
      },
      {
        code: 'notFound',
        path: '/permission/404',
      },
    ],
  },
  {
    code: 'component',
    icon: 'permission',
    path: '/component',
    children: [
      {
        code: 'componentForm',
        path: '/component/form',
      },
      {
        code: 'componentTable',
        path: '/component/table',
      },
      {
        code: 'componentSearch',
        path: '/component/search',
      },
      {
        code: 'componentAside',
        path: '/component/aside',
      },
      {
        code: 'componentTabs',
        path: '/component/tabs',
      },
      {
        code: 'componentRadioCards',
        path: '/component/radio-cards',
      },
    ],
  },

  {
    code: 'business',
    icon: 'permission',
    path: '/business',
    children: [
      {
        code: 'basic',
        path: '/business/basic',
      },
      {
        code: 'withSearch',
        path: '/business/with-search',
      },
      {
        code: 'withAside',
        path: '/business/with-aside',
      },
      {
        code: 'withRadioCard',
        path: '/business/with-radio-cards',
      },
      {
        code: 'withTabs',
        path: '/business/with-tabs',
      },
    ],
  },
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
