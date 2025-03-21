import React from "react";
import { NavLink } from "../../../../../next-type";
import HomeIcon from "@/app/icons/home-icon";
import SupportIcon from "@/app/icons/support-icon";
import UserIcon from "@/app/icons/user-icon";
import NavbarItem from "../NavbarItem/NavbarItem";
import UserProfile from "../../UserProfile/UserProfile";

const navLinks: NavLink[] = [
  { label: "خانه", href: "/", icon: <HomeIcon styles="size-6 mb-1" /> },
  {
    label: "پشتیبانی",
    href: "/support",
    icon: <SupportIcon styles="size-6 mb-1" />,
  },
  {
    label: "ادمین",
    href: "/admin/tickets",
    icon: <UserIcon styles="size-6 mb-1" />,
  },
];

const NavbarItems = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex items-center gap-x-6 flex-col gap-y-12 md:flex-row">
      {navLinks.map((item: NavLink) => (
        <NavbarItem key={item.label} navbarItem={item} onClick={onClick} />
      ))}
      <UserProfile />
    </div>
  );
};

export default NavbarItems;
