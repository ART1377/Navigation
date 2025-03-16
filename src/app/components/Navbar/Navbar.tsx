"use client";

import { useState } from "react";
import Logo from "../Logo/Logo";
import CloseIcon from "@/app/icons/close-icon";
import MenuIcon from "@/app/icons/menu-icon";
import NavbarItems from "./NavbarItems/NavbarItems";
import SocialMediaItems from "../SocialMediaItems/SocialMediaItems";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md mb-4 md:mb-8">
      {/* Mobile Menu Button */}
      <div className="custom-container p-3 flex justify-between items-center md:hidden">
        {/* Logo */}
        <div className="relative w-20 h-16">
          <Logo bg={false} />
        </div>
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="size-10 border border-primary-dark text-primary-dark rounded-full flex-center hover:bg-primary-dark hover:text-white custom-transition cursor-pointer"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <CloseIcon styles="size-6" />
          ) : (
            <MenuIcon styles="size-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`custom-container fixed inset-0 bg-white w-full h-full z-10 flex flex-col justify-between md:h-auto md:relative md:flex-row md:flex md:justify-between md:items-center transform custom-transition ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        } md:translate-y-0`}
      >
        {/* Mobile Menu Header */}
        <div className="w-full p-3 flex justify-between items-center md:hidden">
          {/* Logo */}
          <div className="relative w-20 h-16">
            <Logo bg={false} />
          </div>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="size-10 border border-primary-dark text-primary-dark rounded-full flex-center hover:bg-primary-dark hover:text-white custom-transition cursor-pointer"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Close menu"
          >
            <CloseIcon styles="size-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-10 flex-col md:flex-row">
          {/* Logo (Desktop) */}
          <div className="relative w-20 h-20 hidden md:block">
            <Logo bg={false} />
          </div>
          {/* Navigation Links */}
          <NavbarItems />
        </nav>

        {/* Social Media Icons */}
        <SocialMediaItems />
        {/* login / signup */}
        {/* <UserProfile/> */}
      </div>
    </header>
  );
};

export default Navbar;
