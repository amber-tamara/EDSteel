'use client';

import { FaBars, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';
import { andToAmpersand } from '@/helpers/text';

interface MobileNavProps {
  categories: any[];
}

export default function MobileNav({ categories }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<any>(null);

  const handleToggle = () => {
    setOpen(!open);
    setActiveCat(null);
  };

  return (
    <div className="flex">
      <button
        onClick={handleToggle}
        className="flex flex-col items-center justify-center ml-1.5 cursor-pointer"
      >
        <FaBars size={20} />
        <h3 className="text-sm sm:text-base mt-0.5">Menu</h3>
      </button>

      <div
        onClick={handleToggle}
        className={`fixed inset-0 bg-black/70 transition-opacity duration-300 cursor-pointer z-50 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {open && (
        <div className="w-[calc(100%-44px)] fixed inset-y-0 left-0 md:w-1/2 max-w-sm h-full bg-white text-black shadow-md flex flex-col z-[60]">
          {' '}
          <button
            onClick={handleToggle}
            className="absolute top-4 -right-10 z-50 text-white cursor-pointer"
          >
            <FaTimes size={24} />
          </button>
          <div className="shrink-0 flex items-center border-b border-[#82a7a1] grid grid-cols-2">
            <p className="h-full py-3 pl-4 pr-0 border-r border-gray-200 cursor-pointer hover:underline">
              Sign In
            </p>
            <p className="h-full py-3 pl-4 pr-0 cursor-pointer hover:underline">
              Register
            </p>
          </div>
          {activeCat && (
            <button
              onClick={() => setActiveCat(null)}
              className="shrink-0 flex items-center gap-2 py-3 pl-4 cursor-pointer hover:underline"
            >
              <FaChevronLeft />
              Back to main menu
            </button>
          )}
          <div className="flex-1 overflow-y-auto">
            {!activeCat && (
              <ul className="flex flex-col divide-y divide-[#82a7a1]">
                <li className="py-5 px-3 bg-gray-200">
                  <h1 className="font-semibold text-lg">All Categories</h1>
                </li>

                {categories.map((item) => (
                  <li
                    key={item.mainCat}
                    onClick={() => setActiveCat(item)}
                    className="flex justify-between items-center py-5 px-3 cursor-pointer hover:underline transition-transform duration-200"
                  >
                    <span>{item.mainCat}</span>
                    <FaChevronRight className="opacity-60" />
                  </li>
                ))}
              </ul>
            )}

            {activeCat && (
              <ul className="flex flex-col divide-y bg-white text-black">
                <li className="py-5 px-4 bg-gray-200 font-bold text-lg">
                  {activeCat.mainCat}
                </li>

                <li className="py-5 px-4 hover:underline">
                  <Link
                    href={`/products/${activeCat.mainCatSlug}`}
                    onClick={handleToggle}
                    className="flex justify-between items-center"
                  >
                    <span>All {activeCat.mainCat}</span>
                    <FaChevronRight className="opacity-40" />
                  </Link>
                </li>

                {activeCat.subCats.map((sub: any) => (
                  <li key={sub.slug} className="py-5 px-4 hover:underline">
                    <Link
                      href={`/products/${activeCat.mainCatSlug}/${sub.slug}`}
                      onClick={handleToggle}
                      className="flex justify-between items-center"
                    >
                      {andToAmpersand(sub.name)}
                      <FaChevronRight className="opacity-40" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
