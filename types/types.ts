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

export type ParentActivityItem = {
  id: number;
  // description: string;
  // timestamp: string;
  mother_name: string;
  visit_number: string;
  visit_date: string;
  body_temperature: number;
  blood_pressure: number;
  hb_percentage: number;
  pmtct_nutrition: string;
  breastfeeding: string;
  milk_coming_out: string;
  breastfeeding_within_hour: string;
  sore_nipples: string;
  full_nipples: string;
  abscesses: string;
  breastfeeding_advice: string;
  uterus_shrinking: string;
  uterus_pain: string;
  incision_type: string;
  wound_healed: string;
  pus: string;
  wound_open: string;
  bad_smell: string;
  lochia_amount: string;
  lochia_color: string;
  mental_state: string;
  mental_issues: string;
  advice_given: string;
  ferrous_sulphate: boolean;
  folic_acid: boolean;
  tetanus_toxoid_doses: string;
  pmtct_ctx: string;
  postpartum_medications: string;
  vitamin_a: string;
  date_of_next_visit: string;
  provider_name: string;
  provider_title: string;
};

// types.ts
export interface ChildData {
  url: string;
  id: number;
  child_name: string;
  healthcare_centre_name: string;
  mother_name: string;
  mother: string;
  child_number: number;
  child_gender: string;
  date_of_birth: string;
  weight_at_birth: number;
  length_at_birth: number;
  birth_region: string;
  birth_district: string;
  residential_region: string;
  residential_district: string;
  maternal_health_worker: string;
}

export interface MotherData {
  url: string;
  id: number;
  healthcare_centre_name: string;
  mother_name: string;
  registration_number: number;
  mosquito_net_voucher_number: number;
  mother_age: number;
  mother_education: string;
  mother_employment: string;
  height: number;
  partner_name: string;
  partner_age: number;
  partner_work: string;
  partner_education: string;
  residential_region: string;
  residential_district: string;
  chairperson_name: string;
  pregnancies: number;
  alive_children: number;
  miscarriages: number;
  births: number;
  registrant_type: string;
  parent_type: string;
  gender: string;
  phone: string;
}