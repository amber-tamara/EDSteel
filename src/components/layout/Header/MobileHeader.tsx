"use client";
import { useState } from "react";
import Image from "next/image";
import { FaPhone, FaSearch, FaShoppingBasket, FaUser } from "react-icons/fa";
import MobileNav from "./MobileNav";

export default function MobileHeader({ categories }: MobileHeaderProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: trigger your search logic here
  };
  return (
    <div className="relative">
      <div className="lg:hidden bg-primary-custom-teal flex flex-col justify-around p-2">
        <div className="flex justify-between">
          <MobileNav categories={categories} />
          <button className="flex items-center justify-center flex-col">
            <FaPhone size={20} />
            <h3 className="text-sm sm:text-base mt-0.5">Contact</h3>
          </button>
          <Image
            src="/lol.svg"
            alt="Company Logo"
            width={60}
            height={10}
            className="lex-initial mr-2"
          />
          <button className="flex flex-wrap items-center justify-center flex-col">
            <FaUser size={20} />
            <h3 className="text-sm sm:text-base mt-0.5">Account</h3>
          </button>
          <button className="flex flex-wrap items-center justify-center flex-col mr-1.5">
            <FaShoppingBasket size={20} />
            <h3 className="text-sm sm:text-base mt-0.5">Basket</h3>
          </button>
        </div>
        <form
          onSubmit={handleSearch}
          className="mt-2 flex h-full flex-grow bg-white shadow-md overflow-hidden border border-gray-300 focus-within:border-green-700"
        >
          <input
            type="text"
            placeholder="Search for anything here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
          />
          <button className="mr-4" type="submit">
            <FaSearch size={24} className="text-gray-600" />
          </button>
        </form>
      </div>
    </div>
  );
}

interface MobileHeaderProps {
  categories: string[];
}
