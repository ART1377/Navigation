"use client";

import { useState } from "react";
import Link from "next/link";
import { NavLink, SocialLink } from "../../../../next-type-d";
import Logo from "../Logo/Logo";
import HomeIcon from "@/app/icons/home-icon";
import SupportIcon from "@/app/icons/support-icon";
import UserIcon from "@/app/icons/user-icon";
import TelegramIcon from "@/app/icons/telegram-icon";
import GithubIcon from "@/app/icons/github-icon";
import EmailIcon from "@/app/icons/email-icon";
import CloseIcon from "@/app/icons/close-icon";
import MenuIcon from "@/app/icons/menu-icon";

const socialLinks: SocialLink[] = [
  { href: "https://github.com/ART1377", icon: <GithubIcon styles="size-6" /> },
  { href: "https://t.me/ART_1377", icon: <TelegramIcon styles="size-6" /> },
  { href: "mailto:alirezatt705@gmail.com", icon: <EmailIcon styles="size-6" /> },
];
const navLinks: NavLink[] = [
  { label: "خانه", href: "/", icon: <HomeIcon styles="size-6 mb-1" /> },
  { label: "پشتیبانی", href: "/", icon: <SupportIcon styles="size-6 mb-1" /> },
  { label: "ادمین", href: "/", icon: <UserIcon styles="size-6 mb-1" /> },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md mb-4 sm:mb-8">
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
        <div className="flex gap-10 flex-col sm:flex-row">
          {/* Logo (Desktop) */}
          <div className="relative w-20 h-20 hidden sm:block">
            <Logo bg={false} />
          </div>
          {/* Navigation Links */}
          <div className="flex items-center gap-x-6 flex-col gap-y-12 sm:flex-row">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-1 text-lg text-primary-dark hover:text-primary-main hover:scale-105 custom-transition"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center gap-3 justify-center">
          {socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              className="size-10 rounded-full border border-primary-dark flex-center text-primary-dark hover:text-white hover:bg-primary-dark custom-transition"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
