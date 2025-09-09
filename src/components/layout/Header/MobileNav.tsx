"use client";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";

export default function MobileNav({ hardwareCategories }: MobileNavProps) {
  const [Open, setOpen] = useState(false);
  const handleToggle = () => setOpen(!Open);
  console.log(Open);
  return (
    <div className="flex">
      <button
        onClick={handleToggle}
        className="flex flex-col items-center justify-center ml-1.5"
      >
        <FaBars size={20} />
        <h3 className="text-sm sm:text-base mt-0.5">Menu</h3>
      </button>

      {Open && (
        <div className="absolute top-0 left-0 w-full sm:w-2/5 h-screen bg-secondary-custom-teal shadow-md">
          <Image
            src="/lol.svg"
            alt="Company Logo"
            width={60}
            height={10}
            className="sm:hidden absolute top-4 left-4"
          />
          <button onClick={handleToggle} className="absolute top-4 right-4">
            <FaTimes size={24} />
          </button>

          <ul className="mt-24 flex flex-col divide-y divide-[#82a7a1]">
            {hardwareCategories.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer focus:bg-[#82a7a1]"
                tabIndex={0}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface MobileNavProps {
  hardwareCategories: string[];
}
