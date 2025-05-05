import Dashboard from '@mui/icons-material/Dashboard';
import Properties from '@mui/icons-material/MapsHomeWork';
import Blog from '@mui/icons-material/Feed';
import Users from '@mui/icons-material/People';

export const NAV_LINKS = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/property',
    label: 'Property',
  },
  {
    href: '/about',
    label: 'About us',
  },
  {
    href: '/blog',
    label: 'Blog',
  },
  {
    href: '/contact',
    label: 'Contact',
  },
];

export const ADMIN_DASHBOARD_NAV_LINKS = [
  {
    href: '/admin',
    label: 'admin_dashboard.layout.navMenu.analytics',
    icon: Dashboard,
  },
  {
    href: '/admin/properties',
    label: 'admin_dashboard.layout.navMenu.properties',
    icon: Properties,
  },
  {
    href: '/admin/blog',
    label: 'admin_dashboard.layout.navMenu.blog',
    icon: Blog,
  },
  {
    href: '/admin/users',
    label: 'admin_dashboard.layout.navMenu.users',
    icon: Users,
  },
];