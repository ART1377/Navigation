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
    <header className="bg-white shadow-md mb-4 sm:mb-8">
      {/* Mobile Menu Button */}
      <div className="custom-container p-3 flex justify-between items-center sm:hidden">
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
        className={`custom-container fixed inset-0 bg-white w-full h-full z-10 flex flex-col justify-between sm:h-auto sm:relative sm:flex-row sm:flex sm:justify-between sm:items-center transform custom-transition ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        } sm:translate-y-0`}
      >
        {/* Mobile Menu Header */}
        <div className="w-full p-3 flex justify-between items-center sm:hidden">
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
        <nav className="flex gap-10 flex-col sm:flex-row">
          {/* Logo (Desktop) */}
          <div className="relative w-20 h-20 hidden sm:block">
            <Logo bg={false} />
          </div>
          {/* Navigation Links */}
          <NavbarItems />
        </nav>

        {/* Social Media Icons */}
        <SocialMediaItems />
      </div>
    </header>
  );
};

export default Navbar;
