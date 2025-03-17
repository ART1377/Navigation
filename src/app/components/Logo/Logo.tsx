import Image from "next/image";
import Link from "next/link";

type Props = {
  bg?: boolean;
  styles?: string;
  onClick?: () => void;
};

const Logo = ({ styles, bg = true, onClick }: Props) => {
  return (
    <Link
      href="/"
      aria-label="homepage"
      onClick={onClick}
      className={`${styles} relative block w-full h-full custom-transition hover:opacity-60`}
    >
      <Image
        src={`/images/${bg ? "Logo.png" : "Logo-without-bg.png"}`}
        alt="logo"
        fill
        priority
        style={{
          objectFit: "cover",
        }}
      />
    </Link>
  );
};

export default Logo;
