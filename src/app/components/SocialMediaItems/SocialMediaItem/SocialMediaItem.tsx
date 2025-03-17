import Link from "next/link";
import React from "react";
import { SocialLink } from "../../../../../next-type";

type Props = {
  socialItem: SocialLink;
  onClick?: () => void;
};

const SocialMediaItem = ({ socialItem,onClick }: Props) => {
  return (
    <Link
      href={socialItem.href}
      target="_blank"
      onClick={onClick}
      className="size-10 rounded-full border border-primary-dark flex-center text-primary-dark hover:text-white hover:bg-primary-dark custom-transition"
    >
      {socialItem.icon}
    </Link>
  );
};

export default SocialMediaItem;
