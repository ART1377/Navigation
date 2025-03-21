"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Button from "../Button/Button";
import { useSessionContext } from "@/app/context/useSessionContext";
import LoginIcon from "@/app/icons/login-icon";
import LogoutIcon from "@/app/icons/logout-icon";
import Spinner from "../Spinner/Spinner";

const UserProfile = () => {
  const { session, status } = useSessionContext();

  return (
    <>
      {status === "loading" ? (
        <Button variant="primary-dark" className="flex-center gap-1 min-w-20">
          <Spinner size={20} color="white" />
        </Button>
      ) : (
        <>
          {session && session.user ? (
            <div onClick={() => signOut()}>
              <Button variant="primary-dark" className="flex-center gap-1">
                <LogoutIcon styles="size-6" />
                خروج
              </Button>{" "}
            </div>
          ) : (
            <Link href={"/auth/login"} className="">
              <Button variant="primary-dark" className="flex-center gap-1">
                <LoginIcon styles="size-6" />
                ورود
              </Button>
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default UserProfile;
