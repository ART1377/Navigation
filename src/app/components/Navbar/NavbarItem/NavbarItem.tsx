import React from "react";
import { NavLink } from "../../../../../next-type-d";
import Link from "next/link";

type Props = {
  navbarItem: NavLink;
};

const NavbarItem = ({ navbarItem }: Props) => {
  return (
    <Link
      href={navbarItem.href}
      className="flex items-center gap-1 text-lg text-primary-dark hover:text-primary-main hover:scale-105 custom-transition"
    >
      {navbarItem.icon}
      {navbarItem.label}
    </Link>
  );
};

export default NavbarItem;
