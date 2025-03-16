import { SessionProvider } from "@/app/context/useSessionContext";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const MainProvider = ({ children }: Props) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
};

export default MainProvider;
