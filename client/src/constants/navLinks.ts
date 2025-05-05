import Dashboard from '@mui/icons-material/Dashboard';
import Properties from '@mui/icons-material/MapsHomeWork';
import Blog from '@mui/icons-material/Feed';
import Users from '@mui/icons-material/People';

export const NAV_LINKS = [
  {
    href: '/',
    label: 'main_layout.navMenuLinks.home',
  },
  {
    href: '/property',
    label: 'main_layout.navMenuLinks.property',
  },
  {
    href: '/about',
    label: 'main_layout.navMenuLinks.about',
  },
  {
    href: '/blog',
    label: 'main_layout.navMenuLinks.blog',
  },
  {
    href: '/contact',
    label: 'main_layout.navMenuLinks.contact',
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