"use client";
import dynamic from "next/dynamic";

// Dynamically import the Map component with SSR disabled
const Map = dynamic(() => import("../Map/Map"), {
  ssr: false,
});

const Homepage = () => {
  return <Map />;
};

export default Homepage;
