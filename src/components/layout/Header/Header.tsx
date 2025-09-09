"use client";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

import Link from "next/link";

export default function Header() {
  let hardwareCategories = [
    "Processors",
    "Graphics Cards",
    "Motherboards",
    "Memory",
    "Storage",
    "eltronic machines",
  ];

  return (
    <header>
      <DesktopHeader hardwareCategories={hardwareCategories} />
      <MobileHeader hardwareCategories={hardwareCategories} />
    </header>
  );
}
