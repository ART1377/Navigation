import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import MainProvider from "./components/Providers/MainProvider";

// Font files can be colocated inside of `app`
const dana = localFont({
  src: "../../public/font/DanaFaNum-Medium.woff",
  display: "swap",
});

export const metadata: Metadata = {
  title: "داده پردازی نوین",
  description: "پروژه آزمایشی داده پرداز نوین",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainProvider>
      <html dir="rtl" lang="fa-IR">
        <body className={`${dana.className} antialiased`}>
          <Navbar />
          <main className="custom-container">{children}</main>
        </body>
      </html>
    </MainProvider>
  );
}
