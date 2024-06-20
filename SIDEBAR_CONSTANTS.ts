import { SideNavItem } from "./types/types";
import { BsCalendar, BsCalendarFill, BsFileBarGraphFill, BsFillPersonLinesFill, BsGearFill, BsGraphUp, BsHouseDoor, BsHouseDoorFill, BsPersonFill, BsQuestionCircleFill } from "react-icons/bs";

export const SIDENAV_ITEMS:SideNavItem[]=[
    {
        title: "Dashboard",
        path: "/Dashboard",
        icon: BsHouseDoorFill ({size:20})
        // icon: <BsHouseDoor/>
    },
    {
        title: "Records",
        path: "/Records",
        icon:  BsFillPersonLinesFill ({size:20})
    },
    {
        title: "Hospital Visits",
        path: "/Visits",
        icon:  BsCalendarFill ({size:20}),
        submenu: true,
        subMenuItems: [
            {title: "All", path: "/Visits"},
            {title: "New", path: "/Visits/new"},
        ]
    },
    {
        title: "Reports/Analytics",
        path: "/Reports",
        icon:  BsFileBarGraphFill ({size:20})
    },
    {
        title: "Settings/Administration",
        path: "/Settings",
        icon:  BsGearFill ({size:20})
    },
    {
        title: "User Account",
        path: "/Account",
        icon:  BsPersonFill ({size:20})
    },
    {
        title: "Help/Support",
        path: "/Support",
        icon:  BsQuestionCircleFill ({size:20})
    },
]