import { SessionProvider } from "@/app/context/useSessionContext";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

const MainProvider = ({ children }: Props) => {
  return (
    <>
      <SessionProvider>
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </SessionProvider>
    </>
  );
};

export default MainProvider;
