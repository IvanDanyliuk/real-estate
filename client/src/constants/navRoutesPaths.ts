import { ComponentType, lazy } from 'react';
import MainLayout from '../layouts/MainLayout/MainLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';

const Home = lazy(() => import('../pages/Home/Home'));
const About = lazy(() => import('../pages/About/About'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const Properties = lazy(() => import('../features/properties/pages/Properties/Properties'));
const Property = lazy(() => import('../features/properties/pages/Property/Property'));
const Blog = lazy(() => import('../features/blog/pages/Blog/Blog'));
const Article = lazy(() => import('../features/blog/pages/Article/Article'));

const Login = lazy(() => import('../features/auth/pages/Login/Login'));
const Register = lazy(() => import('../features/auth/pages/Register/Register'));

export interface NavRoute {
  element: ComponentType;
  path?: string;
  isIndex?: boolean;
  children?: NavRoute[];
};

export const NAV_ROUTES: NavRoute[] = [
  {
    element: MainLayout,
    children: [
      {
        path: "/",
        element: Home,
        isIndex: true,
      },
      {
        path: '/about',
        element: About,
      },
      {
        path: '/contact',
        element: Contact,
      },
      {
        path: '/property',
        element: Properties,
      },
      {
        path: '/property/:id',
        element: Property,
      },
      {
        path: '/blog',
        element: Blog,
      },
      {
        path: '/blog/:id',
        element: Article,
      },
    ],
  },
  {
    element: AuthLayout,
    children: [
      {
        path: '/login',
        element: Login,
      },
      {
        path: '/register',
        element: Register,
      },
    ],
  },
];