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
  attendance: ReactNode;
  id: string;
  child_name: string;
  age: number;
  child_gender: string;
  weight_grams: number;
  height: number;
  date: string;
};

// Defining the type for child attendance data specific to RCHS
export type MotherAttendance = {
  id: string;
  mother_name: string;
  age: number;
  partner_name: string;
  lastVisit: string;
};
