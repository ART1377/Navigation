import Link from "next/link";
import React from "react";
import Button from "./components/Button/Button";

export default function NotFound() {
  return (
    <div className="bg-white px-3 py-6 rounded-xl shadow-md flex-center flex-col gap-5 my-10">
      <p>صفحه ی موردنطر یافت نشد</p>

      <div className="flex gap-3">
        <Link href={"/"} aria-label="homepage">
          <Button>بازگشت به خانه</Button>
        </Link>
      </div>
    </div>
  );
}
