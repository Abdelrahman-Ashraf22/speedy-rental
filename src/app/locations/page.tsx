import React from "react";
import Map from "../component/Maps";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Speedy Rentals / Locations",
  description: "Find Speedy Rentals locations on the map.",
};

export default function page() {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "url('/images/map.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Map />
    </div>
  );
}
