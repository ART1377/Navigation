"use client";

import Link from "next/link";
import Button from "./components/Button/Button";

export default function Error({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md py-6 px-3 flex-center flex-col gap-5 my-10">
        <h1 className="text-base text-center text-gray-900">اشتباهی رخ داده است</h1>
      <div className="flex gap-3">
        <Button onClick={() => reset()}>تلاش مجدد</Button>
        <Link href={"/"} aria-label="homepage">
          <Button>بازگشت به خانه</Button>
        </Link>
      </div>
    </div>
  );
}
