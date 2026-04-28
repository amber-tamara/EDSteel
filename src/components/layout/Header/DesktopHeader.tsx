'use client';
import CategoryList from './CategoryList';
import { useState } from 'react';
import Image from 'next/image';
import { FaPhone, FaSearch, FaShoppingBasket } from 'react-icons/fa';
import Link from 'next/link';

export default function DesktopHeader({ categories }: DesktopHeaderProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // ("Searching for:", query);
    // TODO: trigger your search logic here
  };

  return (
    <header className="hidden lg:flex flex-col pb-3">
      <div className="bg-primary-custom-teal px-15 py-4 flex justify-around h-1/2">
        <div className="flex w-screen items-center">
          <Image
            src="/banana.png"
            alt="Company Logo"
            width={160}
            height={10}
            className="lex-initial mr-3"
          />
          <form
            onSubmit={handleSearch}
            className="rounded-lg flex h-full flex-grow max-w-[37.75rem] bg-white shadow-md overflow-hidden border border-black-300 focus-within:border-green-200"
          >
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
            />
            <button className="mr-4 cursor-pointer" type="submit">
              <FaSearch size={20} className="text-gray-600" />
            </button>
          </form>
        </div>
        <div className="flex text-white">
          <Link
            href="/contact"
            className="flex flex-wrap items-center justify-center mr-6"
          >
            <FaPhone size={20} />
            <h3>Contact</h3>
          </Link>
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
