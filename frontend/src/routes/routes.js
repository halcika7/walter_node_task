import { lazy } from 'react';

export const unAuthorizedRoutes = [
  {
    exact: true,
    path: '/',
    Component: lazy(() => import('../pages/Home')),
  },
  {
    exact: true,
    path: '/login',
    Component: lazy(() => import('../pages/auth/Login')),
  },
  {
    exact: true,
    path: '/register',
    Component: lazy(() => import('../pages/auth/Registration')),
  },
];

export const authenticatedRoutes = [
  {
    exact: true,
    path: '/lists',
    Component: lazy(() => import('../pages/Lists')),
  },
  {
    exact: true,
    path: '/add-list',
    Component: lazy(() => import('../pages/AddList')),
  },
  {
    exact: true,
    path: '/edit-list/:id',
    Component: lazy(() => import('../pages/AddList')),
  },
  {
    exact: true,
    path: '/report',
    Component: lazy(() => import('../pages/Report')),
  },
  {
    exact: true,
    path: '/profile',
    Component: lazy(() => import('../pages/Profile')),
  },
];
