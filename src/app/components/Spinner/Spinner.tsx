import React from "react";
import { ClipLoader } from "react-spinners";

type Props = {
  size?: number;
  fullPage?: boolean;
  color?: "primary-dark" | "primary-light" | "white";
};

const Spinner = ({
  fullPage = false,
  size = 50,
  color = "primary-dark",
}: Props) => {
  const colorHex =
    color === "primary-dark"
      ? "#6c9b8b"
      : color === "white"
      ? "#fff"
      : color === "primary-light"
      ? "#e7eeec"
      : "#6c9b8b";

  return (
    <>
      {fullPage ? (
        <div className="flex-center fixed top-0 bottom-0 left-0 right-0 w-screen h-screen z-50 bg-white bg-opacity-90 backdrop-blur-md">
          <ClipLoader color={colorHex} size={size} />
        </div>
      ) : (
        <div className="m-auto flex-center w-full h-full">
          <ClipLoader color={colorHex} size={size} />
        </div>
      )}
    </>
  );
};

export default Spinner;
