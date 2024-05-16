import type { FC } from 'react';
import type { RouteObject } from 'react-router';

import { lazy } from 'react';
import { Navigate } from 'react-router';
import { useRoutes } from 'react-router-dom';

import Dashboard from '@/pages/dashboard';
import LayoutPage from '@/pages/layout';
import LoginPage from '@/pages/login';

import WrapperRouteComponent from './config';

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/404'));
const Category = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/category'));
const Details = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/details'));
const Thematic = lazy(() => import(/* webpackChunkName: "guide'"*/ '@/pages/thematic'));
const Content = lazy(() => import(/* webpackChunkName: "guide'"*/ '@/pages/content'));

const routeList: RouteObject[] = [
  {
    path: '/login',
    element: <WrapperRouteComponent element={<LoginPage />} titleId="title.login" />,
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" />,
      },
      {
        path: 'dashboard',
        element: <WrapperRouteComponent element={<Dashboard />} titleId="dashboard" />,
      },
      {
        path: 'category',
        element: <WrapperRouteComponent element={<Category />} titleId="category" />,
      },
      {
        path: 'details',
        element: <WrapperRouteComponent element={<Details />} titleId="details" />,
      },
      {
        path: 'thematic',
        element: <WrapperRouteComponent element={<Thematic />} titleId="thematic" />,
      },
      {
        path: 'content',
        element: <WrapperRouteComponent element={<Content />} titleId="content" />,
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} titleId="notFount" />,
      },
    ],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
