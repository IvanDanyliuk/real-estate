import { lazy, ReactNode } from "react";

interface NavRoute {
  path: string;
  element: React.FC;
  layout?: React.FC;
  isIndex?: boolean;
  children?: {
    path: string;
    element: ReactNode;
  };
};

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));

export const NAV_ROUTES: NavRoute[] = [
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
];