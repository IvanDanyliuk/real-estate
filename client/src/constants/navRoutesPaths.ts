import { ComponentType, lazy } from 'react';
import MainLayout from '../layouts/MainLayout/MainLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import AdminDashboardLayout from '../layouts/AdminDashboardLayout/AdminDashboardLayout';
import { ProfileLayout } from '../layouts/ProfileLayout/ProfileLayout';


const Home = lazy(() => import('../pages/Home/Home'));
const About = lazy(() => import('../pages/About/About'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const Properties = lazy(() => import('../features/properties/pages/Properties/Properties'));
const Property = lazy(() => import('../features/properties/pages/Property/Property'));
const Blog = lazy(() => import('../features/blog/pages/Blog/Blog'));
const Article = lazy(() => import('../features/blog/pages/Article/Article'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

const Login = lazy(() => import('../features/auth/pages/Login/Login'));
const Register = lazy(() => import('../features/auth/pages/Register/Register'));

const AdminDashboard = lazy(() => import('../features/admin/pages/Dashboard/Dashboard'));
const AdminProperties = lazy(() => import('../features/admin/pages/Properties/Properties'));
const AdminBlog = lazy(() => import('../features/admin/pages/Blog/Blog'));
const AdminUsers = lazy(() => import('../features/admin/pages/Users/Users'));

const Profile = lazy(() => import('../features/users/pages/Profile/Profile'));
const MyProperties = lazy(() => import('../features/users/pages/MyProperties/MyProperties'));
const LikedProperties = lazy(() => import('../features/users/pages/LikedProperties/LikedProperties'));


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
      {
        path: '*',
        element: NotFound,
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
  {
    element: AdminDashboardLayout,
    children: [
      {
        path: '/admin',
        element: AdminDashboard
      },
      {
        path: '/admin/properties',
        element: AdminProperties,
      },
      {
        path: '/admin/blog',
        element: AdminBlog,
      },
      {
        path: '/admin/users',
        element: AdminUsers,
      },
    ],
  },
  {
    element: ProfileLayout,
    children: [
      {
        path: '/profile/:id',
        element: Profile,
      },
      {
        path: '/profile/:id/my-properties',
        element: MyProperties,
      },
      {
        path: '/profile/:id/liked-properties',
        element: LikedProperties,
      },
    ],
  },
];