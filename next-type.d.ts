// next-auth.d.ts
import "next-auth";


declare module "next-auth" {
  interface User {
    id: string;
    name: string; // تغییر به string (بدون null)
    email: string; // تغییر به string (بدون null)
    role: string;
    image?: string | null; // این می‌تواند null باشد
    password?: string | null; // این می‌تواند null باشد
  }

  interface Session {
    user: {
      id: string;
      name: string; // تغییر به string (بدون null)
      email: string; // تغییر به string (بدون null)
      role: string;
      image?: string | null; // این می‌تواند null باشد
    };
  }

  interface JWT {
    id: string;
    name: string; // تغییر به string (بدون null)
    email: string; // تغییر به string (بدون null)
    role: string;
    image?: string | null; // این می‌تواند null باشد
  }
}

export type NavLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export type SocialLink = {
  href: string;
  icon: React.ReactNode;
};
