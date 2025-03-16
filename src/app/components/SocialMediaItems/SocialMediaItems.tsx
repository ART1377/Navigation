import TelegramIcon from "@/app/icons/telegram-icon";
import GithubIcon from "@/app/icons/github-icon";
import EmailIcon from "@/app/icons/email-icon";
import { SocialLink } from "../../../../next-type";
import SocialMediaItem from "./SocialMediaItem/SocialMediaItem";

const socialLinks: SocialLink[] = [
  { href: "https://github.com/ART1377", icon: <GithubIcon styles="size-6" /> },
  { href: "https://t.me/ART_1377", icon: <TelegramIcon styles="size-6" /> },
  {
    href: "mailto:alirezatt705@gmail.com",
    icon: <EmailIcon styles="size-6" />,
  },
];

const SocialMediaItems = () => {
  return (
    <div className="flex items-center gap-3 justify-center mb-5 md:mb-0">
      {socialLinks.map((item) => (
        <SocialMediaItem key={item.href} socialItem={item} />
      ))}
    </div>
  );
};

export default SocialMediaItems;
