import { FC } from "react";

export enum RoutePath {
  About = "/about",
  Blog = "/blog",
  Contact = "/contact",
  Home = "/",
  Properties = "/properties",
  Property = ":id"
};

export interface RouteParams {
  path: RoutePath;
  component: FC;
  children?: {
    path: RoutePath,
    component: FC,
  }[];
};