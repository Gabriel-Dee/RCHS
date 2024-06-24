import { SideNavItemGroup } from "@/types/types";
import {
  BsCalendarFill,
  BsFileBarGraphFill,
  BsFillPersonLinesFill,
  BsGearFill,
  BsHouseDoorFill,
  BsPersonAdd,
  BsPersonFill,
  BsPieChartFill,
  BsQuestionCircleFill,
  BsShieldFillCheck,
} from "react-icons/bs";

export const SIDENAV_ITEMS: SideNavItemGroup[] = [
  {
    title: "Dashboards",
    menuList: [
      {
        title: "Dashboard",
        path: "/Dashboard",
        icon: <BsHouseDoorFill size={20} />,
      },
    ],
  },
  {
    title: "Manage",
    menuList: [
      {
        title: "Registration",
        path: "/Registration",
        icon: BsPersonAdd({ size: 20 }),
        submenu: true,
        subMenuItems: [
          { title: "Child", path: "/Registration/Child" },
          { title: "Parent", path: "/Registration/Mother" },
        ],
      },
      {
        title: "Records",
        path: "/Records",
        icon: BsFillPersonLinesFill({ size: 20 }),
        submenu: true,
        subMenuItems: [
          { title: "Child", path: "/Records/Child" },
          { title: "Parent", path: "/Records/Mother" },
        ],
      },
      {
        title: "Visits",
        path: "/Visits",
        icon: BsCalendarFill({ size: 20 }),
        submenu: true,
        subMenuItems: [
          { title: "Parent Visits", path: "/Visits/ParentVisits" },
          { title: "Child Visits", path: "/Visits/ChildVisits" },
          { title: "Consultation Visits", path: "/Visits/ConsultationVisits" },
        ],
      },
      {
        title: "Reports",
        path: "/Reports",
        icon: BsFileBarGraphFill({ size: 20 }),
        submenu: true,
        subMenuItems: [
          { title: "Postnatal Report", path: "/Reports/PostnatalCareReports" },
          { title: "Child Follow-up Report", path: "/Reports/ChildFollowupReports" },
        ],
      },
      {
        title: "Analytics",
        path: "/Analytics",
        icon: BsPieChartFill({ size: 20 }),
      },
    ],
  },
  {
    title: "Others",
    menuList: [
      {
        title: "Settings/Administration",
        path: "/Settings",
        icon: BsGearFill({ size: 20 }),
      },
      {
        title: "User Account",
        path: "/Account",
        icon: BsPersonFill({ size: 20 }),
      },
      {
        title: "Help/Support",
        path: "/Support",
        icon: BsQuestionCircleFill({ size: 20 }),
      },
    ],
  },
];
