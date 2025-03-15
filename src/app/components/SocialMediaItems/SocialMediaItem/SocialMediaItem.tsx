import Link from "next/link";
import React from "react";
import { SocialLink } from "../../../../../next-type";

type Props = {
  socialItem: SocialLink;
};

const SocialMediaItem = ({ socialItem }: Props) => {
  return (
    <Link
      href={socialItem.href}
      target="_blank"
      className="size-10 rounded-full border border-primary-dark flex-center text-primary-dark hover:text-white hover:bg-primary-dark custom-transition"
    >
      {socialItem.icon}
    </Link>
  );
};

export default SocialMediaItem;
