import React from "react";
import classNames from "classnames";
import { SideBarMenuItem } from "./sidebar-menu-item";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import { SideNavItem, SideNavItemGroup } from "@/types/types";

interface SideBarMenuGroupProps {
  menuGroup: SideNavItemGroup;
  openGroup: string | null;
  setOpenGroup: (group: string | null) => void;
}

const SideBarMenuGroup = ({ menuGroup }: { menuGroup: SideNavItemGroup }) => {
  const { toggleCollapse } = useSideBarToggle();

  const menuGroupTitleSyle = classNames(
    "py-4 tracking-[.1rem] font-medium uppercase text-sm text-sm text-white",
    {
      "text-center": toggleCollapse,
    }
  );
  return (
    <>
      <h3 className={menuGroupTitleSyle}>
        {!toggleCollapse ? menuGroup.title : "..."}
      </h3>
      {menuGroup.menuList?.map(
        (item: SideNavItem, index: React.Key | null | undefined) => {
          return <SideBarMenuItem key={index} item={item} />;
        }
      )}
    </>
  );
};

export default SideBarMenuGroup;
