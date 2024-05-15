import { ReactNode } from "react";

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element | ReactNode;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type SideNavItemGroup = {
  title: string;
  menuList: SideNavItem[];
};

// Defining the type for child attendance data specific to RCHS
export type ChildAttendance = {
  id: string;
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  lastVisit: string;
};

// Defining the type for child attendance data specific to RCHS
export type MotherAttendance = {
  id: string;
  name: string;
  age: number;
  child: string;
  lastVisit: string;
};
