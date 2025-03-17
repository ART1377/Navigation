import React from "react";
import { NavLink } from "../../../../../next-type";
import Link from "next/link";

type Props = {
  navbarItem: NavLink;
  onClick: () => void;
};

const NavbarItem = ({ navbarItem, onClick }: Props) => {
  return (
    <Link
      href={navbarItem.href}
      onClick={onClick} // Close the mobile menu when clicked
      className="flex items-center gap-1 text-lg text-primary-dark hover:text-primary-main hover:scale-105 custom-transition"
    >
      {navbarItem.icon}
      {navbarItem.label}
    </Link>
  );
};

export default NavbarItem;
