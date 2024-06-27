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
  visit_number: number;
};

// Defining the type for child attendance data specific to RCHS
export type MotherAttendance = {
  id: string;
  mother_name: string;
  mother_age: number;
  partner_name: string;
  visit_date: string;
  visit_number: number;
};

// src/types/activityTypes.ts
// export type ActivityItem = {
//   id: number;
//   description: string;
//   timestamp: string;
// };

export type CardItem = {
  id: number;
  weight_grams: number;
  height: number;
};

export interface ActivityItem {
  id: number;
  description: string;
  timestamp: string;
  child_name: string;
  visit_number: string;
  visit_phase: string;
  date: string;
  return_date: string;
  vitamin_a: string;
  deworming_medication: string;
  weight_grams: number;
  height: number;
  anemia: string;
  body_temperature: number;
  infant_nutrition: string;
  unable_to_breastfeed: string;
  child_play: string;
  eyes: string;
  mouth: string;
  ears: string;
  navel_healed: string;
  navel_red: string;
  navel_discharge_odor: string;
  has_pus_filled_bumps: string;
  has_turned_yellow: string;
  received_bcg: string;
  received_polio_0: string;
  received_polio_1: string;
  received_dtp_hep_hib: string;
  received_pneumococcal: string;
  received_rota: string;
  name_of_attendant: string;
  attendant_title: string;
  hb_percentage: number;
  bmi: number;
}
