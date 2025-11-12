"use client";
import CategoryList from "./CategoryList";
import { useState } from "react";
import Image from "next/image";
import { FaPhone, FaSearch, FaShoppingBasket } from "react-icons/fa";

export default function DesktopHeader({ categories }: DesktopHeaderProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // ("Searching for:", query);
    // TODO: trigger your search logic here
  };

  return (
    <header className="relative hidden lg:flex flex-col">
      <div className="bg-primary-custom-teal px-15 py-4 flex justify-around h-1/2">
        <div className="flex w-screen items-center">
          <Image
            src="/lol.svg"
            alt="Company Logo"
            width={60}
            height={10}
            className="lex-initial mr-2"
          />
          <form
            onSubmit={handleSearch}
            className="flex h-full flex-grow max-w-[37.75rem] bg-white shadow-md overflow-hidden border border-gray-300 focus-within:border-green-700"
          >
            <input
              type="text"
              placeholder="Search for anything here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
            />
            <button className="mr-4" type="submit">
              <FaSearch size={20} className="text-gray-600" />
            </button>
          </form>
        </div>
        <div className="flex">
          <button className="flex flex-wrap items-center justify-center mr-6">
            <FaPhone size={20} />
            <h3>Contact</h3>
          </button>
          <button className="flex flex-wrap items-center justify-center">
            <FaShoppingBasket size={20} />
            <h3>Basket</h3>
          </button>
        </div>
      </div>
      <CategoryList categories={categories} />
    </header>
  );
}

interface DesktopHeaderProps {
  categories: string[];
}
