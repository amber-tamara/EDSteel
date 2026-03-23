"use client";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [categories, setCategories] = useState("");
  categories;
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        "Categories:", data;
        setCategories(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <header className="sticky top-0 z-50 lg:static">
      <DesktopHeader categories={categories} />
      <MobileHeader categories={categories}/>
    </header>
  );
}
