import React from "react";
import { Sling as Hamburger } from "hamburger-react";

export default function DashboardHeader({ toggled, toggleMenu }) {
  return (
    <div className="w-full h-fit bg-gray-900 p-4 text-white text-left text-xl flex gap-2 items-center justify-between">
      <span>Menu</span>
      <Hamburger toggled={toggled} onToggle={toggleMenu} />
    </div>
  );
}
