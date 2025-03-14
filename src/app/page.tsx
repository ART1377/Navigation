"use client";

import { useState } from "react";
import Map from "./components/Map/Map";
import Form from "./components/Form/Form";

export default function Home() {
  const [route, setRoute] = useState(null);

  const handleSearch = ({ origin, destination }) => {
    console.log("مبدا:", origin, "مقصد:", destination);
    setRoute({ origin, destination });
  };

  return (
    <div>
      {/* <Form onSearch={handleSearch} /> */}
      <Map route={route} />
    </div>
  );
}
