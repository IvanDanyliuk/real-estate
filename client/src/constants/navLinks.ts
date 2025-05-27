import Dashboard from '@mui/icons-material/Dashboard';
import { AssignmentInd, FavoriteBorder, Feed, HomeWork, MapsHomeWork, People } from '@mui/icons-material';


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
    icon: MapsHomeWork,
  },
  {
    href: '/admin/blog',
    label: 'admin_dashboard.layout.navMenu.blog',
    icon: Feed,
  },
  {
    href: '/admin/users',
    label: 'admin_dashboard.layout.navMenu.users',
    icon: People,
  },
];

export const PROFILE_NAV_LINKS = [
  {
    value: '/profile/:id',
    label: 'Personal Info',
    icon: AssignmentInd,
  },
  {
    value: '/profile/:id/my-properties',
    label: 'My properties',
    icon: HomeWork,
  },
  {
    value: '/profile/:id/liked-properties',
    label: 'Liked properties',
    icon: FavoriteBorder,
  },
];