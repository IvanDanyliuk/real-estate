import { 
  AboutPage, 
  BlogPage, 
  ContactPage, 
  HomePage, 
  PropertiesPage, 
  PropertyPage 
} from "../pages";
import { RouteParams, RoutePath } from "./types";

export const routes: RouteParams[] = [
  {
    path: RoutePath.Home,
    component: HomePage,
  },
  {
    path: RoutePath.About,
    component: AboutPage,
  },
  {
    path: RoutePath.Blog,
    component: BlogPage,
  },
  {
    path: RoutePath.Contact,
    component: ContactPage,
  },
  {
    path: RoutePath.Properties,
    component: PropertiesPage,
    children: [
      {
        path: RoutePath.Property,
        component: PropertyPage,
      },
    ],
  },
];